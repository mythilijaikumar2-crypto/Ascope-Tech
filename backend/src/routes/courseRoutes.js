// backend/src/routes/courseRoutes.js
const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const courseValidations = require('../validations/courseValidations');

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Admin-only protected routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), courseValidations.validateCourse, courseController.createCourse);
router.put('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), courseController.updateCourse);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), courseController.deleteCourse);

module.exports = router;
