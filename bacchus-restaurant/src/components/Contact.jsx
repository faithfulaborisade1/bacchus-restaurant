import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaHeart,
} from 'react-icons/fa';
import { restaurantInfo } from '../data/menuData';
import logo from '../assets/images/logo-transparent.png';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <footer id="contact" className="contact" ref={ref}>
      <div className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="contact-header"
        >
          <h2 className="section-title">Visit Us</h2>
          <div className="title-divider"></div>
        </motion.div>

        <div className="contact-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-info"
          >
            <div className="logo-section">
              <img src={logo} alt="Bacchus Restaurant" className="footer-logo" />
              <p className="tagline">{restaurantInfo.tagline}</p>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <h3>Location</h3>
                  <p>{restaurantInfo.address}</p>
                  <a
                    href="https://maps.google.com/?q=Custume+Pier+Athlone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-text">
                  <h3>Phone</h3>
                  <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}>
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <h3>Email</h3>
                  <a href={`mailto:${restaurantInfo.email}`}>
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaInstagram />
                </div>
                <div className="info-text">
                  <h3>Follow Us</h3>
                  <a
                    href={`https://instagram.com/${restaurantInfo.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {restaurantInfo.instagram}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="opening-hours"
          >
            <div className="hours-header">
              <FaClock />
              <h3>Opening Hours</h3>
            </div>
            <div className="hours-list">
              {Object.entries(restaurantInfo.openingHours).map(([day, hours]) => (
                <div key={day} className="hours-item">
                  <span className="day-name">{getDayName(day)}</span>
                  <span className="day-hours">
                    {hours.open} - {hours.close}
                    <span className="last-order">(Last orders {hours.lastOrder})</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="booking-cta">
              <h4>Ready to dine with us?</h4>
              <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`} className="booking-btn">
                <FaPhone /> Book Your Table
              </a>
              <p className="booking-note">
                Please arrive within 15 minutes of your reservation time.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="map-section"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2378.8!2d-7.941!3d53.422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDI1JzE5LjkiTiA3wrA1Nic0MC4yIlc!5e0!3m2!1sen!2sie!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bacchus Restaurant Location"
          ></iframe>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="footer-bottom"
        >
          <div className="footer-divider"></div>
          <p className="copyright">
            © {new Date().getFullYear()} Bacchus Restaurant. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> in Ireland
          </p>
          <p className="est">Established {restaurantInfo.established}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Contact;
