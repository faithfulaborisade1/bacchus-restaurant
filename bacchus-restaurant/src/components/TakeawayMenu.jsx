import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFilter, FaTimes, FaShoppingBag, FaClock, FaPhone } from 'react-icons/fa';
import {
  takeawayStarters,
  takeawayMainCourses,
  takeawayPastas,
  takeawayPizzas,
  takeawayDesserts,
  takeawaySides,
  takeawayKidsMenu,
  takeawayDrinks,
  takeawayInfo,
} from '../data/takeawayMenuData';
import { allergensList } from '../data/menuData';
import './TakeawayMenu.css';

const TakeawayMenu = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('starters');
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [showAllergenFilter, setShowAllergenFilter] = useState(false);

  const categories = [
    { id: 'starters', name: 'Starters', items: takeawayStarters },
    { id: 'mains', name: 'Main Courses', items: takeawayMainCourses },
    { id: 'pastas', name: 'Pastas & Risottos', items: takeawayPastas },
    { id: 'pizzas', name: 'Pizzas & Pides', items: takeawayPizzas },
    { id: 'desserts', name: 'Desserts', items: takeawayDesserts },
    { id: 'sides', name: 'Sides', items: takeawaySides },
    { id: 'kids', name: 'Kids Menu', items: takeawayKidsMenu },
    { id: 'drinks', name: 'Drinks', items: takeawayDrinks },
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
    <section id="takeaway-menu" className="takeaway-menu" ref={ref}>
      <div className="takeaway-menu-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="takeaway-menu-header"
        >
          <div className="header-icon">
            <FaShoppingBag />
          </div>
          <h2 className="section-title">{takeawayInfo.title}</h2>
          <p className="collection-badge">{takeawayInfo.subtitle}</p>
          <div className="title-divider"></div>
          <p className="takeaway-tagline">{takeawayInfo.tagline}</p>
        </motion.div>

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="special-offer-banner"
        >
          <div className="offer-content">
            <span className="offer-icon">🎉</span>
            <span className="offer-text">{takeawayInfo.specialOffer.text}</span>
          </div>
        </motion.div>

        {/* Hours and Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="takeaway-info-cards"
        >
          <div className="info-card">
            <FaClock className="info-icon" />
            <h3>Takeaway Hours</h3>
            <p>{takeawayInfo.hours.monFri.display}</p>
            <p>{takeawayInfo.hours.saturday.display}</p>
            <p>{takeawayInfo.hours.sunday.display}</p>
          </div>
          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>Order Now</h3>
            <p className="phone-number">{takeawayInfo.contact.phone}</p>
            <p className="website">{takeawayInfo.contact.website}</p>
          </div>
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
                <div className="item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="item-icon">{item.icon || '🍽️'}</div>
                  )}
                </div>
                <div className="item-content">
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
                </div>
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
          className="takeaway-notes"
        >
          <p>
            <strong>Please note:</strong> {takeawayInfo.allergyNote}
          </p>
          <p className="collection-note">
            <FaShoppingBag /> Collection only - All orders must be collected from the restaurant
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TakeawayMenu;
