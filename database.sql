CREATE DATABASE IF NOT EXISTS timetable_generator;
USE timetable_generator;

CREATE TABLE IF NOT EXISTS timetables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- Ensure this user_id exists in a users table or remove it
    subjects TEXT NOT NULL,
    days TEXT NOT NULL,
    pdf_path TEXT NOT NULL, -- Increased to TEXT for longer paths
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
