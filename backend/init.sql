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
INSERT INTO courses (
        title,
        category,
        duration,
        rating,
        price,
        original_price,
        image
    )
VALUES (
        'Python Full Course',
        'Development',
        '3 Months',
        4.8,
        '₹11,999',
        '₹14,399',
        '/images/pythonfullcourse.png'
    ),
    (
        'Java Full Stack Development',
        'Development',
        '6 Months',
        4.9,
        '₹19,999',
        '₹23,999',
        '/images/javafullstack.png'
    ),
    (
        'Cyber Security and Ethical Hacking',
        'Development',
        '6 Months',
        4.9,
        '₹25,999',
        '₹31,199',
        '/images/cybersecurityimg.png'
    ),
    (
        'Cloud Computing',
        'Development',
        '4 Months',
        4.7,
        '₹14,999',
        '₹17,999',
        '/images/cloudimg.png'
    ),
    (
        'Mastering in Python and C Programming',
        'Development',
        '3 Months',
        4.8,
        '₹19,999',
        '₹23,999',
        '/images/pythoncimg.png'
    ),
    (
        'Digital Marketing',
        'Marketing',
        '3 Months',
        4.6,
        '₹9,999',
        '₹11,999',
        '/images/digitalmarketing.png'
    ),
    (
        'UI/UX Design',
        'Design',
        '3 Months',
        4.8,
        '₹9,999',
        '₹11,999',
        '/images/uiuximg.png'
    ),
    (
        'Data Science and Machine Learning',
        'Data Science',
        '6 Months',
        4.9,
        '₹19,999',
        '₹23,999',
        '/images/datascienceandmachinelerning.png'
    ),
    (
        'Python and Data Science',
        'Data Science',
        '4 Months',
        4.8,
        '₹16,999',
        '₹20,399',
        '/images/pythonanddatascienc.png'
    ) ON CONFLICT DO NOTHING;