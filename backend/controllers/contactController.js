const { pool } = require('../config/db');

const submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, course, message } = req.body;

    // Basic Validation
    if (!email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide at least an email and a message'
        });
    }

    await pool.query(
      `INSERT INTO contacts (first_name, last_name, email, phone, course, message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, email, phone, course, message]
    );

    res.status(200).json({
      success: true,
      message: 'Message received! Our counselors will contact you soon.'
    });

  } catch (error) {
    console.error('❌ Contact Submission Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error: Unable to save contact message.'
    });
  }
};

module.exports = {
  submitContactForm
};
