import express from 'express';
import { createBooking, getAllBookings, updateBookingStatus } from '../controllers/bookingController.js';

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get all bookings (for admin dashboard)
router.get('/', getAllBookings);

// Update booking status (confirm, reject, etc.)
router.patch('/:id/status', updateBookingStatus);

export default router;
