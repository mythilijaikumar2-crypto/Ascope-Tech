// backend/src/middleware/authMiddleware.js
const jwtUtil = require('../utils/jwt');

/**
 * Middleware to protect routes and verify the JWT authorization token.
 * Attaches verified user context to req.user.
 */
function protect(req, res, next) {
  let token;

  // Check Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied: No authentication token provided.'
    });
  }

  try {
    // Verify cryptographic token signature
    const decoded = jwtUtil.verify(token);
    req.user = {
      id: parseInt(decoded.id, 10),
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Access denied: Invalid or expired authentication token.'
    });
  }
}

/**
 * Restricts route access to specific roles (e.g. 'admin').
 */
function restrictTo(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You do not have permissions to perform this action.'
      });
    }
    next();
  };
}

module.exports = {
  protect,
  restrictTo,
};
