const crypto = require('crypto');
const { razorpay, isMockMode, keySecret } = require('../config/razorpay');
const { pool } = require('../config/db');

/**
 * Service to manage Razorpay orders, signatures, and invoices
 */
const createRazorpayOrder = async (amountInINR, receiptId) => {
    const amountInPaise = Math.round(amountInINR * 100);

    if (isMockMode) {
        // Return a standard Razorpay-like mock order object
        const mockOrderId = `order_mock_${Math.random().toString(36).substring(2, 15)}`;
        return {
            id: mockOrderId,
            entity: 'order',
            amount: amountInPaise,
            amount_paid: 0,
            amount_due: amountInPaise,
            currency: 'INR',
            receipt: receiptId,
            status: 'created',
            attempts: 0,
            notes: { mode: 'mock' },
            created_at: Math.floor(Date.now() / 1000)
        };
    }

    try {
        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: receiptId,
            notes: { mode: 'live' }
        });
        return order;
    } catch (err) {
        console.error("❌ Razorpay order creation error:", err);
        throw new Error(`Razorpay Order Error: ${err.message}`);
    }
};

/**
 * Verifies the Razorpay payment signature
 */
const verifySignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    // If we are in mock mode OR the order is a mock order, automatically pass verification
    if (isMockMode || (razorpayOrderId && razorpayOrderId.startsWith('order_mock_'))) {
        console.log("⚙️ Skipping HMAC verification for Mock Sandbox Transaction:", razorpayOrderId);
        return true;
    }

    try {
        const body = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(body.toString())
            .digest('hex');

        const isValid = expectedSignature === razorpaySignature;
        if (!isValid) {
            console.warn("⚠️ Razorpay Signature Validation FAILED!");
            console.warn("   Expected:", expectedSignature);
            console.warn("   Received:", razorpaySignature);
        }
        return isValid;
    } catch (err) {
        console.error("❌ Cryptographic signature verification error:", err.message);
        return false;
    }
};

/**
 * Generates a unique sequential billing invoice number
 */
const generateInvoiceNumber = async () => {
    try {
        const result = await pool.query("SELECT COUNT(*) FROM invoices");
        const count = parseInt(result.rows[0].count, 10) + 1;
        const year = new Date().getFullYear();
        return `INV-${year}-${String(count).padStart(5, '0')}`;
    } catch (err) {
        console.error("Error generating invoice number:", err);
        // Safe fallback random invoice number
        return `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    }
};

module.exports = {
    createRazorpayOrder,
    verifySignature,
    generateInvoiceNumber
};
