const express = require('express');
const router = express.Router();

const { submitEnrollment } = require('../controllers/enrollController');

// Submit Enrollment Form
router.post('/', submitEnrollment);

module.exports = router;
