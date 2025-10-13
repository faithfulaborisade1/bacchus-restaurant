import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
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
      </Routes>
    </Router>
  );
}

export default App;
