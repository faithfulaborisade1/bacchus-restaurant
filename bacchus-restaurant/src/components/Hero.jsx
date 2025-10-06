import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
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
          Where the Shannon Flows,
          <br />
          Memories Grow
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          Mediterranean-inspired cuisine along the scenic River Shannon
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
          <a
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn secondary"
          >
            View Menu
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-info"
        >
          <div className="info-item">
            <FaMapMarkerAlt />
            <span>The Only Restaurant Along the River Shannon</span>
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
