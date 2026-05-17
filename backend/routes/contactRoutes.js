const express = require('express');
const router = express.Router();

const { submitContactForm } = require('../controllers/contactController');

// Submit Contact Form
router.post('/', submitContactForm);

module.exports = router;
