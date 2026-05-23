const { Pool } = require('pg');
require('dotenv').config();

// Initialize the Connection Pool with support for production connection strings (DATABASE_URL) and SSL requirements
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1')
          ? false
          : { rejectUnauthorized: false }
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      }
);

// Log a success message when connected
pool.on('connect', () => {
  console.log('✅ Connected to the PostgreSQL database successfully!');
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Export the pool and query method
module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
