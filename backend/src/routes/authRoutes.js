// backend/src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authValidations = require('../validations/authValidations');

const router = express.Router();

// Public Authentication endpoints
router.post('/register', authValidations.validateRegister, authController.register);
router.post('/login', authValidations.validateLogin, authController.login);

// Protected Profile endpoints
router.get('/profile', authMiddleware.protect, authController.getProfile);
router.put('/profile', authMiddleware.protect, authController.updateProfile);
router.put('/settings', authMiddleware.protect, authController.updateSettings);

module.exports = router;
