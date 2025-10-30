import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaUsers
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    rejected: 0
  });
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

      // Calculate stats
      setStats({
        total: data.length,
        pending: data.filter(b => b.status === 'pending').length,
        confirmed: data.filter(b => b.status === 'confirmed').length,
        rejected: data.filter(b => b.status === 'rejected').length
      });

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
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Bacchus Admin</h1>
            <p className="header-subtitle">Restaurant Booking Management</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-card confirmed">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.confirmed}</h3>
              <p>Confirmed</p>
            </div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-header">
            <FaFilter /> <span>Filter Bookings</span>
          </div>
          <div className="filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({bookings.length})
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({stats.pending})
            </button>
            <button
              className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({stats.confirmed})
            </button>
            <button
              className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >
              Rejected ({stats.rejected})
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bookings-container">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              <p>No bookings found</p>
            </div>
          ) : (
            <div className="bookings-table">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-row">
                  <div className="booking-main-info">
                    <div className="booking-header-row">
                      <span
                        className="status-badge"
                        style={{ background: getStatusColor(booking.status) }}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                      <span className="booking-id">Booking #{booking.id}</span>
                    </div>

                    <div className="booking-details-grid">
                      <div className="detail-item">
                        <FaUser className="detail-icon" />
                        <div>
                          <span className="detail-label">Guest Name</span>
                          <span className="detail-value">{booking.name}</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <FaCalendarAlt className="detail-icon" />
                        <div>
                          <span className="detail-label">Date</span>
                          <span className="detail-value">
                            {new Date(booking.date).toLocaleDateString('en-IE', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <div>
                          <span className="detail-label">Time</span>
                          <span className="detail-value">{booking.time}</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <FaUsers className="detail-icon" />
                        <div>
                          <span className="detail-label">Party Size</span>
                          <span className="detail-value">{booking.party_size} guests</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <FaPhone className="detail-icon" />
                        <div>
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{booking.phone}</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <FaEnvelope className="detail-icon" />
                        <div>
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{booking.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="booking-timestamp">
                      Created: {new Date(booking.created_at).toLocaleString('en-IE')}
                    </div>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="booking-actions">
                      <button
                        className="action-btn confirm-btn"
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                      >
                        <FaCheckCircle /> Confirm
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
