-- Database initialization for Ascope Tech

-- 1. Create the database (Run this separately if needed)
-- CREATE DATABASE ascope_db;

-- 2. Connect to ascope_db
-- \c ascope_db

-- 3. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(100),
    duration VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insert some initial professional data
INSERT INTO courses (title, price, duration) VALUES
('Full Stack Web Development', '₹45,000', '6 Months'),
('Data Science & AI', '₹55,000', '6 Months'),
('Cloud Computing (AWS/Azure)', '₹40,000', '4 Months'),
('UI/UX Design Masterclass', '₹30,000', '3 Months')
ON CONFLICT DO NOTHING;
