const { pool } = require('../config/db');

// 1. Get Analytics Aggregates
const getAnalytics = async (req, res) => {
  try {
    const usersCount = await pool.query('SELECT COUNT(*) FROM users');
    const enrollmentsCount = await pool.query('SELECT COUNT(*) FROM enrollments');
    const coursesCount = await pool.query('SELECT COUNT(*) FROM courses');
    const ticketsCount = await pool.query('SELECT COUNT(*) FROM tickets');
    const openTicketsCount = await pool.query("SELECT COUNT(*) FROM tickets WHERE status = 'open'");
    const resolvedTicketsCount = await pool.query("SELECT COUNT(*) FROM tickets WHERE status = 'resolved'");
    const contactsCount = await pool.query('SELECT COUNT(*) FROM contacts');
    
    // Financial and sales analytics
    const revenueSum = await pool.query("SELECT SUM(amount) FROM payments WHERE status = 'captured'");
    const successPayments = await pool.query("SELECT COUNT(*) FROM payments WHERE status = 'captured'");
    const failedPayments = await pool.query("SELECT COUNT(*) FROM payments WHERE status = 'failed'");
    const topSellingResult = await pool.query(`
      SELECT c.title, COUNT(p.id) AS sales_count, COALESCE(SUM(p.amount), 0) AS total_sales 
      FROM payments p 
      JOIN courses c ON p.course_id = c.id 
      WHERE p.status = 'captured' 
      GROUP BY c.title 
      ORDER BY total_sales DESC 
      LIMIT 3
    `);

    res.status(200).json({
      success: true,
      data: {
        totalUsers: parseInt(usersCount.rows[0].count, 10),
        totalEnrollments: parseInt(enrollmentsCount.rows[0].count, 10),
        totalCourses: parseInt(coursesCount.rows[0].count, 10),
        totalTickets: parseInt(ticketsCount.rows[0].count, 10),
        openTickets: parseInt(openTicketsCount.rows[0].count, 10),
        resolvedTickets: parseInt(resolvedTicketsCount.rows[0].count, 10),
        totalContacts: parseInt(contactsCount.rows[0].count, 10),
        totalRevenue: parseFloat(revenueSum.rows[0].sum || 0),
        successfulPayments: parseInt(successPayments.rows[0].count, 10),
        failedPayments: parseInt(failedPayments.rows[0].count, 10),
        topCourses: topSellingResult.rows
      }
    });
  } catch (error) {
    console.error('❌ Admin Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve analytics data.'
    });
  }
};

// 2. Get Users Listing
const getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      'SELECT id, full_name, email, role, phone, created_at FROM users ORDER BY created_at DESC'
    );
    res.status(200).json({
      success: true,
      data: users.rows
    });
  } catch (error) {
    console.error('❌ Admin Users List Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve user database records.'
    });
  }
};

// 3. Get Enrollments with Course titles
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await pool.query(`
      SELECT e.*, c.title AS course_title 
      FROM enrollments e 
      LEFT JOIN courses c ON e.course_id = c.id 
      ORDER BY e.created_at DESC
    `);
    res.status(200).json({
      success: true,
      data: enrollments.rows
    });
  } catch (error) {
    console.error('❌ Admin Enrollments List Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve enrollment requests.'
    });
  }
};

// 4. Update Student Enrollment Status (e.g. approved / rejected)
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status value is required'
      });
    }

    const result = await pool.query(
      'UPDATE enrollments SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment status updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Admin Enrollment Status Update Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to update enrollment status.'
    });
  }
};

// 5. Get Support Tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await pool.query(`
      SELECT t.*, u.full_name AS student_name, u.email AS student_email 
      FROM tickets t 
      LEFT JOIN users u ON t.user_id = u.id 
      ORDER BY t.created_at DESC
    `);
    res.status(200).json({
      success: true,
      data: tickets.rows
    });
  } catch (error) {
    console.error('❌ Admin Tickets List Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve support tickets.'
    });
  }
};

// 6. Update Support Ticket Status
const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const result = await pool.query(
      'UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ticket record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Ticket status updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Admin Ticket Update Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to update support ticket.'
    });
  }
};

module.exports = {
  getAnalytics,
  getUsers,
  getEnrollments,
  updateEnrollmentStatus,
  getTickets,
  updateTicketStatus
};
