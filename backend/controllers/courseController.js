const db = require('../config/db');

// @desc    Get all courses from PostgreSQL
// @route   GET /api/courses
exports.getAllCourses = async (req, res) => {
    try {
        console.log("Controller: Fetching courses...");
        const result = await db.query('SELECT * FROM courses ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error in getAllCourses:", err.message);
        res.status(500).json({ error: 'Internal Server Error', message: err.message, stack: err.stack });
    }
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
exports.getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM courses WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Create a new course
// @route   POST /api/courses
exports.createCourse = async (req, res) => {
    const { title, price, duration } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO courses (title, price, duration) VALUES ($1, $2, $3) RETURNING *',
            [title, price, duration]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Update an existing course
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, price, duration } = req.body;
    try {
        const result = await db.query(
            'UPDATE courses SET title = $1, price = $2, duration = $3 WHERE id = $4 RETURNING *',
            [title, price, duration, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};
