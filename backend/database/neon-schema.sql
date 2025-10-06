-- Bacchus Restaurant Database Schema for Neon
-- Run this in Neon SQL Editor

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  party_size INTEGER NOT NULL,
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'completed', 'no-show')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON bookings(date, status);

-- Insert sample test data
INSERT INTO bookings (name, email, phone, date, time, party_size, special_requests, status)
VALUES
  ('Test User', 'test@example.com', '0871234567', CURRENT_DATE + INTERVAL '7 days', '19:00', 2, 'Window seat if possible', 'pending');

-- Verify table was created
SELECT * FROM bookings;
