import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaGoogle, FaTripadvisor, FaQuoteLeft } from 'react-icons/fa';
import reviewBunyamin1 from '../assets/images/reviews/review-bunyamin-1.jpg';
import reviewBunyamin2 from '../assets/images/reviews/review-bunyamin-2.jpg';
import reviewOnur1 from '../assets/images/reviews/review-onur-1.jpg';
import reviewOnur2 from '../assets/images/reviews/review-onur-2.jpg';
import reviewOnur3 from '../assets/images/reviews/review-onur-3.jpg';
import reviewOnur4 from '../assets/images/reviews/review-onur-4.jpg';
import reviewOnur5 from '../assets/images/reviews/review-onur-5.jpg';
import reviewOnur6 from '../assets/images/reviews/review-onur-6.jpg';
import './Reviews.css';

const Reviews = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reviews = [
    {
      id: 1,
      name: 'Bunyamin Y',
      platform: 'tripadvisor',
      rating: 5,
      date: 'October 2025',
      text: 'Lovely place. Lovely staff. Lovely owner. Lovely food. Everything was perfect. 👌 Thanks to Owner Umit for everything. ❤️',
      images: [reviewBunyamin1, reviewBunyamin2],
    },
    {
      id: 2,
      name: 'Onur G',
      platform: 'tripadvisor',
      rating: 5,
      date: 'October 2025',
      text: 'Absolutely amazing! From the moment we walked in, we felt welcomed by the warm, attentive staff. The food was delicious, each dish beautifully presented, and the wine selection was perfect. But what truly stole our hearts was the stunning Shannon River view - dining here feels like a little escape. Whether lunch or dinner, Bacchus is a must-visit in Athlone. We\'ll definitely be coming back!',
      images: [reviewOnur1, reviewOnur2, reviewOnur3, reviewOnur4, reviewOnur5, reviewOnur6],
    },
    {
      id: 3,
      name: 'Lana Haleta',
      platform: 'google',
      rating: 5,
      date: 'November 2025',
      text: 'Food, service, atmosphere - everything was top class. Beautiful views of Shannon, warm and cosy inside, very friendly staff. I had seafood medley and my partner had a steak. Both soooo yummy and generous portions too. They have a few tables on the terrace too, with a 5* view. Highly recommend and will be back 👍',
    },
    {
      id: 4,
      name: 'Lana K',
      platform: 'tripadvisor',
      rating: 5,
      date: 'June 2024',
      text: 'My family and I went for lunch here for Father\'s Day last weekend and I couldn\'t recommend this restaurant more. It was great value for money, the food was amazing and the staff were so lovely and helpful. Well done!! ⭐',
    },
    {
      id: 5,
      name: 'Claire N',
      platform: 'tripadvisor',
      rating: 5,
      date: 'May 2024',
      text: 'Visited Bacchus with my husband & my friends on Saturday & was thoroughly impressed. The staff were friendly & helpful & made the experience very enjoyable. Personally I had the Chef Recommendation dish of Confit of Lamb. The flavour was amazing & portions were extremely generous. Bacchus wine list looked quite good & beers available were good too. We couldn\'t squeeze dessert in but saw a few go past & wished we could! All in all, a great dining experience & will definitely be back',
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'star filled' : 'star'}
      />
    ));
  };

  return (
    <section id="reviews" className="reviews" ref={ref}>
      <div className="reviews-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="reviews-header"
        >
          <h2 className="section-title">What Our Guests Say</h2>
          <div className="title-divider"></div>
          <p className="section-subtitle">
            Don't just take our word for it - hear from our valued customers
          </p>
        </motion.div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="review-card"
            >
              <div className="review-header">
                <div className="review-platform">
                  {review.platform === 'google' ? (
                    <FaGoogle className="platform-icon google" />
                  ) : (
                    <FaTripadvisor className="platform-icon tripadvisor" />
                  )}
                </div>
                <FaQuoteLeft className="quote-icon" />
              </div>

              <div className="review-rating">{renderStars(review.rating)}</div>

              <p className="review-text">{review.text}</p>

              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Review by ${review.name} - Image ${imgIndex + 1}`}
                      className="review-image"
                    />
                  ))}
                </div>
              )}

              <div className="review-footer">
                <div className="reviewer-info">
                  <p className="reviewer-name">{review.name}</p>
                  <p className="review-date">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="reviews-cta"
        >
          <h3>Share Your Experience</h3>
          <p>We'd love to hear about your visit to Bacchus Restaurant</p>
          <div className="cta-buttons">
            <a
              href="https://www.google.com/maps/place/Bacchus+Restaurant/@53.4237683,-7.943484,17z/data=!4m8!3m7!1s0x485c4903dae40691:0x7a1923ec747b4939!8m2!3d53.4237683!4d-7.9409037!9m1!1b1!16s%2Fg%2F1q62bckmd?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="review-btn google-btn"
            >
              <FaGoogle /> Review us on Google
            </a>
            <a
              href="https://www.tripadvisor.co.uk/Restaurant_Review-g212091-d10291852-Reviews-Bacchus_Restaurant-Athlone_County_Westmeath.html"
              target="_blank"
              rel="noopener noreferrer"
              className="review-btn tripadvisor-btn"
            >
              <FaTripadvisor /> Review us on TripAdvisor
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
