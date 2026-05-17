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
    const { firstName, lastName, email, phone, course, message } = req.body;

    // Basic Validation
    if (!email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide at least an email and a message'
        });
    }

    try {
        await pool.query(
          `INSERT INTO contacts (first_name, last_name, email, phone, course, message)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [firstName, lastName, email, phone, course, message]
        );
        console.log("✅ Contact saved to PostgreSQL database successfully.");
    } catch (dbErr) {
        console.warn("⚠️ Database insert failed. Saving contact to local JSON data store:", dbErr.message);
        saveFallbackContact({ firstName, lastName, email, phone, course, message });
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
