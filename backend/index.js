const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./config/db');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

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
                mobile_number VARCHAR(20),
                course_section VARCHAR(200),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        // Migration: Ensure course, first_name, last_name, phone, mobile_number, and course_section columns exist if table was created in an older run
        await db.query(`
            ALTER TABLE contacts ADD COLUMN IF NOT EXISTS course VARCHAR(200);
            ALTER TABLE contacts ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);
            ALTER TABLE contacts ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);
            ALTER TABLE contacts ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
            ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(20);
            ALTER TABLE contacts ADD COLUMN IF NOT EXISTS course_section VARCHAR(200);
        `);
        // 3. Create Enrollments Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS enrollments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER,
                course_id INTEGER NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                status VARCHAR(20) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        // Migration: Ensure user_id column exists on enrollments, link to users
        await db.query(`
            ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
        `);
        // Migration: Add unique composite constraint unique_user_course
        await db.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_course') THEN
                    ALTER TABLE enrollments ADD CONSTRAINT unique_user_course UNIQUE (user_id, course_id);
                END IF;
            END;
            $$;
        `);

        // 4. Create Users Table (Secure authentication)
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role VARCHAR(20) DEFAULT 'student',
                phone VARCHAR(20),
                date_of_birth VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Ensure date_of_birth column exists
        await db.query(`
            ALTER TABLE users ADD COLUMN IF NOT EXISTS date_of_birth VARCHAR(50);
        `);
        // 5. Create Support Tickets Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                subject VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                priority VARCHAR(20) DEFAULT 'medium',
                status VARCHAR(20) DEFAULT 'open',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        // 6. Create User Settings Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS user_settings (
                id SERIAL PRIMARY KEY,
                user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
                email_notifications BOOLEAN DEFAULT TRUE,
                sms_notifications BOOLEAN DEFAULT FALSE,
                dark_mode BOOLEAN DEFAULT FALSE,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 7. Create Coupons Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS coupons (
                id SERIAL PRIMARY KEY,
                code VARCHAR(50) UNIQUE NOT NULL,
                discount_type VARCHAR(20) DEFAULT 'percentage',
                discount_value NUMERIC(10, 2) NOT NULL,
                max_discount NUMERIC(10, 2),
                min_cart_value NUMERIC(10, 2) DEFAULT 0.00,
                active BOOLEAN DEFAULT TRUE,
                expires_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 8. Create Payments Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS payments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
                coupon_id INTEGER REFERENCES coupons(id) ON DELETE SET NULL,
                razorpay_order_id VARCHAR(255) UNIQUE,
                razorpay_payment_id VARCHAR(255) UNIQUE,
                razorpay_signature VARCHAR(255),
                amount NUMERIC(10, 2) NOT NULL,
                currency VARCHAR(10) DEFAULT 'INR',
                status VARCHAR(50) DEFAULT 'created',
                error_code VARCHAR(100),
                error_description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 9. Create Invoices Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS invoices (
                id SERIAL PRIMARY KEY,
                payment_id INTEGER UNIQUE REFERENCES payments(id) ON DELETE CASCADE,
                invoice_number VARCHAR(100) UNIQUE NOT NULL,
                issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                pdf_url TEXT,
                billing_details JSONB NOT NULL,
                subtotal NUMERIC(10, 2) NOT NULL,
                discount NUMERIC(10, 2) DEFAULT 0.00,
                tax NUMERIC(10, 2) DEFAULT 0.00,
                total NUMERIC(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create performance indexes
        await db.query(`
            CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
            CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(razorpay_order_id);
            CREATE INDEX IF NOT EXISTS idx_invoices_payment ON invoices(payment_id);
            CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
        `);

        // Seed Sample Coupons
        const couponCheck = await db.query("SELECT COUNT(*) FROM coupons");
        if (parseInt(couponCheck.rows[0].count, 10) === 0) {
            await db.query(`
                INSERT INTO coupons (code, discount_type, discount_value, max_discount, min_cart_value, expires_at) VALUES
                ('WELCOME10', 'percentage', 10.00, 2000.00, 0.00, CURRENT_TIMESTAMP + INTERVAL '1 year'),
                ('FLAT5000', 'flat', 5000.00, NULL, 10000.00, CURRENT_TIMESTAMP + INTERVAL '6 months'),
                ('ELITE20', 'percentage', 20.00, 5000.00, 12000.00, CURRENT_TIMESTAMP + INTERVAL '3 months');
            `);
            console.log("🌱 Seeded mock coupons successfully.");
        }

        // Check and Seed Default Admin User
        const adminCheck = await db.query("SELECT * FROM users WHERE role = 'admin'");
        if (adminCheck.rows.length === 0) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPw = await bcrypt.hash('adminpassword', salt);
            await db.query(`
                INSERT INTO users (full_name, email, password_hash, role)
                VALUES ('Ascope Admin', 'admin@ascopetech.com', $1, 'admin')
            `, [hashedPw]);
            console.log("🌱 Default Admin User Seeded successfully.");
        }

        console.log("✅ Database initialized: 'courses', 'contacts', 'enrollments', 'users', 'tickets', 'user_settings', 'coupons', 'payments', and 'invoices' tables are ready.");

        // 2. Add sample data if the table is empty
        const result = await db.query("SELECT COUNT(*) FROM courses");
        if (parseInt(result.rows[0].count) === 0) {
            await db.query(`
                INSERT INTO courses (title, category, duration, rating, price, original_price, image) VALUES 
                ('Python Full Course', 'Development', '3 Months', 4.8, '₹11,999', '₹14,399', '/images/pfc.png'),
                ('Java Full Stack Development', 'Development', '6 Months', 4.9, '₹19,999', '₹23,999', '/images/jfs_image.png'),
                ('Cyber Security and Ethical Hacking', 'Development', '6 Months', 4.9, '₹25,999', '₹31,199', '/images/cseh_image.png'),
                ('Cloud Computing', 'Development', '4 Months', 4.7, '₹14,999', '₹17,999', '/images/cc_image.png'),
                ('Mastering in Python + C', 'Development', '3 Months', 4.8, '₹19,999', '₹23,999', '/images/mpcp_image.png'),
                ('Digital Marketing', 'Marketing', '3 Months', 4.6, '₹9,999', '₹11,999', '/images/dm_image.png'),
                ('UI/UX Design', 'Design', '3 Months', 4.8, '₹9,999', '₹11,999', '/images/ui_ux_course.png'),
                ('Data Science and Machine Learning', 'Data Science', '6 Months', 4.9, '₹19,999', '₹23,999', '/images/dsml_image.png'),
                ('Python and Data Science', 'Data Science', '4 Months', 4.8, '₹16,999', '₹20,399', '/images/pds_image.png');
            `);
            console.log("🌱 Seed data inserted into 'courses' table.");
        }
    } catch (err) {
        console.error("❌ Database initialization error:", err.message);
    }
};

initDB();

// 1. Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Essential for reading data sent from forms

// Global API rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // Limit each IP to 150 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// 2. Import Routes
const courseRoutes = require('./routes/courseRoutes');
const contactRoutes = require('./routes/contactRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const placementRoutes = require('./routes/placementRoutes');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const couponRoutes = require('./routes/couponRoutes');

// 3. Use Routes
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/enroll', enrollRoutes);
app.use('/api/enrollments', enrollRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/coupon', couponRoutes);

// Direct Aliases for Registration and Login to support both styles
app.use('/api/register', (req, res, next) => {
    req.url = '/register';
    authRoutes(req, res, next);
});
app.use('/api/login', (req, res, next) => {
    req.url = '/login';
    authRoutes(req, res, next);
});

// 4. Serve React Production Build (SPA)
const path = require('path');
const fs = require('fs');
const frontendDistPath = path.join(__dirname, '../frontend/dist');

if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
    // Fallback any non-API routes to React's index.html to support SPA routing
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'));
    });
    console.log("📦 Production React build detected! Serving static frontend.");
} else {
    app.get('/', (req, res) => {
        res.json({ message: "Welcome to Ascope Tech Professional API" });
    });
}

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

// Trigger nodemon reload - 2026-05-21T13:24:00Z
