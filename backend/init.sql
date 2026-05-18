-- Database initialization for Ascope Tech

-- 1. Create the database (Run this separately if needed)
-- CREATE DATABASE ascope_db;

-- 2. Connect to ascope_db
-- \c ascope_db

-- 3. Create the courses table
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

-- 4. Insert some initial professional data
INSERT INTO courses (title, category, duration, rating, price, original_price, image) VALUES
('Python Full Course', 'Development', '3 Months', 4.8, '₹11,999', '₹14,399', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'),
('Java Full Stack Development', 'Development', '6 Months', 4.9, '₹19,999', '₹23,999', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'),
('Cyber Security and Ethical Hacking', 'Development', '6 Months', 4.9, '₹25,999', '₹31,199', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'),
('Cloud Computing', 'Development', '4 Months', 4.7, '₹14,999', '₹17,999', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'),
('Mastering in Python + C', 'Development', '3 Months', 4.8, '₹19,999', '₹23,999', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80'),
('Digital Marketing', 'Marketing', '3 Months', 4.6, '₹9,999', '₹11,999', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'),
('UI/UX Design', 'Design', '3 Months', 4.8, '₹9,999', '₹11,999', '/images/ui_ux_course.png'),
('Data Science and Machine Learning', 'Data Science', '6 Months', 4.9, '₹19,999', '₹23,999', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'),
('Python and Data Science', 'Data Science', '4 Months', 4.8, '₹16,999', '₹20,399', 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80')
ON CONFLICT DO NOTHING;
