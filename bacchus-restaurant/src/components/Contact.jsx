import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaHeart,
  FaWhatsapp,
  FaDirections,
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
        {/* Split Layout Section */}
        <div className="contact-split">
          {/* Left Side - Restaurant Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="contact-image-section"
          >
            <div className="image-overlay">
              <div className="overlay-content">
                <h3>Experience Fine Dining</h3>
                <p>Where tradition meets excellence</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Reservations & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-info-section"
          >
            <div className="reservations-header">
              <p className="reservations-subtitle">Reservations</p>
              <h2 className="reservations-title">BOOK A TABLE</h2>
              <p className="reservations-description">
                Join us for an unforgettable dining experience. Our team is ready to welcome you
                and make your visit truly special.
              </p>
            </div>

            <div className="main-phone-display">
              <FaPhone className="phone-icon" />
              <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`} className="phone-number">
                {restaurantInfo.phone}
              </a>
            </div>

            <p className="family-tagline">LET OUR FAMILY LOOK AFTER YOURS</p>

            {/* All Contact Details */}
            <div className="contact-details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="detail-text">
                  <h4>Location</h4>
                  <p>{restaurantInfo.address}</p>
                  <a
                    href="https://www.google.com/maps/dir//Bacchus+Restaurant,+Custume+Pier+Appartments,+Custume+Pl,+Athlone,+Co.+Westmeath/@53.4237683,-7.9409037,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x485c4903dae40691:0x7a1923ec747b4939!2m2!1d-7.9409037!2d53.4237683"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-btn"
                  >
                    <FaDirections /> Get Directions
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaWhatsapp />
                </div>
                <div className="detail-text">
                  <h4>WhatsApp</h4>
                  <a href="https://wa.me/353834632121" target="_blank" rel="noopener noreferrer">
                    083 463 2121
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaEnvelope />
                </div>
                <div className="detail-text">
                  <h4>Email</h4>
                  <a href={`mailto:${restaurantInfo.email}`}>
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaInstagram />
                </div>
                <div className="detail-text">
                  <h4>Instagram</h4>
                  <a
                    href={`https://instagram.com/${restaurantInfo.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {restaurantInfo.instagram}
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaFacebook />
                </div>
                <div className="detail-text">
                  <h4>Facebook</h4>
                  <a
                    href="https://www.facebook.com/bacchusrestaurantathlone"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @bacchusrestaurantathlone
                  </a>
                </div>
              </div>
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
