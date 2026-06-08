// backend/src/middleware/errorHandler.js

/**
 * Centralized global error handling middleware.
 * Intercepts all unhandled exceptions and formats standard JSON error responses.
 */
function errorHandler(err, req, res, next) {
  console.error('❌ Express System Error Boundary:');
  console.error(err.stack || err);

  // Determine HTTP status code (default to 500)
  const statusCode = err.statusCode || 500;
  
  // Custom response format matching frontend expectations
  res.status(statusCode).json({
    success: false,
    error: err.message || 'An unexpected server error occurred. Please try again later.'
  });
}

module.exports = errorHandler;
