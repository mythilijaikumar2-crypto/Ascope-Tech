const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ticketController = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const { validateInputs } = require('../middleware/validationMiddleware');

// All ticket routes are protected by default
router.use(protect);

// 1. Raise a Support Ticket
// POST /api/tickets
router.post(
  '/',
  [
    body('subject').trim().notEmpty().withMessage('Ticket subject is required').isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters'),
    body('description').trim().notEmpty().withMessage('Ticket description is required'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
    validateInputs
  ],
  ticketController.createTicket
);

// 2. Fetch User's Support Tickets list
// GET /api/tickets
router.get('/', ticketController.getUserTickets);

module.exports = router;
