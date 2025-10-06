# Neon PostgreSQL Setup Guide for Bacchus Restaurant

## What is Neon?

Neon is a serverless PostgreSQL database with:
- ✅ **Free Tier**: 500 MB storage, 10 GB data transfer/month
- ✅ **Auto-scaling**: Scales to zero when not in use
- ✅ **Branching**: Create database branches like Git
- ✅ **Fast**: Global edge network
- ✅ **No credit card required** for free tier

Perfect for production websites!

---

## Step-by-Step Setup

### 1. Create a Neon Account

1. Go to: **https://console.neon.tech**
2. Sign up with GitHub, Google, or email
3. Verify your email

### 2. Create a New Project

1. Click **"New Project"**
2. Fill in:
   - **Project Name**: `bacchus-restaurant`
   - **Database Name**: `bacchus_restaurant`
   - **Region**: Choose closest to your users (e.g., **EU West** for Ireland)
   - **PostgreSQL Version**: Latest (16 recommended)
3. Click **"Create Project"**

### 3. Get Your Connection String

After project creation, you'll see a **"Connection Details"** section:

```
Connection String:
postgresql://username:password@ep-xxx-pooler.region.aws.neon.tech/bacchus_restaurant?sslmode=require
```

**Copy this entire string** - you'll need it!

### 4. Configure Backend Environment

1. Navigate to your backend folder:
   ```bash
   cd backend
   ```

2. Create `.env` file (if it doesn't exist):
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and paste your connection string:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://your-username:your-password@ep-xxx-pooler.region.aws.neon.tech/bacchus_restaurant?sslmode=require
   ```

### 5. Run the Database Schema

You have two options:

#### Option A: Using Neon SQL Editor (Easiest)

1. Go to **https://console.neon.tech**
2. Select your project
3. Click **"SQL Editor"** in the left menu
4. Copy the contents of `database/schema.sql`
5. Paste into the SQL Editor
6. Click **"Run"**

#### Option B: Using Command Line

1. Install `psql` if you don't have it
2. Run:
   ```bash
   psql "postgresql://your-connection-string" -f database/schema.sql
   ```

### 6. Verify the Setup

Run this query in Neon SQL Editor to check if the table was created:

```sql
SELECT * FROM bookings;
```

You should see the table structure with sample data.

### 7. Start Your Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ Connected to Neon PostgreSQL database
🚀 Bacchus Restaurant API running on port 3001
```

---

## Connection String Breakdown

```
postgresql://username:password@host:port/database?sslmode=require
           ↓         ↓         ↓     ↓      ↓           ↓
         User   Password   Host  Port  DB Name    SSL Required
```

**Important Notes:**
- Neon **requires** SSL (that's the `?sslmode=require` part)
- The connection string includes your password - **NEVER** commit `.env` to Git!
- Neon provides a pooled connection (`-pooler`) for better performance

---

## Testing the Database

### Test 1: Health Check
```bash
curl http://localhost:3001/health
```

Expected: `{"status":"OK","message":"Bacchus Restaurant API is running"}`

### Test 2: Create a Test Booking
```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0871234567",
    "date": "2025-10-20",
    "time": "19:30",
    "partySize": "2"
  }'
```

### Test 3: View Bookings in Neon

1. Go to Neon SQL Editor
2. Run: `SELECT * FROM bookings;`
3. You should see your test booking!

---

## Neon Dashboard Features

### View Database Metrics:
- **Queries**: See how many queries are running
- **Storage**: Monitor database size
- **Connections**: Active connections
- **Activity**: Recent queries

### Database Branches (Advanced):
Create a copy of your database for testing:
1. Click **"Branches"**
2. Click **"Create Branch"**
3. Test changes without affecting production

### Backups:
Neon automatically backs up your data. You can restore to any point in time!

---

## Environment Variables

Your final `.env` should look like:

```env
# Server
PORT=3001

# Database (Neon)
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx-pooler.eu-west-1.aws.neon.tech/bacchus_restaurant?sslmode=require

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Bacchus Restaurant <noreply@bacchusrestaurant.ie>

# Admin
ADMIN_EMAIL=info@bacchusrestaurant.ie

# Frontend
FRONTEND_URL=http://localhost:5173
```

---

## Common Issues & Solutions

### Issue: "Connection refused"
**Solution**: Check if DATABASE_URL is correct and includes `?sslmode=require`

### Issue: "Password authentication failed"
**Solution**:
1. Go to Neon Dashboard
2. Click **"Connection Details"**
3. Click **"Reset Password"**
4. Update `.env` with new connection string

### Issue: "SSL connection required"
**Solution**: Make sure your connection string ends with `?sslmode=require`

### Issue: "Role does not exist"
**Solution**: Use the **pooled connection string** (the one with `-pooler` in the hostname)

### Issue: "Too many connections"
**Solution**:
- Free tier has 10 connection limit
- Make sure to close connections properly
- Use the pooled connection (`-pooler` endpoint)

---

## Production Deployment

When deploying to production:

1. **Create a new Neon project** for production (don't use the same one)
2. **Update the DATABASE_URL** in your production environment variables
3. **Run the schema** on the production database
4. **Test thoroughly** before going live

---

## Monitoring & Maintenance

### Check Database Size:
```sql
SELECT pg_size_pretty(pg_database_size('bacchus_restaurant'));
```

### View All Tables:
```sql
\dt
```

### Delete Test Data:
```sql
DELETE FROM bookings WHERE email = 'test@example.com';
```

### View Recent Bookings:
```sql
SELECT * FROM bookings
ORDER BY created_at DESC
LIMIT 10;
```

---

## Neon Free Tier Limits

- **Storage**: 500 MB (plenty for a restaurant booking system)
- **Data Transfer**: 10 GB/month
- **Compute**: Auto-scales to zero
- **Connections**: 10 concurrent (using pooler)
- **Branches**: 10 database branches

For Bacchus Restaurant, the free tier should be sufficient for:
- ~10,000+ bookings
- All menu data
- Years of operation

If you grow beyond this, Neon's paid plan starts at $19/month.

---

## Quick Reference Commands

```bash
# Start backend
cd backend
npm run dev

# Test API
curl http://localhost:3001/health

# View logs
# Watch the terminal output

# Stop backend
# Press Ctrl+C
```

---

## Next Steps

✅ Database configured with Neon
⬜ Set up email (Gmail)
⬜ Test booking flow
⬜ Deploy to production

---

## Support

- **Neon Docs**: https://neon.tech/docs
- **Neon Discord**: https://discord.gg/neon
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

---

Happy hosting! 🚀
