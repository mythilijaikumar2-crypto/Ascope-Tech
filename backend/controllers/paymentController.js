const { pool } = require('../config/db');
const paymentService = require('../services/paymentService');
const { parsePrice } = require('./couponController');
const { isMockMode } = require('../config/razorpay');

/**
 * Creates a Razorpay Order and saves a pending payment record
 */
const createOrder = async (req, res) => {
    try {
        const { courseId, couponCode } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: 'Course ID is required.'
            });
        }

        // 1. Check if user is already enrolled in this course
        const enrollCheck = await pool.query(
            "SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2 AND status = 'approved'",
            [userId, courseId]
        );

        if (enrollCheck.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You are already enrolled in this course.'
            });
        }

        // 2. Fetch course price
        const courseResult = await pool.query("SELECT * FROM courses WHERE id = $1", [courseId]);
        if (courseResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Course not found.'
            });
        }

        const course = courseResult.rows[0];
        const basePrice = parsePrice(course.price);
        let finalPrice = basePrice;
        let couponId = null;
        let discountAmount = 0;

        // 3. Apply coupon code if provided
        if (couponCode) {
            const couponResult = await pool.query(
                `SELECT * FROM coupons 
                 WHERE UPPER(code) = UPPER($1) 
                   AND active = TRUE 
                   AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)`,
                [couponCode]
            );

            if (couponResult.rows.length > 0) {
                const coupon = couponResult.rows[0];
                const minCart = parseFloat(coupon.min_cart_value);

                if (basePrice >= minCart) {
                    couponId = coupon.id;
                    const discountVal = parseFloat(coupon.discount_value);

                    if (coupon.discount_type === 'percentage') {
                        discountAmount = basePrice * (discountVal / 100);
                        if (coupon.max_discount) {
                            const maxD = parseFloat(coupon.max_discount);
                            if (discountAmount > maxD) {
                                discountAmount = maxD;
                            }
                        }
                    } else if (coupon.discount_type === 'flat') {
                        discountAmount = discountVal;
                    }

                    if (discountAmount > basePrice) discountAmount = basePrice;
                    finalPrice = basePrice - discountAmount;
                }
            }
        }

        // 4. Generate order details via Razorpay service
        const receiptId = `rcpt_${userId}_${courseId}_${Date.now()}`;
        const order = await paymentService.createRazorpayOrder(finalPrice, receiptId);

        // 5. Record pending payment entry in Database
        await pool.query(
            `INSERT INTO payments (user_id, course_id, coupon_id, razorpay_order_id, amount, status)
             VALUES ($1, $2, $3, $4, $5, 'created')`,
            [userId, courseId, couponId, order.id, finalPrice]
        );

        return res.status(200).json({
            success: true,
            message: 'Razorpay order created successfully.',
            data: {
                orderId: order.id,
                amount: order.amount, // in paise
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID_HERE',
                isMock: isMockMode || order.id.startsWith('order_mock_'),
                courseDetails: {
                    id: course.id,
                    title: course.title,
                    price: course.price,
                    discountAmount: Math.round(discountAmount),
                    finalPrice: Math.round(finalPrice)
                }
            }
        });

    } catch (err) {
        console.error("❌ Create payment order error:", err);
        return res.status(500).json({
            success: false,
            message: 'Server error: Unable to create checkout order.'
        });
    }
};

/**
 * Verifies Razorpay signatures and automates course enrollment and invoice generations
 */
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user.id;

        if (!razorpay_order_id || !razorpay_payment_id) {
            return res.status(400).json({
                success: false,
                message: 'Order ID and Payment ID are required for verification.'
            });
        }

        // 1. Retrieve the local payment record
        const paymentResult = await pool.query(
            "SELECT * FROM payments WHERE razorpay_order_id = $1",
            [razorpay_order_id]
        );

        if (paymentResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment order record not found.'
            });
        }

        const payment = paymentResult.rows[0];

        // 2. Perform HMAC cryptographic validation
        const isVerified = paymentService.verifySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isVerified) {
            // Update status to failed
            await pool.query(
                "UPDATE payments SET status = 'failed', error_description = 'Signature verification failed', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
                [payment.id]
            );
            return res.status(400).json({
                success: false,
                message: 'Cryptographic signature validation failed. Transaction blocked.'
            });
        }

        // 3. Update payment table to 'captured'
        const updatedPaymentResult = await pool.query(
            `UPDATE payments 
             SET status = 'captured', 
                 razorpay_payment_id = $1, 
                 razorpay_signature = $2, 
                 updated_at = CURRENT_TIMESTAMP 
             WHERE id = $3 
             RETURNING *`,
            [razorpay_payment_id, razorpay_signature, payment.id]
        );
        const updatedPayment = updatedPaymentResult.rows[0];

        // 4. Retrieve course and student contact particulars for enrollment
        const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        const courseResult = await pool.query("SELECT * FROM courses WHERE id = $1", [payment.course_id]);

        const user = userResult.rows[0];
        const course = courseResult.rows[0];

        const fullName = user.full_name;
        const email = user.email;
        const phone = user.phone || '9999999999';

        // 5. AUTO ENROLL STUDENT
        const enrollmentResult = await pool.query(
            `INSERT INTO enrollments (user_id, course_id, full_name, email, phone, status)
             VALUES ($1, $2, $3, $4, $5, 'approved')
             ON CONFLICT (user_id, course_id) 
             DO UPDATE SET status = 'approved', created_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [userId, payment.course_id, fullName, email, phone]
        );
        const enrollment = enrollmentResult.rows[0];

        // 6. GENERATE CORPORATE INVOICE
        const invoiceNumber = await paymentService.generateInvoiceNumber();

        // Cost itemization logic
        const total = parseFloat(payment.amount);
        const basePrice = parsePrice(course.price);
        const discount = Math.max(0, basePrice - total);
        const subtotal = total / 1.18;
        const tax = total - subtotal;

        // Billing details snapshot
        const billingDetails = {
            fullName,
            email,
            phone,
            courseTitle: course.title,
            verifiedAt: new Date().toISOString()
        };

        const invoiceResult = await pool.query(
            `INSERT INTO invoices (payment_id, invoice_number, billing_details, subtotal, discount, tax, total)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [payment.id, invoiceNumber, JSON.stringify(billingDetails), Math.round(subtotal), Math.round(discount), Math.round(tax), Math.round(total)]
        );
        const invoice = invoiceResult.rows[0];

        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully and student enrolled.',
            data: {
                payment: updatedPayment,
                enrollment,
                invoice
            }
        });

    } catch (err) {
        console.error("❌ Payment verification error:", err);
        return res.status(500).json({
            success: false,
            message: 'Server error: Unable to verify transaction.'
        });
    }
};

/**
 * Fetches the student's personal billing history
 */
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT p.*, c.title AS course_title, c.image AS course_image,
                    co.code AS coupon_code, inv.id AS invoice_id, inv.invoice_number
             FROM payments p
             LEFT JOIN courses c ON p.course_id = c.id
             LEFT JOIN coupons co ON p.coupon_id = co.id
             LEFT JOIN invoices inv ON inv.payment_id = p.id
             WHERE p.user_id = $1
             ORDER BY p.created_at DESC`,
            [userId]
        );

        return res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error("❌ Fetch payment history error:", err);
        return res.status(500).json({
            success: false,
            message: 'Server error: Unable to retrieve billing history.'
        });
    }
};

/**
 * Fetches a detailed printable invoice layout
 */
const getInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const result = await pool.query(
            `SELECT inv.*, p.razorpay_payment_id, p.razorpay_order_id, p.amount, p.currency, p.status as payment_status,
                    c.title AS course_title, c.duration AS course_duration,
                    c.original_price AS course_original_price, c.price AS course_discount_price,
                    u.full_name AS user_name, u.email AS user_email
             FROM invoices inv
             JOIN payments p ON inv.payment_id = p.id
             JOIN courses c ON p.course_id = c.id
             JOIN users u ON p.user_id = u.id
             WHERE inv.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found.'
            });
        }

        const invoice = result.rows[0];

        // Access protection: User must be either the owner or an admin
        if (invoice.user_email !== req.user.email && userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have permissions to access this invoice.'
            });
        }

        return res.status(200).json({
            success: true,
            data: invoice
        });

    } catch (err) {
        console.error("❌ Fetch invoice error:", err);
        return res.status(500).json({
            success: false,
            message: 'Server error: Unable to load invoice details.'
        });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
    getHistory,
    getInvoice
};
