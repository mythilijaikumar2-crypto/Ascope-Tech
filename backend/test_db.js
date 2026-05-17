const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testConnection() {
  console.log('Testing connection with config:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: '***'
  });
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connection successful:', res.rows[0]);
    
    // Check if courses table exists
    const tableCheck = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'courses')");
    console.log('Courses table exists:', tableCheck.rows[0].exists);
    
    if (tableCheck.rows[0].exists) {
        const courseCount = await pool.query('SELECT COUNT(*) FROM courses');
        console.log('Course count:', courseCount.rows[0].count);
    }
  } catch (err) {
    console.error('❌ Connection failed:', err);
    if (err.message && err.message.includes('database "ascope_db" does not exist')) {
        console.log('Suggestion: Create the database "ascope_db"');
    } else if (err.message.includes('password authentication failed')) {
        console.log('Suggestion: Check your password in .env');
    } else if (err.message.includes('ECONNREFUSED')) {
        console.log('Suggestion: Make sure PostgreSQL is running on port ' + process.env.DB_PORT);
    }
  } finally {
    await pool.end();
  }
}

testConnection();
