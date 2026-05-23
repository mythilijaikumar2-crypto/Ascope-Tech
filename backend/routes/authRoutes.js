const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateInputs } = require('../middleware/validationMiddleware');

// 1. Register Route (Public)
router.post(
  '/register',
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateInputs
  ],
  authController.register
);

// 2. Login Route (Public)
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validateInputs
  ],
  authController.login
);

// 3. Get User Profile Route (Protected)
router.get('/profile', protect, authController.getProfile);

// 4. Update Profile Route (Protected)
router.put(
  '/profile',
  [
    protect,
    body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty'),
    body('email').optional().trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('phone').optional().trim(),
    validateInputs
  ],
  authController.updateProfile
);

// 5. Update User Settings Route (Protected)
router.put(
  '/settings',
  [
    protect,
    body('emailNotifications').optional().isBoolean().withMessage('emailNotifications must be boolean'),
    body('smsNotifications').optional().isBoolean().withMessage('smsNotifications must be boolean'),
    body('darkMode').optional().isBoolean().withMessage('darkMode must be boolean'),
    validateInputs
  ],
  authController.updateSettings
);

module.exports = router;
