<?php
// backend/controllers/couponController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';

class CouponController {
    public static function parsePrice($priceStr) {
        if (!$priceStr) return 0;
        $cleanStr = preg_replace('/[^0-9]/', '', $priceStr);
        return (int)$cleanStr ?: 0;
    }

    public static function applyCoupon($req) {
        $user = AuthMiddleware::protect(); // JWT protected

        $body = $req['body'] ?? [];
        $couponCode = trim($body['couponCode'] ?? '');
        $courseId = isset($body['courseId']) ? (int)$body['courseId'] : null;

        if (empty($couponCode) || !$courseId) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Coupon code and Course ID are required.'
            ];
        }

        try {
            // 1. Fetch active, non-expired coupon
            $stmt = Database::query(
                "SELECT * FROM coupons 
                 WHERE UPPER(code) = UPPER(?) 
                   AND active = TRUE 
                   AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)",
                [$couponCode]
            );
            $coupon = $stmt->fetch();

            if (!$coupon) {
                http_response_code(404);
                return [
                    'success' => false,
                    'message' => 'Invalid or expired coupon code.'
                ];
            }

            // 2. Fetch course details
            $stmtCourse = Database::query("SELECT * FROM courses WHERE id = ?", [$courseId]);
            $course = $stmtCourse->fetch();

            if (!$course) {
                http_response_code(404);
                return [
                    'success' => false,
                    'message' => 'Selected course not found.'
                ];
            }

            $basePrice = self::parsePrice($course['price']);

            // 3. Verify minimum purchase threshold
            $minCart = (float)$coupon['min_cart_value'];
            if ($basePrice < $minCart) {
                http_response_code(400);
                return [
                    'success' => false,
                    'message' => "Minimum purchase value of ₹" . number_format($minCart, 0, '.', ',') . " is required to use this coupon."
                ];
            }

            // 4. Calculate discount amount
            $discount = 0;
            $discountVal = (float)$coupon['discount_value'];

            if ($coupon['discount_type'] === 'percentage') {
                $discount = $basePrice * ($discountVal / 100);
                if (!empty($coupon['max_discount'])) {
                    $maxD = (float)$coupon['max_discount'];
                    if ($discount > $maxD) {
                        $discount = $maxD;
                    }
                }
            } elseif ($coupon['discount_type'] === 'flat') {
                $discount = $discountVal;
            }

            // Bound checking: ensure discount doesn't exceed base price
            if ($discount > $basePrice) {
                $discount = $basePrice;
            }

            $finalPrice = $basePrice - $discount;

            return [
                'success' => true,
                'message' => "Coupon '" . $coupon['code'] . "' applied successfully!",
                'data' => [
                    'couponId' => (int)$coupon['id'],
                    'code' => $coupon['code'],
                    'discountType' => $coupon['discount_type'],
                    'discountValue' => $discountVal,
                    'originalPrice' => $basePrice,
                    'discountAmount' => (int)round($discount),
                    'finalPrice' => (int)round($finalPrice)
                ]
            ];

        } catch (Exception $err) {
            error_log("❌ Apply coupon error: " . $err->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to apply coupon.'
            ];
        }
    }
}
