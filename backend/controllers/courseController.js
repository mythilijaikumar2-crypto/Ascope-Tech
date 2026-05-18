const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const FALLBACK_FILE = path.join(__dirname, '../data/courses_fallback.json');

const getFallbackCourses = () => {
    try {
        if (!fs.existsSync(path.dirname(FALLBACK_FILE))) {
            fs.mkdirSync(path.dirname(FALLBACK_FILE), { recursive: true });
        }
        if (!fs.existsSync(FALLBACK_FILE)) {
            const initialData = [
                {
                    id: 1,
                    title: "Python Full Course",
                    category: "Development",
                    duration: "3 Months",
                    rating: 4.8,
                    price: "₹11,999",
                    originalPrice: "₹14,399",
                    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 2,
                    title: "Java Full Stack Development",
                    category: "Development",
                    duration: "6 Months",
                    rating: 4.9,
                    price: "₹19,999",
                    originalPrice: "₹23,999",
                    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 3,
                    title: "Cyber Security and Ethical Hacking",
                    category: "Development",
                    duration: "6 Months",
                    rating: 4.9,
                    price: "₹25,999",
                    originalPrice: "₹31,199",
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 4,
                    title: "Cloud Computing",
                    category: "Development",
                    duration: "4 Months",
                    rating: 4.7,
                    price: "₹14,999",
                    originalPrice: "₹17,999",
                    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 5,
                    title: "Mastering in Python + C",
                    category: "Development",
                    duration: "3 Months",
                    rating: 4.8,
                    price: "₹19,999",
                    originalPrice: "₹23,999",
                    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 6,
                    title: "Digital Marketing",
                    category: "Marketing",
                    duration: "3 Months",
                    rating: 4.6,
                    price: "₹9,999",
                    originalPrice: "₹11,999",
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 7,
                    title: "UI/UX Design",
                    category: "Design",
                    duration: "3 Months",
                    rating: 4.8,
                    price: "₹9,999",
                    originalPrice: "₹11,999",
                    image: "/images/ui_ux_course.png"
                },
                {
                    id: 8,
                    title: "Data Science and Machine Learning",
                    category: "Data Science",
                    duration: "6 Months",
                    rating: 4.9,
                    price: "₹19,999",
                    originalPrice: "₹23,999",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 9,
                    title: "Python and Data Science",
                    category: "Data Science",
                    duration: "4 Months",
                    rating: 4.8,
                    price: "₹16,999",
                    originalPrice: "₹20,399",
                    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
                }
            ];
            fs.writeFileSync(FALLBACK_FILE, JSON.stringify(initialData, null, 2));
            return initialData;
        }
        return JSON.parse(fs.readFileSync(FALLBACK_FILE, 'utf-8'));
    } catch (err) {
        console.error("❌ Error reading fallback courses:", err);
        return [];
    }
};

const saveFallbackCourses = (courses) => {
    try {
        if (!fs.existsSync(path.dirname(FALLBACK_FILE))) {
            fs.mkdirSync(path.dirname(FALLBACK_FILE), { recursive: true });
        }
        fs.writeFileSync(FALLBACK_FILE, JSON.stringify(courses, null, 2));
    } catch (err) {
        console.error("❌ Error writing fallback courses:", err);
    }
};

const mapCourseRow = (row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    duration: row.duration,
    rating: parseFloat(row.rating) || 4.8,
    price: row.price,
    originalPrice: row.original_price || row.originalprice || row.originalPrice,
    image: row.image
});

// @desc    Get all courses from PostgreSQL (or local JSON fallback)
// @route   GET /api/courses
exports.getAllCourses = async (req, res) => {
    const limit = parseInt(req.query.limit);
    try {
        console.log(`Controller: Fetching courses... (limit: ${limit || 'none'})`);
        let queryText = 'SELECT * FROM courses ORDER BY id ASC';
        let queryParams = [];
        if (limit && !isNaN(limit)) {
            queryText += ' LIMIT $1';
            queryParams.push(limit);
        }
        const result = await db.query(queryText, queryParams);
        const courses = result.rows.map(mapCourseRow);
        
        // Return wrapped in success and data to match frontend expectations
        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (err) {
        console.warn("⚠️ Database query failed. Falling back to local JSON data store:", err.message);
        let fallbackCourses = getFallbackCourses();
        if (limit && !isNaN(limit)) {
            fallbackCourses = fallbackCourses.slice(0, limit);
        }
        res.status(200).json({
            success: true,
            data: fallbackCourses
        });
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
        res.status(200).json({
            success: true,
            data: mapCourseRow(result.rows[0])
        });
    } catch (err) {
        console.warn("⚠️ Database query failed. Falling back to local JSON data store:", err.message);
        const fallbackCourses = getFallbackCourses();
        const course = fallbackCourses.find(c => c.id === parseInt(id));
        if (!course) {
            return res.status(404).json({ error: 'Course not found (fallback)' });
        }
        res.status(200).json({
            success: true,
            data: course
        });
    }
};

// @desc    Create a new course
// @route   POST /api/courses
exports.createCourse = async (req, res) => {
    const { title, category, duration, rating, price, originalPrice, image } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO courses (title, category, duration, rating, price, original_price, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, category || 'Development', duration, rating || 4.8, price, originalPrice, image]
        );
        res.status(201).json({
            success: true,
            data: mapCourseRow(result.rows[0])
        });
    } catch (err) {
        console.warn("⚠️ Database query failed. Falling back to local JSON data store:", err.message);
        const fallbackCourses = getFallbackCourses();
        const newCourse = {
            id: fallbackCourses.length > 0 ? Math.max(...fallbackCourses.map(c => c.id)) + 1 : 1,
            title,
            category: category || 'Development',
            duration,
            rating: rating || 4.8,
            price,
            originalPrice,
            image,
            created_at: new Date().toISOString()
        };
        fallbackCourses.push(newCourse);
        saveFallbackCourses(fallbackCourses);
        res.status(201).json({
            success: true,
            data: newCourse
        });
    }
};

// @desc    Update an existing course
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, category, duration, rating, price, originalPrice, image } = req.body;
    try {
        const result = await db.query(
            'UPDATE courses SET title = $1, category = $2, duration = $3, rating = $4, price = $5, original_price = $6, image = $7 WHERE id = $8 RETURNING *',
            [title, category, duration, rating, price, originalPrice, image, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({
            success: true,
            data: mapCourseRow(result.rows[0])
        });
    } catch (err) {
        console.warn("⚠️ Database query failed. Falling back to local JSON data store:", err.message);
        const fallbackCourses = getFallbackCourses();
        const index = fallbackCourses.findIndex(c => c.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ error: 'Course not found (fallback)' });
        }
        fallbackCourses[index] = {
            ...fallbackCourses[index],
            title: title !== undefined ? title : fallbackCourses[index].title,
            category: category !== undefined ? category : fallbackCourses[index].category,
            duration: duration !== undefined ? duration : fallbackCourses[index].duration,
            rating: rating !== undefined ? rating : fallbackCourses[index].rating,
            price: price !== undefined ? price : fallbackCourses[index].price,
            originalPrice: originalPrice !== undefined ? originalPrice : fallbackCourses[index].originalPrice,
            image: image !== undefined ? image : fallbackCourses[index].image
        };
        saveFallbackCourses(fallbackCourses);
        res.status(200).json({
            success: true,
            data: fallbackCourses[index]
        });
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
        res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (err) {
        console.warn("⚠️ Database query failed. Falling back to local JSON data store:", err.message);
        const fallbackCourses = getFallbackCourses();
        const index = fallbackCourses.findIndex(c => c.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ error: 'Course not found (fallback)' });
        }
        fallbackCourses.splice(index, 1);
        saveFallbackCourses(fallbackCourses);
        res.status(200).json({ success: true, message: 'Course deleted successfully (fallback)' });
    }
};
