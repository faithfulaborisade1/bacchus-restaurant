import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaWheelchair, FaWater, FaUtensils, FaGlassCheers } from 'react-icons/fa';
import './Highlights.css';

const Highlights = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: <FaWater />,
      title: 'Riverside Elegance',
      description: 'Nestled along the stunning Shannon River, enjoy breathtaking waterfront views while you dine. Our prime riverside location offers a serene and picturesque setting that enhances every meal.',
    },
    {
      icon: <FaWheelchair />,
      title: 'Fully Accessible',
      description: 'We welcome all guests with full wheelchair accessibility throughout our restaurant. Comfort and inclusivity are at the heart of everything we do.',
    },
    {
      icon: <FaUtensils />,
      title: 'Spacious & Refined',
      description: 'Experience dining in a beautifully spacious environment designed for comfort and sophistication. Whether intimate dinners or large gatherings, we accommodate with style.',
    },
    {
      icon: <FaGlassCheers />,
      title: 'Curated Excellence',
      description: 'Every detail is thoughtfully curated—from our Mediterranean-inspired menu to our carefully selected wine collection. We create moments that linger long after the meal.',
    },
  ];

  return (
    <section className="highlights" ref={ref}>
      <div className="highlights-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="highlights-header"
        >
          <h2 className="section-title">Why Bacchus</h2>
          <div className="title-divider"></div>
          <p className="section-subtitle">
            Discover what makes us Athlone's premier riverside dining destination
          </p>
        </motion.div>

        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="highlight-card"
            >
              <div className="highlight-icon">{highlight.icon}</div>
              <h3 className="highlight-title">{highlight.title}</h3>
              <p className="highlight-description">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
