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
                price VARCHAR(100),
                duration VARCHAR(100),
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
                INSERT INTO courses (title, price, duration) VALUES 
                ('Full Stack Web Development', '₹45,000', '6 Months'),
                ('Professional Data Science', '₹55,000', '6 Months'),
                ('Cloud Computing (AWS/Azure)', '₹40,000', '4 Months'),
                ('UI/UX Design Masterclass', '₹30,000', '3 Months');
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
