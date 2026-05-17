const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');

const ENROLLMENTS_FALLBACK_FILE = path.join(__dirname, '../data/enrollments_fallback.json');

const saveFallbackEnrollment = (enrollment) => {
    try {
        if (!fs.existsSync(path.dirname(ENROLLMENTS_FALLBACK_FILE))) {
            fs.mkdirSync(path.dirname(ENROLLMENTS_FALLBACK_FILE), { recursive: true });
        }
        let enrollments = [];
        if (fs.existsSync(ENROLLMENTS_FALLBACK_FILE)) {
            enrollments = JSON.parse(fs.readFileSync(ENROLLMENTS_FALLBACK_FILE, 'utf-8'));
        }
        enrollments.push({
            id: enrollments.length + 1,
            ...enrollment,
            status: 'pending',
            created_at: new Date().toISOString()
        });
        fs.writeFileSync(ENROLLMENTS_FALLBACK_FILE, JSON.stringify(enrollments, null, 2));
    } catch (err) {
        console.error("❌ Error saving fallback enrollment:", err);
    }
};

const submitEnrollment = async (req, res) => {
  try {
    const { courseId, fullName, email, phone } = req.body;

    if (!courseId || !fullName || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields (courseId, fullName, email, phone)'
        });
    }

    try {
        await pool.query(
          `INSERT INTO enrollments (course_id, full_name, email, phone)
           VALUES ($1, $2, $3, $4)`,
          [courseId, fullName, email, phone]
        );
        console.log("✅ Enrollment saved to PostgreSQL database successfully.");
    } catch (dbErr) {
        console.warn("⚠️ Database insert failed. Saving enrollment to local JSON data store:", dbErr.message);
        saveFallbackEnrollment({ courseId, fullName, email, phone });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment successful! Our team will contact you for the next steps.'
    });

  } catch (error) {
    console.error('❌ Enrollment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to process enrollment.'
    });
  }
};

module.exports = {
  submitEnrollment
};
