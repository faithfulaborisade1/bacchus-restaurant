import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaClock, FaUsers, FaUser, FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: '2',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Generate time slots (30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 17; // 5 PM
    const endHour = 21; // 9 PM (last booking)

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to backend API
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            partySize: '2',
            specialRequests: '',
          });
          onClose();
        }, 8000);
      } else {
        alert('Failed to submit booking. Please try calling us directly.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Unable to submit booking. Please try calling us at 09064 50433.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="booking-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="booking-modal"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>

          {isSuccess ? (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <h2>Booking Request Received!</h2>
              <div className="pending-notice">
                <p className="notice-title">⏳ Pending Confirmation</p>
                <p className="notice-text">
                  Thank you for your booking request! This is <strong>NOT a confirmed reservation</strong>.
                </p>
                <p className="notice-text">
                  Our team will review your request and send you a confirmation via <strong>email and SMS</strong> shortly.
                </p>
                <p className="notice-text">
                  Please check your inbox and phone for our confirmation message.
                </p>
              </div>
              <div className="booking-summary">
                <h3>Your Booking Details:</h3>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Party Size:</strong> {formData.partySize} {formData.partySize === '1' ? 'person' : 'people'}</p>
              </div>
              <p className="contact-info">
                Questions? Call us at <a href="tel:0906450433">09064 50433</a>
              </p>
            </motion.div>
          ) : (
            <>
              <div className="modal-header">
                <h2>Reserve a Table</h2>
                <p className="modal-subtitle">We look forward to welcoming you</p>
                <p className="modal-description">Book your unforgettable riverside dining experience</p>
              </div>

              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FaUser /> Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      <FaEnvelope /> Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <FaPhone /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="087 123 4567"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">
                      <FaCalendarAlt /> Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={getMinDate()}
                      className={errors.date ? 'error' : ''}
                    />
                    {errors.date && <span className="error-message">{errors.date}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">
                      <FaClock /> Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={errors.time ? 'error' : ''}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time && <span className="error-message">{errors.time}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="partySize">
                      <FaUsers /> Party Size *
                    </label>
                    <select
                      id="partySize"
                      name="partySize"
                      value={formData.partySize}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                      <option value="7+">7+ people (call required)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests / Dietary Requirements</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any allergies, special occasions, or seating preferences..."
                  />
                </div>

                {formData.partySize === '7+' && (
                  <div className="large-party-notice">
                    <p>
                      <strong>Large Party Notice:</strong> For parties of 7 or more, please call us
                      directly at <a href="tel:0906450433">09064 50433</a> to ensure we can
                      accommodate your group.
                    </p>
                  </div>
                )}

                <div className="policy-notice">
                  <p>
                    <strong>Please Note:</strong> Reservations must be confirmed by our team via email
                    or SMS. Please arrive within 15 minutes of your reservation time.
                  </p>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting || formData.partySize === '7+'}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Reservation'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
