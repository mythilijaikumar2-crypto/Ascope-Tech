// backend/src/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwtUtil = require('../utils/jwt');

/**
 * Registers a new student account, seeds setting flags, and signs an authentication token.
 */
async function register(req, res, next) {
  const { fullName, email, password, phone, dateOfBirth } = req.body;
  const lowercaseEmail = email.toLowerCase().trim();

  try {
    // 1. Verify user does not already exist
    const duplicateCheck = await db.query('SELECT id FROM users WHERE email = $1', [lowercaseEmail]);
    if (duplicateCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Email is already in use by another account.'
      });
    }

    // 2. Cryptographic password hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insert user details into the database
    const userInsert = await db.query(
      `INSERT INTO users (full_name, email, password_hash, phone, role, date_of_birth) 
       VALUES ($1, $2, $3, $4, 'student', $5) 
       RETURNING id, full_name, email, phone, role, date_of_birth, created_at`,
      [
        fullName.trim(),
        lowercaseEmail,
        passwordHash,
        phone ? phone.trim() : null,
        dateOfBirth ? dateOfBirth.trim() : null
      ]
    );
    const user = userInsert.rows[0];

    // 4. Seed default settings for the registered user
    await db.query(
      `INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) 
       VALUES ($1, true, false, false)`,
      [user.id]
    );

    // 5. Generate signed JWT token
    const token = jwtUtil.sign({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: parseInt(user.id, 10),
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        dateOfBirth: user.date_of_birth
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Authenticates user credentials and returns a session token.
 */
async function login(req, res, next) {
  const { email, password } = req.body;
  const lowercaseEmail = email.toLowerCase().trim();

  try {
    // 1. Fetch user from DB
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [lowercaseEmail]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    // 2. Verify hashed password comparison
    const isMatched = await bcrypt.compare(password, user.password_hash);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    // 3. Generate signed JWT session token
    const token = jwtUtil.sign({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: {
        id: parseInt(user.id, 10),
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieves the authenticated user's profile card, settings, and enrollment records.
 */
async function getProfile(req, res, next) {
  const userId = req.user.id;

  try {
    // 1. Fetch user parameters
    const userResult = await db.query(
      'SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = $1', 
      [userId]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User account not found.'
      });
    }

    // 2. Fetch user settings (auto-insert settings row if missing)
    let settingsResult = await db.query(
      'SELECT email_notifications, sms_notifications, dark_mode FROM user_settings WHERE user_id = $1',
      [userId]
    );
    
    if (settingsResult.rows.length === 0) {
      await db.query(
        'INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) VALUES ($1, true, false, false)',
        [userId]
      );
      settingsResult = await db.query(
        'SELECT email_notifications, sms_notifications, dark_mode FROM user_settings WHERE user_id = $1',
        [userId]
      );
    }
    const settings = settingsResult.rows[0];

    // 3. Fetch active course enrollments linked to the user's email
    const enrollmentsResult = await db.query(
      `SELECT e.id as enrollment_id, e.status, e.created_at, c.id as course_id, c.title, c.duration, c.price, c.image 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE LOWER(e.email) = $1 
       ORDER BY e.created_at DESC`,
      [user.email.toLowerCase()]
    );
    
    const enrollments = enrollmentsResult.rows.map(enr => ({
      enrollment_id: parseInt(enr.enrollment_id, 10),
      status: enr.status,
      created_at: enr.created_at,
      course_id: parseInt(enr.course_id, 10),
      title: enr.title,
      duration: enr.duration,
      price: enr.price,
      image: enr.image
    }));

    res.json({
      success: true,
      user: {
        id: parseInt(user.id, 10),
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.created_at
      },
      settings: {
        emailNotifications: !!settings.email_notifications,
        smsNotifications: !!settings.sms_notifications,
        darkMode: !!settings.dark_mode
      },
      enrollments
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Modifies profile contact parameters for the logged-in user.
 */
async function updateProfile(req, res, next) {
  const userId = req.user.id;
  const { fullName, email, phone } = req.body;
  const lowercaseEmail = email ? email.toLowerCase().trim() : '';

  try {
    // 1. Verify email availability if email modification is requested
    if (lowercaseEmail) {
      const emailCheck = await db.query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [lowercaseEmail, userId]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Email is already in use by another account.'
        });
      }
    }

    // 2. Perform database updates using COALESCE to fallback to original values if parameters are blank
    const userUpdate = await db.query(
      `UPDATE users 
       SET full_name = COALESCE(NULLIF($1, ''), full_name), 
           email = COALESCE(NULLIF($2, ''), email), 
           phone = COALESCE(NULLIF($3, ''), phone) 
       WHERE id = $4 
       RETURNING id, full_name, email, phone, role`,
      [
        fullName ? fullName.trim() : '',
        lowercaseEmail || null,
        phone ? phone.trim() : '',
        userId
      ]
    );
    const updatedUser = userUpdate.rows[0];

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User account not found.'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: parseInt(updatedUser.id, 10),
        fullName: updatedUser.full_name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Saves notification and UI settings preferences.
 */
async function updateSettings(req, res, next) {
  const userId = req.user.id;
  const { emailNotifications, smsNotifications, darkMode } = req.body;

  try {
    const settingsUpdate = await db.query(
      `INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) 
       DO UPDATE SET 
         email_notifications = EXCLUDED.email_notifications,
         sms_notifications = EXCLUDED.sms_notifications,
         dark_mode = EXCLUDED.dark_mode,
         updated_at = CURRENT_TIMESTAMP
       RETURNING email_notifications, sms_notifications, dark_mode`,
      [
        userId,
        emailNotifications !== undefined ? !!emailNotifications : true,
        smsNotifications !== undefined ? !!smsNotifications : false,
        darkMode !== undefined ? !!darkMode : false
      ]
    );
    const settings = settingsUpdate.rows[0];

    res.json({
      success: true,
      message: 'Settings updated successfully!',
      settings: {
        emailNotifications: !!settings.email_notifications,
        smsNotifications: !!settings.sms_notifications,
        darkMode: !!settings.dark_mode
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  updateSettings,
};
