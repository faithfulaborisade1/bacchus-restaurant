import { motion } from 'framer-motion';
import { FaShoppingBag, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import './TakeawayBanner.css';

const TakeawayBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      className="takeaway-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="takeaway-content">
        <FaShoppingBag className="takeaway-icon" />
        <div className="takeaway-text">
          <span className="takeaway-label">New Service:</span>
          <span className="takeaway-offer">Takeaway • Collection Only</span>
          <span className="takeaway-discount">Spend €60 — Enjoy €5 Off</span>
        </div>
      </div>
      <button className="banner-close" onClick={() => setIsVisible(false)}>
        <FaTimes />
      </button>
    </motion.div>
  );
};

export default TakeawayBanner;
