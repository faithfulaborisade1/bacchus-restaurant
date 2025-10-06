import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaAward, FaHeart, FaLeaf } from 'react-icons/fa';
import { restaurantInfo } from '../data/menuData';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: <FaAward />, value: '9+', label: 'Years Excellence' },
    { icon: <FaHeart />, value: '50K+', label: 'Happy Guests' },
    { icon: <FaLeaf />, value: '100%', label: 'Fresh Ingredients' },
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="about-header"
        >
          <h2 className="section-title">Our Story</h2>
          <div className="title-divider"></div>
        </motion.div>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-text"
          >
            <div className="quote-box">
              <span className="quote-mark">"</span>
              <h3 className="about-tagline">{restaurantInfo.tagline}</h3>
              <span className="quote-mark">"</span>
            </div>

            <p className="about-description">{restaurantInfo.about.long}</p>

            <div className="chef-signature">
              <p className="signature-text">From our Executive Chef {restaurantInfo.chef.replace('Executive Chef ', '')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="about-image"
          >
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070"
                alt="Restaurant Interior"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <h4>Riverside Dining</h4>
                  <p>Experience breathtaking views</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="about-stats"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="unique-selling-point"
        >
          <div className="usp-card">
            <h3>The Only Restaurant Along the River Shannon</h3>
            <p>
              Immerse yourself in the tranquil beauty of the Shannon while savoring exquisite
              Mediterranean cuisine. Our unique riverside location offers unparalleled views and an
              unforgettable dining atmosphere.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
