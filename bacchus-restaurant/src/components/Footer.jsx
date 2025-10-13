import { FaClock, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaWhatsapp, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { restaurantInfo } from '../data/menuData';
import logo from '../assets/images/logo-transparent.png';
import './Footer.css';

const Footer = () => {
  const getDayName = (day) => {
    const days = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    };
    return days[day];
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section logo-section">
            <img src={logo} alt="Bacchus Restaurant" className="footer-logo" />
            <p className="footer-tagline">{restaurantInfo.tagline}</p>
            <div className="footer-social">
              <a href={`https://instagram.com/${restaurantInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/bacchusrestaurantathlone" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3><FaClock /> Opening Hours</h3>
            <div className="footer-hours">
              {Object.entries(restaurantInfo.openingHours).map(([day, hours]) => (
                <div key={day} className="footer-hours-item">
                  <span className="footer-day">{getDayName(day)}</span>
                  <span className="footer-time">{hours.open} - {hours.close}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="footer-contact">
              <p><FaMapMarkerAlt /> {restaurantInfo.address}</p>
              <p><FaPhone /> <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}>{restaurantInfo.phone}</a></p>
              <p><FaWhatsapp /> <a href="https://wa.me/353834632121">083 463 2121</a></p>
              <p><FaEnvelope /> <a href={`mailto:${restaurantInfo.email}`}>{restaurantInfo.email}</a></p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Bacchus Restaurant. All rights reserved.
          </p>
          <p className="footer-made-with">
            Made with <FaHeart className="heart-icon" /> in Ireland
          </p>
          <p className="footer-est">Established {restaurantInfo.established}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
