// backend/src/validations/courseValidations.js
const { body, validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
    });
  }
  next();
}

const validateCourse = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Course title is required.')
    .isLength({ max: 255 })
    .withMessage('Course title must be under 255 characters.'),

  body('category')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category must be under 100 characters.'),

  body('duration')
    .trim()
    .notEmpty()
    .withMessage('Duration (e.g. "3 Months") is required.')
    .isLength({ max: 100 })
    .withMessage('Duration details must be under 100 characters.'),

  body('price')
    .trim()
    .notEmpty()
    .withMessage('Price (e.g. "₹12,000") is required.')
    .isLength({ max: 100 })
    .withMessage('Price format must be under 100 characters.'),

  body('originalPrice')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Original price format must be under 100 characters.'),

  body('image')
    .optional({ checkFalsy: true })
    .trim(),

  handleValidationErrors,
];

module.exports = {
  validateCourse,
};
