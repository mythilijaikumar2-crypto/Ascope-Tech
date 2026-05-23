const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { pool } = require('./config/db');

const BASE_URL = `http://localhost:${process.env.PORT || 5004}/api`;

async function runTests() {
  console.log("⚡ Starting Razorpay Payment System E2E Audit...");
  
  let studentToken = "";
  let testStudentId = null;
  let testCourseId = null;
  let testPaymentId = null;
  let testOrderId = null;
  let testInvoiceId = null;
  
  try {
    // 1. Check DB Connection
    const dbCheck = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL is responsive at:", dbCheck.rows[0].now);

    // 2. Clear old integration test runs to ensure clean run
    await pool.query("DELETE FROM enrollments WHERE email = 'payment_test@ascopetech.com'");
    await pool.query("DELETE FROM payments WHERE user_id IN (SELECT id FROM users WHERE email = 'payment_test@ascopetech.com')");
    await pool.query("DELETE FROM users WHERE email = 'payment_test@ascopetech.com'");
    await pool.query("DELETE FROM courses WHERE title = '[Payment Test] React Masterclass'");
    console.log("🧹 Previous payment test data cleared successfully.");

    // 3. Register test student
    console.log("\n--- [STEP 1] Testing Student Registration ---");
    const regRes = await axios.post(`${BASE_URL}/auth/register`, {
      fullName: "Payment Test Student",
      email: "payment_test@ascopetech.com",
      password: "testpassword",
      phone: "9999999999"
    });

    if (regRes.data.success && regRes.data.token) {
      studentToken = regRes.data.token;
      testStudentId = regRes.data.user.id;
      console.log(`✅ Student Registration Successful! Token retrieved. Student ID: ${testStudentId}`);
    } else {
      throw new Error("Student registration failed.");
    }

    // 4. Seed a test course direct to db for checkout testing
    console.log("\n--- [STEP 2] Seeding Test Course ---");
    const courseInsert = await pool.query(
      "INSERT INTO courses (title, category, duration, rating, price, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      ["[Payment Test] React Masterclass", "Development", "3 Months", 4.8, "₹12,000", "/images/test.png"]
    );
    testCourseId = courseInsert.rows[0].id;
    console.log(`✅ Course Seeded with ID: ${testCourseId}`);

    // 5. Test Coupon Code Application Preview
    console.log("\n--- [STEP 3] Testing Coupon Code Application Preview ---");
    const couponRes = await axios.post(
      `${BASE_URL}/coupon/apply`,
      {
        couponCode: "WELCOME10",
        courseId: testCourseId
      },
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    if (couponRes.data.success && couponRes.data.data) {
      const data = couponRes.data.data;
      console.log(`✅ Coupon code 'WELCOME10' applied successfully!`);
      console.log(`   Original Price: ₹${data.originalPrice}`);
      console.log(`   Discount: ₹${data.discountAmount}`);
      console.log(`   Final Price: ₹${data.finalPrice}`);
      if (data.finalPrice !== 10800) {
        throw new Error(`Invalid final price calculation: expected 10800, got ${data.finalPrice}`);
      }
    } else {
      throw new Error("Coupon application endpoint failed.");
    }

    // 6. Test Payment Order Creation (Checkout init)
    console.log("\n--- [STEP 4] Testing Checkout Order Creation ---");
    const orderRes = await axios.post(
      `${BASE_URL}/payment/create-order`,
      {
        courseId: testCourseId,
        couponCode: "WELCOME10"
      },
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    if (orderRes.data.success && orderRes.data.data) {
      const orderData = orderRes.data.data;
      testOrderId = orderData.orderId;
      console.log(`✅ Razorpay/Mock Order Created Successfully!`);
      console.log(`   Order ID: ${testOrderId}`);
      console.log(`   Amount: ${orderData.amount} paise (₹${orderData.amount / 100})`);
      console.log(`   Currency: ${orderData.currency}`);
      console.log(`   Sandbox Mode: ${orderData.isMock}`);
      if (orderData.isMock !== true) {
        throw new Error("Expected checkout order to run in Sandbox/Mock fallback mode.");
      }
    } else {
      throw new Error("Payment order creation failed.");
    }

    // 7. Test Payment Verification (Callback)
    console.log("\n--- [STEP 5] Testing Payment Verification (Mock Callback) ---");
    const verifyRes = await axios.post(
      `${BASE_URL}/payment/verify`,
      {
        razorpay_order_id: testOrderId,
        razorpay_payment_id: `pay_mock_${Math.random().toString(36).substring(2, 10)}`,
        razorpay_signature: "mock_signature_bypass_for_sandbox"
      },
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    if (verifyRes.data.success && verifyRes.data.data) {
      const verifyData = verifyRes.data.data;
      testInvoiceId = verifyData.invoice.id;
      console.log(`✅ Payment Signature Verified and Automated Enrollment Activated!`);
      console.log(`   Enrollment ID: ${verifyData.enrollment.id}`);
      console.log(`   Enrollment Status: ${verifyData.enrollment.status}`);
      console.log(`   Invoice Number: ${verifyData.invoice.invoice_number}`);
    } else {
      throw new Error("Payment verification failed.");
    }

    // 8. Test Payment History Ledger retrieval
    console.log("\n--- [STEP 6] Testing Payment History Ledger Retrieval ---");
    const historyRes = await axios.get(
      `${BASE_URL}/payment/history`,
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    if (historyRes.data.success && historyRes.data.data) {
      const historyList = historyRes.data.data;
      const verifiedItem = historyList.find(item => item.razorpay_order_id === testOrderId);
      if (verifiedItem) {
        console.log(`✅ Chronological ledger verified!`);
        console.log(`   Amount: ₹${verifiedItem.amount}`);
        console.log(`   Payment Status: ${verifiedItem.status}`);
        console.log(`   Associated Invoice ID: ${verifiedItem.invoice_id}`);
      } else {
        throw new Error("Payment ledger record for our checkout is missing.");
      }
    } else {
      throw new Error("Payment history retrieval failed.");
    }

    // 9. Test Granular Corporate Invoice Retrieval
    console.log("\n--- [STEP 7] Testing Granular Corporate Tax Invoice Retrieval ---");
    const invoiceRes = await axios.get(
      `${BASE_URL}/payment/invoice/${testInvoiceId}`,
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    if (invoiceRes.data.success && invoiceRes.data.data) {
      const invoiceData = invoiceRes.data.data;
      console.log(`✅ Detailed Tax Invoice retrieved!`);
      console.log(`   Invoice Number: ${invoiceData.invoice_number}`);
      console.log(`   Total (Inclusive of GST): ₹${invoiceData.total}`);
      console.log(`   Subtotal (Educational Tuition): ₹${invoiceData.subtotal}`);
      console.log(`   Tax (18% inclusive GST): ₹${invoiceData.tax}`);
      console.log(`   Discount Deducted: ₹${invoiceData.discount}`);
      
      // Asset values match expectations
      const expectedTotal = 10800; // 12000 - 1200 (10% discount)
      const parsedTotal = parseFloat(invoiceData.total);
      if (parsedTotal !== expectedTotal) {
        throw new Error(`Invoice total calculation error. Expected: ${expectedTotal}, got: ${parsedTotal}`);
      }
    } else {
      throw new Error("Granular invoice retrieval failed.");
    }

    // 10. Clean up test database rows
    console.log("\n--- [STEP 8] Cleaning Up Payment Test Records ---");
    await pool.query("DELETE FROM enrollments WHERE email = 'payment_test@ascopetech.com'");
    await pool.query("DELETE FROM payments WHERE user_id = $1", [testStudentId]);
    await pool.query("DELETE FROM users WHERE id = $1", [testStudentId]);
    await pool.query("DELETE FROM courses WHERE id = $1", [testCourseId]);
    console.log("✅ Cleanup complete! Database remains pristine.");

    console.log("\n🎉 ========================================================");
    console.log("🏆 PAYMENT SYSTEM E2E AUDIT: COMPLETED 100% SUCCESSFULLY!");
    console.log("🎉 ========================================================");

  } catch (err) {
    console.error("\n❌ PAYMENT SYSTEM E2E AUDIT FAILED!");
    if (err.response) {
      console.error("   API Error response data:", err.response.data);
    } else {
      console.error("   Details:", err.message);
    }
    process.exit(1);
  } finally {
    pool.end();
  }
}

runTests();
