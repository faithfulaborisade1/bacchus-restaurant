import pool from '../config/database.js';
import { sendBookingEmail, sendBookingSMS } from '../services/notificationService.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, partySize } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !partySize) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Insert booking into database
    const query = `
      INSERT INTO bookings (name, email, phone, date, time, party_size, special_requests, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *
    `;

    const values = [name, email, phone, date, time, partySize, '', 'pending'];

    const result = await pool.query(query, values);
    const booking = result.rows[0];

    // Send emails asynchronously without blocking the response
    // This prevents timeout issues if email server is slow
    sendBookingEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Booking Request',
      booking: booking,
      type: 'admin'
    }).catch(err => console.error('Error sending admin email:', err));

    sendBookingEmail({
      to: email,
      subject: 'Booking Request Received - Bacchus Restaurant',
      booking: booking,
      type: 'customer_pending'
    }).catch(err => console.error('Error sending customer email:', err));

    // Optional: Send SMS notification
    // sendBookingSMS(phone, booking).catch(err => console.error('Error sending SMS:', err));

    // Respond immediately without waiting for emails
    res.status(201).json({
      message: 'Booking request received successfully',
      booking: booking
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get all bookings (for admin)
export const getAllBookings = async (req, res) => {
  try {
    const { status, date } = req.query;

    let query = 'SELECT * FROM bookings';
    const values = [];
    const conditions = [];

    if (status) {
      conditions.push(`status = $${conditions.length + 1}`);
      values.push(status);
    }

    if (date) {
      conditions.push(`date = $${conditions.length + 1}`);
      values.push(date);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id DESC';

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'rejected', 'completed', 'no-show'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const query = `
      UPDATE bookings
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = result.rows[0];

    // Send notification based on status (asynchronously without blocking)
    if (status === 'confirmed') {
      sendBookingEmail({
        to: booking.email,
        subject: 'Booking Confirmed - Bacchus Restaurant',
        booking: booking,
        type: 'customer_confirmed'
      }).catch(err => console.error('Error sending confirmation email:', err));

      // Optional: Send SMS confirmation
      // sendBookingSMS(booking.phone, booking, 'confirmed').catch(err => console.error('Error sending SMS:', err));
    } else if (status === 'rejected') {
      sendBookingEmail({
        to: booking.email,
        subject: 'Booking Update - Bacchus Restaurant',
        booking: booking,
        type: 'customer_rejected'
      }).catch(err => console.error('Error sending rejection email:', err));
    }

    // Respond immediately without waiting for emails
    res.json({
      message: 'Booking status updated successfully',
      booking: booking
    });

  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};
