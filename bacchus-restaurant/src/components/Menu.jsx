import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFilter, FaTimes } from 'react-icons/fa';
import {
  starters,
  mainCourses,
  pizzas,
  pastas,
  desserts,
  kidsMenu,
  allergensList,
} from '../data/menuData';
import './Menu.css';

const Menu = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('starters');
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [showAllergenFilter, setShowAllergenFilter] = useState(false);

  const categories = [
    { id: 'starters', name: 'Starters', items: starters },
    { id: 'mains', name: 'Main Courses', items: mainCourses },
    { id: 'pizzas', name: 'Pizzas', items: pizzas },
    { id: 'pastas', name: 'Pastas & Risottos', items: pastas },
    { id: 'desserts', name: 'Desserts', items: desserts },
    { id: 'kids', name: 'Kids Menu', items: kidsMenu },
  ];

  const toggleAllergen = (allergenId) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergenId)
        ? prev.filter((id) => id !== allergenId)
        : [...prev, allergenId]
    );
  };

  const filterItems = (items) => {
    if (selectedAllergens.length === 0) return items;
    return items.filter(
      (item) =>
        !selectedAllergens.some((allergen) => item.allergens?.includes(allergen))
    );
  };

  const currentItems = filterItems(
    categories.find((cat) => cat.id === activeCategory)?.items || []
  );

  const getAllergenIcon = (allergenId) => {
    return allergensList.find((a) => a.id === allergenId)?.icon || '';
  };

  return (
    <section id="menu" className="menu" ref={ref}>
      <div className="menu-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="menu-header"
        >
          <h2 className="section-title">Our Menu</h2>
          <div className="title-divider"></div>
          <p className="menu-subtitle">
            From our Executive Chef Simion George
          </p>
        </motion.div>

        {/* Allergen Filter Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="allergen-filter-toggle"
        >
          <button
            className={`filter-btn ${showAllergenFilter ? 'active' : ''}`}
            onClick={() => setShowAllergenFilter(!showAllergenFilter)}
          >
            <FaFilter /> Filter by Dietary Needs
            {selectedAllergens.length > 0 && (
              <span className="filter-count">{selectedAllergens.length}</span>
            )}
          </button>
        </motion.div>

        {/* Allergen Filter Panel */}
        {showAllergenFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="allergen-filter-panel"
          >
            <div className="filter-header">
              <h3>Exclude allergens:</h3>
              {selectedAllergens.length > 0 && (
                <button
                  className="clear-filters"
                  onClick={() => setSelectedAllergens([])}
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="allergen-grid">
              {allergensList.map((allergen) => (
                <button
                  key={allergen.id}
                  className={`allergen-chip ${
                    selectedAllergens.includes(allergen.id) ? 'selected' : ''
                  }`}
                  onClick={() => toggleAllergen(allergen.id)}
                >
                  <span className="allergen-icon">{allergen.icon}</span>
                  <span className="allergen-name">{allergen.name}</span>
                  {selectedAllergens.includes(allergen.id) && (
                    <FaTimes className="remove-icon" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="category-nav"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="menu-items"
        >
          {currentItems.length === 0 ? (
            <div className="no-results">
              <p>No items match your dietary preferences.</p>
              <button
                className="reset-btn"
                onClick={() => setSelectedAllergens([])}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="menu-item"
              >
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <span className="item-price">
                    {typeof item.price === 'number' ? `€${item.price.toFixed(2)}` : item.price}
                  </span>
                </div>
                {item.description && (
                  <p className="item-description">{item.description}</p>
                )}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="item-allergens">
                    {item.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="allergen-badge"
                        title={allergensList.find((a) => a.id === allergen)?.name}
                      >
                        {getAllergenIcon(allergen)}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Allergen Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="allergen-legend"
        >
          <h4>Allergen Key:</h4>
          <div className="legend-grid">
            {allergensList.map((allergen) => (
              <div key={allergen.id} className="legend-item">
                <span className="legend-icon">{allergen.icon}</span>
                <span className="legend-name">{allergen.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="menu-notes"
        >
          <p>
            <strong>Please note:</strong> All our food is prepared fresh on premises. If you
            have any allergies or queries please bring it to our attention and we will do our
            utmost to accommodate you.
          </p>
          <p className="no-split-bills">We are unable to split bills.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
