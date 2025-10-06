# Production Readiness Checklist

## ✅ Already Complete

- [x] Frontend React application
- [x] Responsive design (mobile, tablet, desktop)
- [x] Menu with allergen filtering
- [x] Booking form with validation
- [x] Email notification system
- [x] Backend API structure
- [x] Database schema
- [x] Gallery section
- [x] Contact information
- [x] Professional UI/UX

---

## 🔧 **CRITICAL - Must Do Before Launch**

### 1. Content & Assets ⚠️

- [ ] **Replace placeholder images** in Gallery
  - Currently using Unsplash stock photos
  - Need professional photos of:
    - Restaurant interior (3-4 photos)
    - Food dishes (4-5 photos)
    - River Shannon views (2-3 photos)
    - Staff/chef photos (optional)

- [ ] **Add favicon**
  - Create/add `favicon.ico` to public folder
  - Update `index.html` with proper meta tags

- [ ] **Optimize images**
  - Compress all images (use TinyPNG or similar)
  - Convert to WebP format for better performance
  - Recommended max size: 200KB per image

### 2. SEO & Meta Tags ⚠️

- [ ] **Update meta tags** in `index.html`:
  ```html
  <title>Bacchus Restaurant | Mediterranean Dining by the Shannon</title>
  <meta name="description" content="Bacchus Restaurant - Mediterranean-inspired cuisine along the scenic River Shannon in Athlone. Book your table today!">
  <meta name="keywords" content="restaurant, Athlone, Mediterranean food, River Shannon, fine dining, Irish restaurant">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.bacchusrestaurant.ie/">
  <meta property="og:title" content="Bacchus Restaurant | Mediterranean Dining by the Shannon">
  <meta property="og:description" content="Experience Mediterranean cuisine along the scenic River Shannon">
  <meta property="og:image" content="https://www.bacchusrestaurant.ie/og-image.jpg">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://www.bacchusrestaurant.ie/">
  <meta property="twitter:title" content="Bacchus Restaurant | Mediterranean Dining">
  <meta property="twitter:description" content="Experience Mediterranean cuisine along the scenic River Shannon">
  <meta property="twitter:image" content="https://www.bacchusrestaurant.ie/twitter-image.jpg">
  ```

- [ ] **Create sitemap.xml**
- [ ] **Create robots.txt**
- [ ] **Add Google Analytics** (optional but recommended)
- [ ] **Set up Google Search Console**

### 3. Backend Setup ⚠️

- [ ] **Set up production database**
  - Create PostgreSQL database (on hosting provider)
  - Run schema.sql to create tables
  - Secure database with strong password

- [ ] **Configure email service**
  - Set up Gmail App Password OR
  - Use professional email service (SendGrid, AWS SES, etc.)
  - Test email sending works

- [ ] **Environment variables**
  - Create production `.env` file
  - NEVER commit `.env` to git
  - Use different credentials for production

- [ ] **Test all API endpoints**
  - Test booking creation
  - Test email notifications
  - Test error handling

### 4. Security 🔒

- [ ] **HTTPS/SSL Certificate**
  - Get SSL certificate (Let's Encrypt is free)
  - Ensure all traffic is HTTPS

- [ ] **Environment variables**
  - All sensitive data in `.env`
  - Never hardcode passwords/keys

- [ ] **CORS configuration**
  - Update backend CORS to only allow your domain
  - Currently allows localhost - change for production

- [ ] **Rate limiting** (recommended)
  - Add rate limiting to API endpoints
  - Prevent spam/abuse of booking form

- [ ] **Input sanitization**
  - Already done in validation
  - Test for SQL injection (use parameterized queries ✅)
  - Test for XSS attacks

### 5. Performance Optimization 🚀

- [ ] **Build for production**
  ```bash
  cd bacchus-restaurant
  npm run build
  ```

- [ ] **Test production build**
  ```bash
  npm run preview
  ```

- [ ] **Enable gzip compression** (usually done by hosting)

- [ ] **Lazy load images** (partially done ✅)

- [ ] **Check Lighthouse score** (aim for 90+)
  - Open Chrome DevTools
  - Go to Lighthouse tab
  - Run audit

### 6. Testing 🧪

- [ ] **Test on multiple devices**
  - iPhone (Safari)
  - Android (Chrome)
  - iPad/tablets
  - Desktop (Chrome, Firefox, Safari, Edge)

- [ ] **Test all features**
  - [ ] Navigation scrolling
  - [ ] Menu filtering
  - [ ] Booking form submission
  - [ ] Form validation (try invalid inputs)
  - [ ] Gallery lightbox
  - [ ] Mobile menu
  - [ ] All links work

- [ ] **Test booking flow end-to-end**
  - Submit real test booking
  - Verify email received (admin & customer)
  - Check database entry created

- [ ] **Cross-browser testing**
  - Chrome ✓
  - Firefox ✓
  - Safari ✓
  - Edge ✓

### 7. Legal & Compliance 📋

- [ ] **Privacy Policy** (if collecting emails/data)
- [ ] **Cookie Notice** (if using analytics)
- [ ] **GDPR Compliance** (if serving EU customers)
  - Add cookie consent banner
  - Privacy policy link in footer

### 8. Hosting & Deployment 🌐

#### Frontend Hosting Options:
- **Vercel** (Recommended - easiest)
  - Free tier available
  - Automatic deployments from Git
  - Free SSL
  - [Guide: https://vercel.com/docs]

- **Netlify** (Also great)
  - Similar to Vercel
  - Free tier
  - [Guide: https://netlify.com/docs]

- **GitHub Pages** (Free but limited)

#### Backend Hosting Options:
- **Railway** (Recommended)
  - Easy PostgreSQL setup
  - Free tier: $5 credit/month
  - [Guide: https://railway.app/]

- **Render** (Good alternative)
  - Free tier available
  - PostgreSQL included
  - [Guide: https://render.com/]

- **Heroku** (Popular but paid)
  - No free tier anymore
  - $7/month minimum

- **DigitalOcean** (Advanced)
  - More control
  - $4/month droplet
  - Requires server management knowledge

#### Domain Setup:
- [ ] **Purchase domain**
  - GoDaddy, Namecheap, Google Domains, etc.
  - Recommended: bacchusrestaurant.ie

- [ ] **Configure DNS**
  - Point domain to hosting provider
  - Set up www redirect

- [ ] **Configure SSL**
  - Usually automatic with modern hosts
  - Let's Encrypt (free)

---

## 🎯 Nice to Have (Not Critical)

### Additional Features:
- [ ] **Google Maps integration** (replace iframe with API)
- [ ] **Instagram feed** (using Instagram API)
- [ ] **TripAdvisor widget**
- [ ] **Online ordering** (future phase)
- [ ] **Loyalty program** (future phase)
- [ ] **Table map in admin** (future phase)

### Performance:
- [ ] **PWA (Progressive Web App)**
  - Add to home screen capability
  - Offline support

- [ ] **Image CDN** (CloudFlare, Cloudinary)
  - Faster image loading
  - Automatic optimization

### Monitoring:
- [ ] **Error tracking** (Sentry)
  - Track JavaScript errors
  - Monitor API errors

- [ ] **Uptime monitoring** (UptimeRobot)
  - Get alerts if site goes down
  - Free for basic monitoring

- [ ] **Analytics**
  - Google Analytics
  - Track visitor behavior
  - Monitor conversion rates

---

## 📝 Pre-Launch Checklist (Final Steps)

### 1 Week Before Launch:
- [ ] Complete all "CRITICAL" items above
- [ ] Run full testing suite
- [ ] Test on real devices
- [ ] Get feedback from 2-3 people
- [ ] Fix any bugs found

### 3 Days Before:
- [ ] Deploy to production hosting
- [ ] Test production site thoroughly
- [ ] Set up domain and SSL
- [ ] Test email notifications work

### 1 Day Before:
- [ ] Final content review
- [ ] Check all links
- [ ] Test booking system
- [ ] Prepare social media announcement

### Launch Day:
- [ ] Go live!
- [ ] Post on social media
- [ ] Monitor for any issues
- [ ] Test booking flow with real submission
- [ ] Celebrate! 🎉

---

## 🚨 Common Issues & Solutions

### Issue: Images not loading
- **Solution**: Check image paths, ensure images are in public folder or properly imported

### Issue: Booking emails not sending
- **Solution**:
  - Check Gmail App Password is correct
  - Verify EMAIL_USER and EMAIL_PASSWORD in .env
  - Check email isn't in spam folder

### Issue: Database connection failed
- **Solution**:
  - Verify PostgreSQL is running
  - Check connection string in .env
  - Ensure database exists

### Issue: CORS errors in production
- **Solution**: Update backend CORS settings to include production domain

### Issue: Build fails
- **Solution**:
  - Delete node_modules and package-lock.json
  - Run npm install
  - Check for any TypeScript/ESLint errors

---

## 📞 Support Resources

- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Node.js Docs**: https://nodejs.org/docs/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Vercel Deployment**: https://vercel.com/docs
- **Netlify Deployment**: https://docs.netlify.com/

---

## 🎓 Deployment Quick Guide

### Deploy Frontend (Vercel):
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com
# 3. Import your GitHub repository
# 4. Click Deploy
# Done! Your site is live
```

### Deploy Backend (Railway):
```bash
# 1. Go to railway.app
# 2. Create new project
# 3. Add PostgreSQL database
# 4. Deploy from GitHub
# 5. Add environment variables
# 6. Deploy!
```

---

## ✅ Minimum Viable Launch

If you want to launch ASAP with minimum setup:

1. **Replace placeholder images in gallery** ⚠️
2. **Set up email in backend** (Gmail App Password) ⚠️
3. **Set up production database** ⚠️
4. **Deploy frontend to Vercel** (5 minutes)
5. **Deploy backend to Railway** (10 minutes)
6. **Test booking flow** ⚠️
7. **Go live!** 🎉

Everything else can be added post-launch.

---

Good luck with your launch! 🚀
