import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import TakeawayMenuPage from './pages/TakeawayMenuPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import InfoPage from './pages/InfoPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Main Website Routes */}
        <Route
          path="/"
          element={
            <div className="App">
              <Navbar />
              <Home />
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="App">
              <Navbar />
              <AboutPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/menu"
          element={
            <div className="App">
              <Navbar />
              <MenuPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/takeaway-menu"
          element={
            <div className="App">
              <Navbar />
              <TakeawayMenuPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/gallery"
          element={
            <div className="App">
              <Navbar />
              <GalleryPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/reviews"
          element={
            <div className="App">
              <Navbar />
              <ReviewsPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="App">
              <Navbar />
              <ContactPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/info"
          element={
            <InfoPage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
