const db = require('../config/db');

// @desc    Raise a new support ticket (JWT protected)
// @route   POST /api/tickets
exports.createTicket = async (req, res) => {
  const { subject, description, priority } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO tickets (user_id, subject, description, priority, status) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, subject, description, priority, status, created_at`,
      [req.user.id, subject.trim(), description.trim(), priority || 'medium', 'open']
    );

    const ticket = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Support ticket raised successfully!',
      ticket
    });

  } catch (error) {
    console.error('❌ Create Ticket Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: Unable to raise ticket.'
    });
  }
};

// @desc    Get all tickets raised by the current user (JWT protected)
// @route   GET /api/tickets
exports.getUserTickets = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, subject, description, priority, status, created_at FROM tickets WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      tickets: result.rows
    });

  } catch (error) {
    console.error('❌ Get User Tickets Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: Unable to fetch support tickets.'
    });
  }
};
