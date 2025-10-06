# Bacchus Restaurant - Complete Setup Guide

## 🎉 Project Overview

This is a full-stack React website for Bacchus Restaurant with:

✅ **Frontend (React + Vite)**
- Modern, responsive design
- Interactive menu with allergen filtering
- Booking form modal
- Smooth animations

✅ **Backend (Node.js + Express)**
- RESTful API for bookings
- Email notifications (customer & admin)
- SMS ready (Twilio integration)
- PostgreSQL database

---

## 📁 Project Structure

```
resturant b/
├── bacchus-restaurant/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── data/               # Menu data
│   │   └── assets/             # Images, logo
│   └── package.json
│
├── backend/                     # Backend API
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── routes/            # API routes
│   │   ├── services/          # Email/SMS services
│   │   └── config/            # Database config
│   └── package.json
│
└── SETUP_GUIDE.md              # This file
```

---

## 🚀 Quick Start

### Frontend Only (View the Website)

```bash
cd bacchus-restaurant
npm install
npm run dev
```

Visit: **http://localhost:5173**

---

## 🔧 Full Setup (Frontend + Backend)

### Step 1: Frontend Setup

```bash
# Navigate to frontend folder
cd bacchus-restaurant

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at **http://localhost:5173**

---

### Step 2: Backend Setup

#### A. Install PostgreSQL

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the `postgres` user

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### B. Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE bacchus_restaurant;

# Exit
\q
```

Or run the schema file:
```bash
psql -U postgres -f backend/database/schema.sql
```

#### C. Configure Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bacchus_restaurant
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=Bacchus Restaurant <noreply@bacchusrestaurant.ie>

# Admin
ADMIN_EMAIL=info@bacchusrestaurant.ie

# Frontend
FRONTEND_URL=http://localhost:5173
```

#### D. Setup Email (Gmail)

1. Go to your Google Account: https://myaccount.google.com/
2. Enable **2-Step Verification**
3. Generate an **App Password**: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
4. Use this password in `EMAIL_PASSWORD` in your `.env` file

#### E. Start Backend Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The API will run on **http://localhost:3001**

---

## ✅ Testing the Complete System

### 1. Test Frontend
- Open http://localhost:5173
- Click **"Book Now"** button
- Fill in the booking form
- Submit

### 2. Test Backend
Check if backend is running:
```bash
curl http://localhost:3001/health
```

You should see: `{"status":"OK","message":"Bacchus Restaurant API is running"}`

### 3. Test Booking Flow

1. **Frontend**: Submit a booking through the website
2. **Backend**: Check terminal logs for:
   - ✅ Database insert
   - ✅ Email sent to admin
   - ✅ Email sent to customer
3. **Email**: Check your inbox for confirmation emails

---

## 📧 What Happens When Someone Books?

### Customer Experience:

1. **Fills form** → Name, email, phone, date, time, party size
2. **Submits booking** → Shows success message
3. **Receives email** → "Booking Request Received - Pending Confirmation"
   - Clear notice that it's NOT confirmed yet
   - Will receive email/SMS when confirmed
4. **Gets confirmation** → When admin approves, receives "Booking Confirmed" email

### Admin Receives:

1. **Email notification** with all booking details
2. Can access admin dashboard (future feature) to approve/reject
3. When approved → Customer gets confirmation email automatically

---

## 🎨 Customization

### Change Colors

Edit `bacchus-restaurant/src/index.css`:
```css
:root {
  --primary-gold: #c9a961;  /* Your brand color */
  --primary-gold-dark: #b8944a;
}
```

### Update Menu

Edit `bacchus-restaurant/src/data/menuData.js`

### Change Restaurant Info

Edit restaurant details in `bacchus-restaurant/src/data/menuData.js`:
```javascript
export const restaurantInfo = {
  name: 'Bacchus Restaurant',
  phone: '09064 50433',
  email: 'info@bacchusrestaurant.ie',
  // ...
};
```

---

## 🔒 Security Notes

**IMPORTANT:** Never commit your `.env` file to GitHub!

Your `.env` contains sensitive information:
- Database passwords
- Email passwords
- API keys

The `.env` file is already in `.gitignore`.

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd bacchus-restaurant
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend database connection error
- Check PostgreSQL is running: `psql -U postgres`
- Verify DB credentials in `.env`
- Make sure database exists: `psql -l`

### Emails not sending
- Check Gmail App Password is correct
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
- Make sure 2FA is enabled on Gmail account

### Booking button does nothing
- Check browser console for errors (F12)
- Make sure backend is running on port 3001
- Check CORS settings in `backend/src/server.js`

---

## 📱 Next Steps

### Phase 1: Basic Operations (Complete! ✅)
- ✅ Booking form
- ✅ Email notifications
- ✅ Database storage

### Phase 2: Admin Dashboard (Recommended Next)
- View all bookings
- Approve/reject bookings
- Calendar view
- Table management

### Phase 3: Enhancements
- SMS notifications (Twilio)
- WhatsApp integration
- Photo gallery section
- Customer reviews/testimonials
- Google Maps integration
- Social media feeds

### Phase 4: Deployment
- Deploy frontend to Vercel/Netlify
- Deploy backend to Heroku/Railway/DigitalOcean
- Setup production database
- Configure custom domain

---

## 💻 Development Commands

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend
```bash
npm run dev        # Start with auto-reload
npm start          # Start production server
```

---

## 📞 Support

If you need help:
1. Check the README files in `backend/` and `bacchus-restaurant/`
2. Review this setup guide
3. Check the terminal/console for error messages

---

## 🎉 You're All Set!

Your Bacchus Restaurant website is now running with:
- ✅ Beautiful, responsive design
- ✅ Menu with allergen filtering
- ✅ Functional booking system
- ✅ Email notifications
- ✅ Professional confirmation flow

**Access your site:** http://localhost:5173
**API Health Check:** http://localhost:3001/health

Enjoy! 🍷
