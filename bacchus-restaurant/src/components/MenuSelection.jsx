import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUtensils, FaShoppingBag } from 'react-icons/fa';
import './MenuSelection.css';

const MenuSelection = () => {
  return (
    <section className="menu-selection">
      <div className="menu-selection-overlay"></div>
      <div className="menu-selection-content">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="menu-selection-title"
        >
          Legendary Italian Cuisine
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="menu-selection-subtitle"
        >
          In The Heart Of Ireland
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="menu-selection-buttons"
        >
          <Link to="/menu" className="menu-selection-btn restaurant">
            <FaUtensils className="menu-icon" />
            <span>RESTAURANT MENU</span>
          </Link>
          <Link to="/takeaway-menu" className="menu-selection-btn takeaway">
            <FaShoppingBag className="menu-icon" />
            <span>TAKE-AWAY MENU</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSelection;
