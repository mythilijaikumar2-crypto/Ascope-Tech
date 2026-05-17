const { pool } = require('../config/db');

const submitEnrollment = async (req, res) => {
  try {
    const { courseId, fullName, email, phone } = req.body;

    if (!courseId || !fullName || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields (courseId, fullName, email, phone)'
        });
    }

    await pool.query(
      `INSERT INTO enrollments (course_id, full_name, email, phone)
       VALUES ($1, $2, $3, $4)`,
      [courseId, fullName, email, phone]
    );

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
