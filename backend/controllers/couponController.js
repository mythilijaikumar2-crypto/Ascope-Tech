const { pool } = require('../config/db');

/**
 * Parses numeric price from string format (e.g. "₹11,999" -> 11999)
 */
const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const cleanStr = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleanStr, 10) || 0;
};

const applyCoupon = async (req, res) => {
    try {
        const { couponCode, courseId } = req.body;

        if (!couponCode || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code and Course ID are required.'
            });
        }

        // 1. Fetch active, non-expired coupon
        const couponResult = await pool.query(
            `SELECT * FROM coupons 
             WHERE UPPER(code) = UPPER($1) 
               AND active = TRUE 
               AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)`,
            [couponCode]
        );

        if (couponResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Invalid or expired coupon code.'
            });
        }

        const coupon = couponResult.rows[0];

        // 2. Fetch course details to verify purchase requirements
        const courseResult = await pool.query("SELECT * FROM courses WHERE id = $1", [courseId]);
        if (courseResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Selected course not found.'
            });
        }

        const course = courseResult.rows[0];
        const basePrice = parsePrice(course.price);

        // 3. Verify minimum cart value requirement
        const minCart = parseFloat(coupon.min_cart_value);
        if (basePrice < minCart) {
            return res.status(400).json({
                success: false,
                message: `Minimum purchase value of ₹${minCart.toLocaleString('en-IN')} is required to use this coupon.`
            });
        }

        // 4. Calculate discount
        let discount = 0;
        const discountVal = parseFloat(coupon.discount_value);

        if (coupon.discount_type === 'percentage') {
            discount = basePrice * (discountVal / 100);
            if (coupon.max_discount) {
                const maxD = parseFloat(coupon.max_discount);
                if (discount > maxD) {
                    discount = maxD;
                }
            }
        } else if (coupon.discount_type === 'flat') {
            discount = discountVal;
        }

        // Ensure discount doesn't exceed base price
        if (discount > basePrice) {
            discount = basePrice;
        }

        const finalPrice = basePrice - discount;

        return res.status(200).json({
            success: true,
            message: `Coupon '${coupon.code}' applied successfully!`,
            data: {
                couponId: coupon.id,
                code: coupon.code,
                discountType: coupon.discount_type,
                discountValue: discountVal,
                originalPrice: basePrice,
                discountAmount: Math.round(discount),
                finalPrice: Math.round(finalPrice)
            }
        });

    } catch (err) {
        console.error("❌ Apply coupon error:", err);
        return res.status(500).json({
            success: false,
            message: 'Server error: Unable to apply coupon.'
        });
    }
};

module.exports = {
    applyCoupon,
    parsePrice
};
