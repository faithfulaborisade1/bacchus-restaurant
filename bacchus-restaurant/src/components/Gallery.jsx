import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  // Gallery images
  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      title: 'Restaurant Interior',
      category: 'interior'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      title: 'Dining Area',
      category: 'interior'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
      title: 'Signature Dish',
      category: 'food'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      title: 'Gourmet Platter',
      category: 'food'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
      title: 'River View',
      category: 'view'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      title: 'Elegant Setting',
      category: 'interior'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      title: 'Fresh Ingredients',
      category: 'food'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
      title: 'Wine Selection',
      category: 'drinks'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80',
      title: 'Desserts',
      category: 'food'
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = hoveredIndex !== null ? 0.3 : 1; // Slow down on hover
    let scrollPosition = 0;

    const animate = () => {
      if (scrollContainer && hoveredIndex === null) {
        scrollPosition += scrollSpeed;

        // Reset scroll position when reaching the end
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredIndex]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'Escape') closeLightbox();
  };

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section id="gallery" className="gallery" ref={ref}>
      <div className="gallery-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="gallery-header"
        >
          <h2 className="section-title">Gallery</h2>
          <div className="title-divider"></div>
          <p className="gallery-subtitle">
            A glimpse into the Bacchus experience - where the Shannon flows and memories grow
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="filmstrip-wrapper"
        >
          <div className="filmstrip-container" ref={scrollRef}>
            <div className="filmstrip-track">
              {duplicatedImages.map((image, index) => (
                <motion.div
                  key={`${image.id}-${index}`}
                  className="filmstrip-item"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => openLightbox(index % images.length)}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="film-frame">
                    <div className="film-perforations film-top"></div>
                    <img src={image.url} alt={image.title} loading="lazy" />
                    <div className="film-perforations film-bottom"></div>
                    <div className="filmstrip-overlay">
                      <h3>{image.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>

            <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
              <FaChevronLeft />
            </button>

            <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
              <FaChevronRight />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.url} alt={selectedImage.title} />
              <div className="lightbox-caption">
                <h3>{selectedImage.title}</h3>
                <p>{currentIndex + 1} / {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
