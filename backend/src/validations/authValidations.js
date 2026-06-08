// backend/src/validations/authValidations.js
const { body, validationResult } = require('express-validator');

/**
 * Centered middleware to capture express-validator validation results.
 * Returns a 400 Bad Request with details if validation fails.
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return first validation error message as a unified string
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
    });
  }
  next();
}

const validateRegister = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required.')
    .isLength({ max: 100 })
    .withMessage('Full name must be under 100 characters.'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be under 20 characters.'),

  body('dateOfBirth')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Date of birth details must be under 50 characters.'),
    
  handleValidationErrors,
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required.'),

  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
};
