// backend/src/utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'ascope_super_secret_key';

/**
 * Signs a payload to generate a JWT token.
 * Defaults to 24h expiration.
 */
function sign(payload, expiresIn = '24h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verifies a token and returns the decoded payload.
 * Throws an error if token is invalid or expired.
 */
function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  sign,
  verify,
};
