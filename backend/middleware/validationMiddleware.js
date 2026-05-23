const { validationResult } = require('express-validator');

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Map to a clean, readable error array or single message
    const errorMsg = errors.array().map(err => err.msg).join(', ');
    return res.status(400).json({
      success: false,
      error: errorMsg,
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateInputs
};
