-- Create database
CREATE DATABASE bacchus_restaurant;

-- Connect to the database
\c bacchus_restaurant;

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

-- Create index on date and status for faster queries
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date_status ON bookings(date, status);

-- Insert sample data (optional)
INSERT INTO bookings (name, email, phone, date, time, party_size, special_requests, status)
VALUES
  ('John Doe', 'john@example.com', '0871234567', '2025-10-15', '19:00', 2, 'Window seat if possible', 'confirmed'),
  ('Jane Smith', 'jane@example.com', '0879876543', '2025-10-16', '20:00', 4, 'Birthday celebration', 'pending');

-- Display tables
\dt
