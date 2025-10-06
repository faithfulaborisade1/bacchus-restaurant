import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaCalendarAlt, FaInstagram } from 'react-icons/fa';
import logo from '../assets/images/logo-transparent.png';
import './Navbar.css';

const Navbar = ({ onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="Bacchus Restaurant" />
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a onClick={() => scrollToSection('home')} className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => scrollToSection('about')} className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => scrollToSection('menu')} className="nav-link">
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => scrollToSection('gallery')} className="nav-link">
              Gallery
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item nav-cta">
            <button onClick={() => { onBookNowClick(); setIsMobileMenuOpen(false); }} className="nav-link cta-button">
              <FaCalendarAlt /> Book Now
            </button>
          </li>
        </ul>

        <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
