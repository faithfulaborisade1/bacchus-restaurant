import { useState, useEffect } from 'react';
import './Info.css';
import logoLight from '../assets/images/info/logo.png';
import logoDark from '../assets/images/info/beyazlogo.png';
import menuIcon from '../assets/images/info/icon/menu.png';
import tripIcon from '../assets/images/info/icon/trip.png';
import googleIcon from '../assets/images/info/icon/google.png';
import facebookIcon from '../assets/images/info/icon/facebook.png';
import instagramIcon from '../assets/images/info/icon/instagram.png';
import mailIcon from '../assets/images/info/icon/mail.png';
import sugIcon from '../assets/images/info/icon/sug.png';

const Info = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-info-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Link copied!'))
      .catch(() => alert('Failed to copy link!'));
  };

  const links = [
    {
      icon: menuIcon,
      text: 'Menu',
      url: '/menu.pdf',
      isExternal: true
    },
    {
      icon: tripIcon,
      text: 'Trip Advisor',
      url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g212091-d10291852-Reviews-Bacchus_Restaurant-Athlone_County_Westmeath.html',
      isExternal: true
    },
    {
      icon: googleIcon,
      text: 'Google Business',
      url: 'https://share.google/TEudiKEbIt0yYqM49',
      isExternal: true
    },
    {
      icon: facebookIcon,
      text: 'Facebook',
      url: 'https://www.facebook.com/bacchusrestaurantathlone/',
      isExternal: true
    },
    {
      icon: instagramIcon,
      text: 'Instagram',
      url: 'https://www.instagram.com/bacchus_restaurant_athlone/',
      isExternal: true
    },
    {
      icon: mailIcon,
      text: 'Mail',
      url: 'mailto:info@bacchusrestaurant.ie',
      isExternal: false
    },
    {
      icon: sugIcon,
      text: 'Suggestions',
      url: 'https://forms.gle/dr1p7BqHF8Kmw8nE6',
      isExternal: true
    }
  ];

  return (
    <div className={`info-container ${theme}`}>
      <button
        id="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        title="Toggle Theme"
      >
        {theme === 'dark' ? '🌓' : '🌞'}
      </button>

      <div className="info-content">
        <img
          src={theme === 'dark' ? logoDark : logoLight}
          alt="Bacchus Restaurant"
          className="profile-img"
        />

        <h1>Bacchus Restaurant</h1>
        <p>By the Shannon River, Where Every Visit Becomes a Memory.</p>

        <div className="share-btn" onClick={copyLink}>
          🔗 SHARE THE LINK
        </div>

        {links.map((link, index) => (
          <div
            key={index}
            className="button"
            onClick={() => link.isExternal ? window.open(link.url, '_blank') : window.location.href = link.url}
          >
            <div className="left">
              <img height="25" width="25" src={link.icon} alt={link.text} />
              <span>{link.text}</span>
            </div>
            <span className="arrow">➡️</span>
          </div>
        ))}

        <div className="footer-text">
          © 2025 By Başaran MEDYA BMO | All Rights Reserved
        </div>
      </div>

      <div className="footer-glow"></div>
    </div>
  );
};

export default Info;
