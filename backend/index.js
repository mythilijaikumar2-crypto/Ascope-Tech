const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./config/db');

// --- DATABASE INITIALIZATION ---
// This runs every time the server starts to ensure the table exists
const initDB = async () => {
    try {
        // 1. Create table if it doesn't exist
        await db.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) DEFAULT 'Development',
                duration VARCHAR(100),
                rating NUMERIC(3, 2) DEFAULT 4.8,
                price VARCHAR(100),
                original_price VARCHAR(100),
                image TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        // 2. Create Contacts Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                course VARCHAR(200),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        // 3. Create Enrollments Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS enrollments (
                id SERIAL PRIMARY KEY,
                course_id INTEGER NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                status VARCHAR(20) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ Database initialized: 'courses', 'contacts' and 'enrollments' tables are ready.");

        // 2. Add sample data if the table is empty
        const result = await db.query("SELECT COUNT(*) FROM courses");
        if (parseInt(result.rows[0].count) === 0) {
            await db.query(`
                INSERT INTO courses (title, category, duration, rating, price, original_price, image) VALUES 
                ('Python Full Course', 'Development', '3 Months', 4.8, '₹11,999', '₹14,399', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'),
                ('Java Full Stack Development', 'Development', '6 Months', 4.9, '₹19,999', '₹23,999', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'),
                ('Cyber Security and Ethical Hacking', 'Development', '6 Months', 4.9, '₹25,999', '₹31,199', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'),
                ('Cloud Computing', 'Development', '4 Months', 4.7, '₹14,999', '₹17,999', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'),
                ('Mastering in Python + C', 'Development', '3 Months', 4.8, '₹19,999', '₹23,999', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80'),
                ('Digital Marketing', 'Marketing', '3 Months', 4.6, '₹9,999', '₹11,999', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'),
                ('UI/UX Design', 'Design', '3 Months', 4.8, '₹9,999', '₹11,999', '/images/ui_ux_course.png'),
                ('Data Science and Machine Learning', 'Data Science', '6 Months', 4.9, '₹19,999', '₹23,999', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'),
                ('Python and Data Science', 'Data Science', '4 Months', 4.8, '₹16,999', '₹20,399', 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80');
            `);
            console.log("🌱 Seed data inserted into 'courses' table.");
        }
    } catch (err) {
        console.error("❌ Database initialization error:", err.message);
    }
};

initDB();

// 1. Middleware
app.use(cors());
app.use(express.json()); // Essential for reading data sent from forms

// 2. Import Routes
const courseRoutes = require('./routes/courseRoutes');
const contactRoutes = require('./routes/contactRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const placementRoutes = require('./routes/placementRoutes');
const authRoutes = require('./routes/authRoutes');

// 3. Use Routes
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/enroll', enrollRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/auth', authRoutes);

// 4. Basic Root Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Ascope Tech Professional API" });
});

// 5. Global Error Handling Middleware
// This is a safety net for your app
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 6. Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Professional Backend is running at http://localhost:${PORT}`);
    console.log(`📡 Courses Endpoint: http://localhost:${PORT}/api/courses`);
});

// Trigger nodemon reload
