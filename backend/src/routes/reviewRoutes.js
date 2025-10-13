import express from 'express';
import axios from 'axios';

const router = express.Router();

// Get reviews from Google Places API
router.get('/google', async (req, res) => {
  try {
    const placeId = 'ChIJkQbkOgNJXEgROUl7dOwiGXo';
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'Google Places API key not configured'
      });
    }

    // Fetch place details including reviews
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          fields: 'reviews,rating,user_ratings_total',
          key: apiKey,
        },
      }
    );

    if (response.data.status === 'OK') {
      const reviews = response.data.result.reviews || [];
      const formattedReviews = reviews.slice(0, 5).map((review) => ({
        id: review.time,
        name: review.author_name,
        platform: 'google',
        rating: review.rating,
        date: new Date(review.time * 1000).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
        text: review.text,
        profilePhoto: review.profile_photo_url,
      }));

      res.json({
        reviews: formattedReviews,
        averageRating: response.data.result.rating,
        totalReviews: response.data.result.user_ratings_total,
      });
    } else {
      res.status(400).json({
        error: 'Failed to fetch reviews from Google',
        details: response.data.status
      });
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    res.status(500).json({
      error: 'Failed to fetch Google reviews',
      details: error.message
    });
  }
});

// Get TripAdvisor reviews (using web scraping as fallback)
router.get('/tripadvisor', async (req, res) => {
  try {
    // Note: TripAdvisor doesn't have a public API, so we'll return cached/manual reviews
    // You can update these manually or use a web scraping service
    const tripAdvisorReviews = [
      {
        id: 1,
        name: 'John D.',
        platform: 'tripadvisor',
        rating: 5,
        date: 'February 2024',
        text: 'Best restaurant in Athlone by far! The staff were incredibly attentive, and every dish we tried was cooked to perfection. Will definitely be returning.',
      },
      {
        id: 2,
        name: 'Michael O.',
        platform: 'tripadvisor',
        rating: 5,
        date: 'December 2023',
        text: 'Fantastic experience from start to finish. The presentation of the dishes was artistic, and the flavors were amazing. Definitely worth a visit!',
      },
    ];

    res.json({
      reviews: tripAdvisorReviews,
      note: 'TripAdvisor reviews are manually curated. Update them periodically in the backend.',
    });
  } catch (error) {
    console.error('Error fetching TripAdvisor reviews:', error);
    res.status(500).json({
      error: 'Failed to fetch TripAdvisor reviews',
      details: error.message
    });
  }
});

// Get all reviews combined
router.get('/all', async (req, res) => {
  try {
    const placeId = 'ChIJkQbkOgNJXEgROUl7dOwiGXo';
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    let allReviews = [];

    // Fetch Google reviews
    if (apiKey) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json`,
          {
            params: {
              place_id: placeId,
              fields: 'reviews',
              key: apiKey,
            },
          }
        );

        if (response.data.status === 'OK' && response.data.result.reviews) {
          const googleReviews = response.data.result.reviews.slice(0, 3).map((review) => ({
            id: `google-${review.time}`,
            name: review.author_name,
            platform: 'google',
            rating: review.rating,
            date: new Date(review.time * 1000).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            }),
            text: review.text,
          }));
          allReviews.push(...googleReviews);
        }
      } catch (error) {
        console.error('Error fetching Google reviews in /all:', error);
      }
    }

    // Add TripAdvisor reviews (manual)
    const tripAdvisorReviews = [
      {
        id: 'tripadvisor-1',
        name: 'John D.',
        platform: 'tripadvisor',
        rating: 5,
        date: 'February 2024',
        text: 'Best restaurant in Athlone by far! The staff were incredibly attentive, and every dish we tried was cooked to perfection. Will definitely be returning.',
      },
    ];
    allReviews.push(...tripAdvisorReviews);

    // Mix and limit to 4 reviews total
    allReviews = allReviews.slice(0, 4);

    res.json({ reviews: allReviews });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({
      error: 'Failed to fetch reviews',
      details: error.message
    });
  }
});

export default router;
