import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCheckCircle, FaTimesCircle, FaFilter } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin/login');
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/bookings`);
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchBookings(); // Refresh bookings
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'rejected':
        return '#f44336';
      case 'completed':
        return '#2196f3';
      case 'no-show':
        return '#9e9e9e';
      default:
        return '#999';
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading bookings...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Bacchus Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="filters">
          <FaFilter /> Filter:
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({bookings.length})
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({bookings.filter((b) => b.status === 'pending').length})
          </button>
          <button
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({bookings.filter((b) => b.status === 'confirmed').length})
          </button>
          <button
            className={filter === 'rejected' ? 'active' : ''}
            onClick={() => setFilter('rejected')}
          >
            Rejected ({bookings.filter((b) => b.status === 'rejected').length})
          </button>
        </div>

        <div className="bookings-grid">
          {filteredBookings.length === 0 ? (
            <p className="no-bookings">No bookings found</p>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <span
                    className="status-badge"
                    style={{ background: getStatusColor(booking.status) }}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                  <span className="booking-id">#{booking.id}</span>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <strong>Name:</strong> {booking.name}
                  </div>
                  <div className="detail-row">
                    <strong>Email:</strong> {booking.email}
                  </div>
                  <div className="detail-row">
                    <strong>Phone:</strong> {booking.phone}
                  </div>
                  <div className="detail-row">
                    <strong>Date:</strong>{' '}
                    {new Date(booking.date).toLocaleDateString('en-IE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="detail-row">
                    <strong>Time:</strong> {booking.time}
                  </div>
                  <div className="detail-row">
                    <strong>Party Size:</strong> {booking.party_size} people
                  </div>
                  {booking.special_requests && (
                    <div className="detail-row">
                      <strong>Special Requests:</strong> {booking.special_requests}
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Created:</strong>{' '}
                    {new Date(booking.created_at).toLocaleString('en-IE')}
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="booking-actions">
                    <button
                      className="confirm-btn"
                      onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                    >
                      <FaCheckCircle /> Confirm
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
