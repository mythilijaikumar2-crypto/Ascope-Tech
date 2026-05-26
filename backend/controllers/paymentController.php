<?php
// backend/controllers/paymentController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../services/paymentService.php';
require_once __DIR__ . '/../controllers/couponController.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';

class PaymentController {
    public static function createOrder($req) {
        $user = AuthMiddleware::protect();
        $body = $req['body'] ?? [];
        $courseId = isset($body['courseId']) ? (int)$body['courseId'] : null;
        $couponCode = trim($body['couponCode'] ?? '');
        $userId = $user['id'];

        if (!$courseId) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Course ID is required.'
            ];
        }

        try {
            // 1. Check if user is already enrolled in this course
            $stmt = Database::query(
                "SELECT id FROM enrollments WHERE user_id = ? AND course_id = ? AND status = 'approved'",
                [$userId, $courseId]
            );
            if ($stmt->fetch()) {
                http_response_code(400);
                return [
                    'success' => false,
                    'message' => 'You are already enrolled in this course.'
                ];
            }

            // 2. Fetch course details
            $stmtCourse = Database::query("SELECT * FROM courses WHERE id = ?", [$courseId]);
            $course = $stmtCourse->fetch();
            if (!$course) {
                http_response_code(404);
                return [
                    'success' => false,
                    'message' => 'Course not found.'
                ];
            }

            $basePrice = CouponController::parsePrice($course['price']);
            $finalPrice = $basePrice;
            $couponId = null;
            $discountAmount = 0;

            // 3. Check coupon details if provided
            if (!empty($couponCode)) {
                $stmtCoupon = Database::query(
                    "SELECT * FROM coupons 
                     WHERE UPPER(code) = UPPER(?) 
                       AND active = TRUE 
                       AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)",
                    [$couponCode]
                );
                $coupon = $stmtCoupon->fetch();

                if ($coupon) {
                    $minCart = (float)$coupon['min_cart_value'];
                    if ($basePrice >= $minCart) {
                        $couponId = $coupon['id'];
                        $discountVal = (float)$coupon['discount_value'];

                        if ($coupon['discount_type'] === 'percentage') {
                            $discountAmount = $basePrice * ($discountVal / 100);
                            if (!empty($coupon['max_discount'])) {
                                $maxD = (float)$coupon['max_discount'];
                                if ($discountAmount > $maxD) {
                                    $discountAmount = $maxD;
                                }
                            }
                        } elseif ($coupon['discount_type'] === 'flat') {
                            $discountAmount = $discountVal;
                        }

                        if ($discountAmount > $basePrice) $discountAmount = $basePrice;
                        $finalPrice = $basePrice - $discountAmount;
                    }
                }
            }

            // 4. Generate order
            $receiptId = "rcpt_" . $userId . "_" . $courseId . "_" . time();
            $order = PaymentService::createRazorpayOrder($finalPrice, $receiptId);

            // 5. Save pending entry in DB
            Database::query(
                "INSERT INTO payments (user_id, course_id, coupon_id, razorpay_order_id, amount, status)
                 VALUES (?, ?, ?, ?, ?, 'created')",
                [$userId, $courseId, $couponId, $order['id'], $finalPrice]
            );

            $rzpConfig = require __DIR__ . '/../config/razorpay.php';

            return [
                'success' => true,
                'message' => 'Razorpay order created successfully.',
                'data' => [
                    'orderId' => $order['id'],
                    'amount' => $order['amount'], // in paise
                    'currency' => $order['currency'],
                    'keyId' => $rzpConfig['keyId'] ?: 'YOUR_KEY_ID_HERE',
                    'isMock' => $rzpConfig['isMockMode'] || (strpos($order['id'], 'order_mock_') === 0),
                    'courseDetails' => [
                        'id' => (int)$course['id'],
                        'title' => $course['title'],
                        'price' => $course['price'],
                        'discountAmount' => (int)round($discountAmount),
                        'finalPrice' => (int)round($finalPrice)
                    ]
                ]
            ];

        } catch (Exception $err) {
            error_log("❌ Create payment order error: " . $err->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to create checkout order.'
            ];
        }
    }

    public static function verifyPayment($req) {
        $userObj = AuthMiddleware::protect();
        $body = $req['body'] ?? [];
        $razorpay_order_id = $body['razorpay_order_id'] ?? '';
        $razorpay_payment_id = $body['razorpay_payment_id'] ?? '';
        $razorpay_signature = $body['razorpay_signature'] ?? '';
        $userId = $userObj['id'];

        if (empty($razorpay_order_id) || empty($razorpay_payment_id)) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Order ID and Payment ID are required for verification.'
            ];
        }

        try {
            // 1. Retrieve the local payment record
            $stmt = Database::query("SELECT * FROM payments WHERE razorpay_order_id = ?", [$razorpay_order_id]);
            $payment = $stmt->fetch();

            if (!$payment) {
                http_response_code(404);
                return [
                    'success' => false,
                    'message' => 'Payment order record not found.'
                ];
            }

            // 2. Perform HMAC cryptographic validation
            $isVerified = PaymentService::verifySignature(
                $razorpay_order_id,
                $razorpay_payment_id,
                $razorpay_signature
            );

            if (!$isVerified) {
                Database::query(
                    "UPDATE payments SET status = 'failed', error_description = 'Signature verification failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                    [$payment['id']]
                );
                http_response_code(400);
                return [
                    'success' => false,
                    'message' => 'Cryptographic signature validation failed. Transaction blocked.'
                ];
            }

            // 3. Update payment table to 'captured'
            $stmtUpdate = Database::query(
                "UPDATE payments 
                 SET status = 'captured', 
                     razorpay_payment_id = ?, 
                     razorpay_signature = ?, 
                     updated_at = CURRENT_TIMESTAMP 
                 WHERE id = ? 
                 RETURNING *",
                [$razorpay_payment_id, $razorpay_signature, $payment['id']]
            );
            $updatedPayment = $stmtUpdate->fetch();

            // 4. Retrieve course and student details for enrollment
            $stmtUser = Database::query("SELECT * FROM users WHERE id = ?", [$userId]);
            $stmtCourse = Database::query("SELECT * FROM courses WHERE id = ?", [$payment['course_id']]);
            
            $user = $stmtUser->fetch();
            $course = $stmtCourse->fetch();

            $fullName = $user['full_name'];
            $email = $user['email'];
            $phone = $user['phone'] ?: '9999999999';

            // 5. AUTO ENROLL STUDENT (UPSERT)
            $stmtEnroll = Database::query(
                "INSERT INTO enrollments (user_id, course_id, full_name, email, phone, status)
                 VALUES (?, ?, ?, ?, ?, 'approved')
                 ON CONFLICT (user_id, course_id) 
                 DO UPDATE SET status = 'approved', created_at = CURRENT_TIMESTAMP
                 RETURNING *",
                [$userId, $payment['course_id'], $fullName, $email, $phone]
            );
            $enrollment = $stmtEnroll->fetch();

            // 6. GENERATE CORPORATE INVOICE
            $invoiceNumber = PaymentService::generateInvoiceNumber();

            // Cost itemization
            $total = (float)$payment['amount'];
            $basePrice = CouponController::parsePrice($course['price']);
            $discount = max(0, $basePrice - $total);
            $subtotal = $total / 1.18;
            $tax = $total - $subtotal;

            $billingDetails = [
                'fullName' => $fullName,
                'email' => $email,
                'phone' => $phone,
                'courseTitle' => $course['title'],
                'verifiedAt' => date('c')
            ];

            $stmtInvoice = Database::query(
                "INSERT INTO invoices (payment_id, invoice_number, billing_details, subtotal, discount, tax, total)
                 VALUES (?, ?, ?, ?, ?, ?, ?)
                 RETURNING *",
                [
                    $payment['id'],
                    $invoiceNumber,
                    json_encode($billingDetails),
                    (int)round($subtotal),
                    (int)round($discount),
                    (int)round($tax),
                    (int)round($total)
                ]
            );
            $invoice = $stmtInvoice->fetch();

            // Cast outputs to integers for Node.js API format matching
            if ($updatedPayment) {
                $updatedPayment['id'] = (int)$updatedPayment['id'];
                $updatedPayment['user_id'] = (int)$updatedPayment['user_id'];
                $updatedPayment['course_id'] = (int)$updatedPayment['course_id'];
                if (isset($updatedPayment['coupon_id'])) $updatedPayment['coupon_id'] = (int)$updatedPayment['coupon_id'];
            }
            if ($enrollment) {
                $enrollment['id'] = (int)$enrollment['id'];
                $enrollment['course_id'] = (int)$enrollment['course_id'];
                if (isset($enrollment['user_id'])) $enrollment['user_id'] = (int)$enrollment['user_id'];
            }
            if ($invoice) {
                $invoice['id'] = (int)$invoice['id'];
                $invoice['payment_id'] = (int)$invoice['payment_id'];
                $invoice['billing_details'] = json_decode($invoice['billing_details'], true);
            }

            return [
                'success' => true,
                'message' => 'Payment verified successfully and student enrolled.',
                'data' => [
                    'payment' => $updatedPayment,
                    'enrollment' => $enrollment,
                    'invoice' => $invoice
                ]
            ];

        } catch (Exception $err) {
            error_log("❌ Payment verification error: " . $err->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to verify transaction.'
            ];
        }
    }

    public static function getHistory($req) {
        $user = AuthMiddleware::protect();
        $userId = $user['id'];

        try {
            $stmt = Database::query(
                "SELECT p.*, c.title AS course_title, c.image AS course_image,
                        co.code AS coupon_code, inv.id AS invoice_id, inv.invoice_number
                 FROM payments p
                 LEFT JOIN courses c ON p.course_id = c.id
                 LEFT JOIN coupons co ON p.coupon_id = co.id
                 LEFT JOIN invoices inv ON inv.payment_id = p.id
                 WHERE p.user_id = ?
                 ORDER BY p.created_at DESC",
                [$userId]
            );
            $history = $stmt->fetchAll();

            foreach ($history as &$h) {
                $h['id'] = (int)$h['id'];
                $h['user_id'] = (int)$h['user_id'];
                $h['course_id'] = (int)$h['course_id'];
                if (isset($h['coupon_id'])) $h['coupon_id'] = (int)$h['coupon_id'];
                if (isset($h['invoice_id'])) $h['invoice_id'] = (int)$h['invoice_id'];
            }

            return [
                'success' => true,
                'data' => $history
            ];
        } catch (Exception $err) {
            error_log("❌ Fetch payment history error: " . $err->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to retrieve billing history.'
            ];
        }
    }

    public static function getInvoice($req) {
        $userObj = AuthMiddleware::protect();
        $id = (int)$req['params']['id'];
        $userRole = $userObj['role'];

        try {
            $stmt = Database::query(
                "SELECT inv.*, p.razorpay_payment_id, p.razorpay_order_id, p.amount, p.currency, p.status as payment_status,
                        c.title AS course_title, c.duration AS course_duration,
                        c.original_price AS course_original_price, c.price AS course_discount_price,
                        u.full_name AS user_name, u.email AS user_email
                 FROM invoices inv
                 JOIN payments p ON inv.payment_id = p.id
                 JOIN courses c ON p.course_id = c.id
                 JOIN users u ON p.user_id = u.id
                 WHERE inv.id = ?",
                [$id]
            );
            $invoice = $stmt->fetch();

            if (!$invoice) {
                http_response_code(404);
                return [
                    'success' => false,
                    'message' => 'Invoice not found.'
                ];
            }

            // Access validation: User must be either the owner or an admin
            if ($invoice['user_email'] !== $userObj['email'] && $userRole !== 'admin') {
                http_response_code(403);
                return [
                    'success' => false,
                    'message' => 'Forbidden: You do not have permissions to access this invoice.'
                ];
            }

            // Formatting types matching Node.js
            $invoice['id'] = (int)$invoice['id'];
            $invoice['payment_id'] = (int)$invoice['payment_id'];
            $invoice['billing_details'] = json_decode($invoice['billing_details'], true);

            return [
                'success' => true,
                'data' => $invoice
            ];

        } catch (Exception $err) {
            error_log("❌ Fetch invoice error: " . $err->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to load invoice details.'
            ];
        }
    }
}
