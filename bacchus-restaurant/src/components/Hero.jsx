import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUtensils, FaShoppingBag } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ onBookNowClick }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Bacchus
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          By the Shannon River, Where Every Visit Becomes a Memory
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-description"
        >
          Exquisite Mediterranean-inspired cuisine in an elegant riverside setting
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-buttons"
        >
          <button onClick={onBookNowClick} className="hero-btn primary">
            <FaCalendarAlt /> Book a Table
          </button>
          <Link to="/menu" className="hero-btn secondary">
            <FaUtensils /> Restaurant Menu
          </Link>
          <Link to="/takeaway-menu" className="hero-btn secondary">
            <FaShoppingBag /> Take-Away Menu
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-info"
        >
          <div className="info-item">
            <FaMapMarkerAlt />
            <a
              href="https://www.google.com/maps/dir//Bacchus+Restaurant,+Custume+Pier+Appartments,+Custume+Pl,+Athlone,+Co.+Westmeath/@53.4237683,-7.9409037,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x485c4903dae40691:0x7a1923ec747b4939!2m2!1d-7.9409037!2d53.4237683"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-location-link"
            >
              The Only Restaurant Along the River Shannon
            </a>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
