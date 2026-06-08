// backend/src/config/initDb.js
const { pool } = require('./db');
const bcrypt = require('bcryptjs');

/**
 * Automatically initializes and seeds the PostgreSQL database tables.
 */
async function initDatabase() {
  const client = await pool.connect();
  try {
    console.log('⚡ Starting database schema migrations...');
    await client.query('BEGIN');

    // 1. Users Table
    await client.query(`
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

    // 2. User Settings Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_settings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        email_notifications BOOLEAN DEFAULT TRUE,
        sms_notifications BOOLEAN DEFAULT FALSE,
        dark_mode BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Courses Table
    await client.query(`
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

    // 4. Contacts Table
    await client.query(`
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

    // 5. Enrollments Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        course_id INTEGER NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
      );
    `);

    // 6. Tickets Table
    await client.query(`
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

    // 7. Coupons Table
    await client.query(`
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

    // 8. Payments Table
    await client.query(`
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

    // 9. Invoices Table
    await client.query(`
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

    // 10. Database Indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(razorpay_order_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_invoices_payment ON invoices(payment_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id)');

    // 11. Database Seeding
    // A. Default Admin User
    const adminCheck = await client.query("SELECT id FROM users WHERE role = 'admin'");
    if (adminCheck.rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPw = await bcrypt.hash('adminpassword', salt);
      const adminInsert = await client.query(`
        INSERT INTO users (full_name, email, password_hash, role)
        VALUES ('Ascope Admin', 'admin@ascopetech.com', $1, 'admin')
        RETURNING id
      `, [hashedPw]);
      const adminId = adminInsert.rows[0].id;

      // Seed settings for admin user
      await client.query(`
        INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode)
        VALUES ($1, true, false, false)
      `, [adminId]);

      console.log('🌱 Seeded default administrator user successfully.');
    }

    // B. Coupons Seed
    const couponCheck = await client.query('SELECT COUNT(*) FROM coupons');
    if (parseInt(couponCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO coupons (code, discount_type, discount_value, max_discount, min_cart_value, expires_at) VALUES
        ('WELCOME10', 'percentage', 10.00, 2000.00, 0.00, CURRENT_TIMESTAMP + INTERVAL '1 year'),
        ('FLAT5000', 'flat', 5000.00, NULL, 10000.00, CURRENT_TIMESTAMP + INTERVAL '6 months'),
        ('ELITE20', 'percentage', 20.00, 5000.00, 12000.00, CURRENT_TIMESTAMP + INTERVAL '3 months')
      `);
      console.log('🌱 Seeded mock system coupons successfully.');
    }

    // C. Courses Catalog Seed
    const courseCheck = await client.query('SELECT COUNT(*) FROM courses');
    if (parseInt(courseCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO courses (title, category, duration, rating, price, original_price, image) VALUES 
        ('Python Full Course', 'Development', '3 Months', 4.8, '₹11,999', '₹14,399', '/images/pythonfullcourse.png'),
        ('Java Full Stack Development', 'Development', '6 Months', 4.9, '₹19,999', '₹23,999', '/images/javafullstack.png'),
        ('Cyber Security and Ethical Hacking', 'Development', '6 Months', 4.9, '₹25,999', '₹31,199', '/images/cybersecurityimg.png'),
        ('Cloud Computing', 'Development', '4 Months', 4.7, '₹14,999', '₹17,999', '/images/cloudimg.png'),
        ('Mastering in Python and C Programming', 'Development', '3 Months', 4.8, '₹19,999', '₹23,999', '/images/pythoncimg.png'),
        ('Digital Marketing', 'Marketing', '3 Months', 4.6, '₹9,999', '₹11,999', '/images/digitalmarketing.png'),
        ('UI/UX Design', 'Design', '3 Months', 4.8, '₹9,999', '₹11,999', '/images/uiuximg.png'),
        ('Data Science and Machine Learning', 'Data Science', '6 Months', 4.9, '₹19,999', '₹23,999', '/images/datascienceandmachinelerning.png'),
        ('Python and Data Science', 'Data Science', '4 Months', 4.8, '₹16,999', '₹20,399', '/images/pythonanddatascienc.png')
      `);
      console.log('🌱 Seeded courses catalog database entries successfully.');
    }

    await client.query('COMMIT');
    console.log('✅ Database schema migrated and seeded successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Database migration/seed transaction aborted:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = initDatabase;
