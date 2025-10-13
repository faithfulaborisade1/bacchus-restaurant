import { useState } from 'react';
import Hero from '../components/Hero';
import TakeawayBanner from '../components/TakeawayBanner';
import Highlights from '../components/Highlights';
import BookingModal from '../components/BookingModal';

const Home = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="home-page">
      <TakeawayBanner />
      <Hero onBookNowClick={() => setIsBookingModalOpen(true)} />
      <Highlights />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default Home;
