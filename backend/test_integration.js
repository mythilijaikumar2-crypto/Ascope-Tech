const { Pool } = require('pg');
const axios = require('axios');

// Set up PostgreSQL Connection
const pool = new Pool({
  connectionString: "postgresql://postgres:root@localhost:5433/ascope_db"
});

const BASE_URL = 'http://localhost:5004/api';

async function runTests() {
  console.log("⚡ Starting Programmatic End-to-End Application Integration Audit...");
  
  let studentToken = "";
  let adminToken = "";
  let testStudentId = null;
  let testCourseId = null;
  let testEnrollmentId = null;
  let testTicketId = null;

  try {
    // 1. Database Connection check
    const dbCheck = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL is responsive at:", dbCheck.rows[0].now);

    // 2. Clear old integration test runs to ensure clean run
    await pool.query("DELETE FROM tickets WHERE subject LIKE '%[Integration Test]%'");
    await pool.query("DELETE FROM enrollments WHERE phone = '9999999999'");
    await pool.query("DELETE FROM courses WHERE title = '[Integration Test] Full Stack Development'");
    await pool.query("DELETE FROM users WHERE email = 'student_test@ascopetech.com'");
    console.log("🧹 Previous integration test data cleared successfully.");

    // 3. Test Student Registration Flow
    console.log("\n--- [STEP 1] Testing Student Registration ---");
    const regRes = await axios.post(`${BASE_URL}/auth/register`, {
      fullName: "Integration Test Student",
      email: "student_test@ascopetech.com",
      password: "studentpassword",
      phone: "9999999999"
    });

    if (regRes.data.success && regRes.data.token) {
      studentToken = regRes.data.token;
      testStudentId = regRes.data.user.id;
      console.log(`✅ Student Registration Successful! Token retrieved. Student ID: ${testStudentId}`);
    } else {
      throw new Error("Student registration failed to return success status.");
    }

    // 4. Test Student Login Flow
    console.log("\n--- [STEP 2] Testing Student Login ---");
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: "student_test@ascopetech.com",
      password: "studentpassword"
    });

    if (loginRes.data.success && loginRes.data.token) {
      console.log("✅ Student Login Successful! Session token verified.");
    } else {
      throw new Error("Student login failed.");
    }

    // 5. Seed a test course direct to db for enrollment testing
    console.log("\n--- [STEP 3] Seeding Test Course ---");
    const courseInsert = await pool.query(
      "INSERT INTO courses (title, category, duration, rating, price, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      ["[Integration Test] Full Stack Development", "Development", "6 Months", 4.9, "₹15,000", "/images/test.png"]
    );
    testCourseId = courseInsert.rows[0].id;
    console.log(`✅ Course Seeded with ID: ${testCourseId}`);

    // 6. Test Enrollment Application Submission (with student token)
    console.log("\n--- [STEP 4] Submitting Student Enrollment ---");
    const enrollRes = await axios.post(
      `${BASE_URL}/enroll`,
      {
        courseId: testCourseId,
        fullName: "Integration Test Student",
        email: "student_test@ascopetech.com",
        phone: "9999999999"
      },
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    if (enrollRes.data.success && enrollRes.data.enrollment) {
      testEnrollmentId = enrollRes.data.enrollment.id;
      console.log(`✅ Enrollment Application Submitted! Application ID: ${testEnrollmentId}`);
      console.log(`   Initial Status: ${enrollRes.data.enrollment.status}`);
    } else {
      throw new Error("Enrollment submission failed.");
    }

    // 7. Test Support Ticket Creation (with student token)
    console.log("\n--- [STEP 5] Raising Support Ticket ---");
    const ticketRes = await axios.post(
      `${BASE_URL}/tickets`,
      {
        subject: "[Integration Test] PostgreSQL Connection Role Problem",
        description: "Student is unable to execute migration commands due to pg role permission limitations.",
        priority: "high"
      },
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    if (ticketRes.data.success && ticketRes.data.ticket) {
      testTicketId = ticketRes.data.ticket.id;
      console.log(`✅ Support Ticket Created! Ticket ID: ${testTicketId}`);
      console.log(`   Initial Status: ${ticketRes.data.ticket.status}`);
    } else {
      throw new Error("Ticket submission failed.");
    }

    // 8. Test Admin Authentication Access
    console.log("\n--- [STEP 6] Authenticating Administrator Session ---");
    const adminLoginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: "admin@ascopetech.com",
      password: "adminpassword"
    });

    if (adminLoginRes.data.success && adminLoginRes.data.token) {
      adminToken = adminLoginRes.data.token;
      console.log("✅ Administrator Session Authenticated! Admin token retrieved.");
    } else {
      throw new Error("Administrator login failed. Was the admin user seeded?");
    }

    // 9. Test Admin Analytics Fetching
    console.log("\n--- [STEP 7] Testing Admin Analytics Gathering ---");
    const analyticsRes = await axios.get(`${BASE_URL}/admin/analytics`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    if (analyticsRes.data.success && analyticsRes.data.data) {
      const stats = analyticsRes.data.data;
      console.log("✅ Admin Analytics Aggregated Successfully!");
      console.log(`   Total System Users: ${stats.totalUsers}`);
      console.log(`   Total Course Enrollments: ${stats.totalEnrollments}`);
      console.log(`   Total Open Tickets: ${stats.openTickets}`);
    } else {
      throw new Error("Admin analytics retrieval failed.");
    }

    // 10. Test Admin Enrollment Approvals
    console.log("\n--- [STEP 8] Admin Modifying Enrollment Status ---");
    const approveRes = await axios.put(
      `${BASE_URL}/admin/enrollments/${testEnrollmentId}`,
      { status: "approved" },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    if (approveRes.data.success) {
      console.log(`✅ Enrollment Application ID #${testEnrollmentId} APPROVED successfully by administrator!`);
      // Double check in database
      const enrDb = await pool.query("SELECT status FROM enrollments WHERE id = $1", [testEnrollmentId]);
      console.log(`   Confirmed DB status: ${enrDb.rows[0].status}`);
    } else {
      throw new Error("Failed to approve student enrollment.");
    }

    // 11. Test Admin Ticket Resolution
    console.log("\n--- [STEP 9] Admin Resolving Support Ticket ---");
    const resolveRes = await axios.put(
      `${BASE_URL}/admin/tickets/${testTicketId}`,
      { status: "resolved" },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    if (resolveRes.data.success) {
      console.log(`✅ Support Ticket ID #${testTicketId} marked as RESOLVED by administrator!`);
      // Double check in database
      const ticketDb = await pool.query("SELECT status FROM tickets WHERE id = $1", [testTicketId]);
      console.log(`   Confirmed DB status: ${ticketDb.rows[0].status}`);
    } else {
      throw new Error("Failed to resolve support ticket.");
    }

    // 12. Cleanup Integration Test Data
    console.log("\n--- [STEP 10] Scrubbing Test Artifacts ---");
    await pool.query("DELETE FROM tickets WHERE id = $1", [testTicketId]);
    await pool.query("DELETE FROM enrollments WHERE id = $1", [testEnrollmentId]);
    await pool.query("DELETE FROM courses WHERE id = $1", [testCourseId]);
    await pool.query("DELETE FROM users WHERE id = $1", [testStudentId]);
    console.log("✅ Cleanup complete! Database remains pristine.");

    console.log("\n🎉 ========================================================");
    console.log("🏆 E2E AUDIT RESULTS: ALL 10 STEPS COMPLETED 100% SUCCESSFULLY!");
    console.log("🎉 ========================================================");

  } catch (err) {
    console.error("\n❌ INTEGRATION AUDIT FAILED!");
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
