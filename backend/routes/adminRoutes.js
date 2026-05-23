const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure all admin routes using JWT and Role Authorization
router.use(protect);
router.use(authorize('admin'));

// 1. Fetch live system aggregates
// GET /api/admin/analytics
router.get('/analytics', adminController.getAnalytics);

// 2. Fetch all registered users
// GET /api/admin/users
router.get('/users', adminController.getUsers);

// 3. Fetch all active student course enrollments
// GET /api/admin/enrollments
router.get('/enrollments', adminController.getEnrollments);

// 4. Approve or decline enrollment statuses
// PUT /api/admin/enrollments/:id
router.put('/enrollments/:id', adminController.updateEnrollmentStatus);

// 5. Fetch all raised support tickets
// GET /api/admin/tickets
router.get('/tickets', adminController.getTickets);

// 6. Set ticket status (resolved, etc.)
// PUT /api/admin/tickets/:id
router.put('/tickets/:id', adminController.updateTicketStatus);

module.exports = router;
