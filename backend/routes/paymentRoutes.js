const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Mount routes with robust JWT verification
router.post('/create-order', protect, paymentController.createOrder);
router.post('/verify', protect, paymentController.verifyPayment);
router.get('/history', protect, paymentController.getHistory);
router.get('/invoice/:id', protect, paymentController.getInvoice);

module.exports = router;
