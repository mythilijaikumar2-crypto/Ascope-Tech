const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'ascope_super_secret_key';

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const { fullName, email, password, phone, dateOfBirth } = req.body;

  try {
    // 1. Check if user already exists
    const userExistResult = await db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (userExistResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Email is already in use.'
      });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Create user in DB
    const newUserResult = await db.query(
      `INSERT INTO users (full_name, email, password_hash, phone, role, date_of_birth) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, full_name, email, phone, role, date_of_birth, created_at`,
      [fullName.trim(), email.toLowerCase().trim(), passwordHash, phone || null, 'student', dateOfBirth || null]
    );

    const user = newUserResult.rows[0];

    // 4. Create default settings entry for the user
    await db.query(
      `INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) 
       VALUES ($1, $2, $3, $4)`,
      [user.id, true, false, false]
    );

    // 5. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        dateOfBirth: user.date_of_birth
      }
    });

  } catch (error) {
    console.error('❌ Registration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: Unable to create account.'
    });
  }
};

// @desc    Log in an existing user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Fetch user from DB
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    const user = userResult.rows[0];

    // 2. Verify password match
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: Authentication failed.'
    });
  }
};

// @desc    Get current user profile (JWT protected)
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
  try {
    // 1. Fetch user details
    const userResult = await db.query(
      'SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found.'
      });
    }

    const user = userResult.rows[0];

    // 2. Fetch user settings
    let settingsResult = await db.query(
      'SELECT email_notifications, sms_notifications, dark_mode FROM user_settings WHERE user_id = $1',
      [req.user.id]
    );

    // If settings somehow missing, create default
    if (settingsResult.rows.length === 0) {
      await db.query(
        `INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) 
         VALUES ($1, $2, $3, $4)`,
        [user.id, true, false, false]
      );
      settingsResult = await db.query(
        'SELECT email_notifications, sms_notifications, dark_mode FROM user_settings WHERE user_id = $1',
        [req.user.id]
      );
    }

    const settings = settingsResult.rows[0];

    // 3. Fetch courses user has enrolled in (matches user's email)
    const enrollmentsResult = await db.query(
      `SELECT e.id as enrollment_id, e.status, e.created_at, c.id as course_id, c.title, c.duration, c.price, c.image 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE LOWER(e.email) = $1 
       ORDER BY e.created_at DESC`,
      [user.email.toLowerCase()]
    );

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.created_at
      },
      settings: {
        emailNotifications: settings.email_notifications,
        smsNotifications: settings.sms_notifications,
        darkMode: settings.dark_mode
      },
      enrollments: enrollmentsResult.rows
    });

  } catch (error) {
    console.error('❌ Get Profile Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: Unable to retrieve profile data.'
    });
  }
};

// @desc    Update current user profile (JWT protected)
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  const { fullName, email, phone } = req.body;

  try {
    // 1. If email is changing, verify it is not taken by another user
    if (email) {
      const emailCheckResult = await db.query(
        'SELECT * FROM users WHERE email = $1 AND id != $2',
        [email.toLowerCase().trim(), req.user.id]
      );
      if (emailCheckResult.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Email is already in use by another account.'
        });
      }
    }

    // 2. Perform DB Update
    const updateResult = await db.query(
      `UPDATE users 
       SET full_name = COALESCE($1, full_name), 
           email = COALESCE($2, email), 
           phone = COALESCE($3, phone) 
       WHERE id = $4 
       RETURNING id, full_name, email, phone, role`,
      [
        fullName ? fullName.trim() : null, 
        email ? email.toLowerCase().trim() : null, 
        phone ? phone.trim() : null, 
        req.user.id
      ]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found.'
      });
    }

    const updatedUser = updateResult.rows[0];

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: updatedUser.id,
        fullName: updatedUser.full_name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role
      }
    });

  } catch (error) {
    console.error('❌ Update Profile Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: Unable to update profile details.'
    });
  }
};

// @desc    Update current user settings (JWT protected)
// @route   PUT /api/auth/settings
exports.updateSettings = async (req, res) => {
  const { emailNotifications, smsNotifications, darkMode } = req.body;

  try {
    const updateResult = await db.query(
      `INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) 
       DO UPDATE SET 
         email_notifications = EXCLUDED.email_notifications,
         sms_notifications = EXCLUDED.sms_notifications,
         dark_mode = EXCLUDED.dark_mode,
         updated_at = CURRENT_TIMESTAMP
       RETURNING email_notifications, sms_notifications, dark_mode`,
      [req.user.id, emailNotifications ?? true, smsNotifications ?? false, darkMode ?? false]
    );

    const settings = updateResult.rows[0];

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully!',
      settings: {
        emailNotifications: settings.email_notifications,
        smsNotifications: settings.sms_notifications,
        darkMode: settings.dark_mode
      }
    });

  } catch (error) {
    console.error('❌ Update Settings Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: Unable to save preferences.'
    });
  }
};
