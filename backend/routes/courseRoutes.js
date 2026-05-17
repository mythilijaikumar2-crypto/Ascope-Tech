const express = require('express');
const router = express.Router();
const { 
    getAllCourses, 
    getCourseById, 
    createCourse, 
    updateCourse, 
    deleteCourse 
} = require('../controllers/courseController');

// Define the routes and link them to the controller functions
router.get('/', getAllCourses);           // Fetch all courses
router.get('/:id', getCourseById);       // Fetch a specific course by ID
router.post('/', createCourse);          // Add a new course
router.put('/:id', updateCourse);        // Update an existing course
router.delete('/:id', deleteCourse);     // Delete a course

module.exports = router;
