import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import BookingModal from './components/BookingModal';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Main Website */}
        <Route
          path="/"
          element={
            <div className="App">
              <Navbar onBookNowClick={() => setIsBookingModalOpen(true)} />
              <Hero onBookNowClick={() => setIsBookingModalOpen(true)} />
              <About />
              <Menu />
              <Gallery />
              <Contact />
              <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
