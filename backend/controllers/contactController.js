const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');

const CONTACTS_FALLBACK_FILE = path.join(__dirname, '../data/contacts_fallback.json');

const saveFallbackContact = (contact) => {
    try {
        if (!fs.existsSync(path.dirname(CONTACTS_FALLBACK_FILE))) {
            fs.mkdirSync(path.dirname(CONTACTS_FALLBACK_FILE), { recursive: true });
        }
        let contacts = [];
        if (fs.existsSync(CONTACTS_FALLBACK_FILE)) {
            contacts = JSON.parse(fs.readFileSync(CONTACTS_FALLBACK_FILE, 'utf-8'));
        }
        contacts.push({
            id: contacts.length + 1,
            ...contact,
            created_at: new Date().toISOString()
        });
        fs.writeFileSync(CONTACTS_FALLBACK_FILE, JSON.stringify(contacts, null, 2));
    } catch (err) {
        console.error("❌ Error saving fallback contact:", err);
    }
};

const submitContactForm = async (req, res) => {
  try {
    const first_name = req.body.first_name || req.body.firstName;
    const last_name = req.body.last_name || req.body.lastName;
    const mobile_number = req.body.mobile_number || req.body.phone;
    const email = req.body.email;
    const course_section = req.body.course_section || req.body.course;
    const message = req.body.message;

    // Basic Validation
    if (!email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide at least an email and a message'
        });
    }

    try {
        await pool.query(
          `INSERT INTO contacts (first_name, last_name, email, phone, course, mobile_number, course_section, message)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            first_name,
            last_name,
            email,
            mobile_number,     // stores in old 'phone' field
            course_section,    // stores in old 'course' field
            mobile_number,     // stores in new 'mobile_number' field
            course_section,    // stores in new 'course_section' field
            message
          ]
        );
        console.log("✅ Contact saved to PostgreSQL database successfully.");
    } catch (dbErr) {
        console.warn("⚠️ Database insert failed. Saving contact to local JSON data store:", dbErr.message);
        saveFallbackContact({ 
          first_name, 
          last_name, 
          email, 
          mobile_number, 
          course_section, 
          message 
        });
    }

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
