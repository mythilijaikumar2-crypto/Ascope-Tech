const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { protect } = require('../middleware/authMiddleware');

// Mount coupon validation under JWT security
router.post('/apply', protect, couponController.applyCoupon);

module.exports = router;
