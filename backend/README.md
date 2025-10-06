# Bacchus Restaurant Backend API

Backend API for managing restaurant bookings, notifications, and admin operations.

## Features

- ✅ Booking management (create, read, update)
- ✅ Email notifications (customer & admin)
- ✅ SMS notifications (Twilio integration ready)
- ✅ PostgreSQL database
- ✅ RESTful API endpoints

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Setup

Install PostgreSQL if you haven't already, then create the database:

```bash
# Login to PostgreSQL
psql -U postgres

# Run the schema file
\i database/schema.sql

# Or manually create the database and table using the schema
```

### 3. Environment Configuration

Copy the `.env.example` file to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bacchus_restaurant
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Admin
ADMIN_EMAIL=info@bacchusrestaurant.ie
```

#### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in `EMAIL_PASSWORD`

### 4. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on http://localhost:3001

## API Endpoints

### Bookings

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0871234567",
  "date": "2025-10-15",
  "time": "19:00",
  "partySize": "2",
  "specialRequests": "Window seat please"
}
```

#### Get All Bookings (Admin)
```http
GET /api/bookings
GET /api/bookings?status=pending
GET /api/bookings?date=2025-10-15
```

#### Update Booking Status
```http
PATCH /api/bookings/:id/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

Status options: `pending`, `confirmed`, `rejected`, `completed`, `no-show`

### Health Check
```http
GET /health
```

## Email Templates

The system sends different emails for:
- **Admin**: New booking notification
- **Customer (Pending)**: Booking request received
- **Customer (Confirmed)**: Booking confirmed
- **Customer (Rejected)**: Booking unavailable

## SMS Integration (Optional)

To enable SMS notifications:

1. Sign up for Twilio: https://www.twilio.com/
2. Add Twilio credentials to `.env`:
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   ```
3. Uncomment SMS code in `src/services/notificationService.js`

## Database Schema

### bookings Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(255) | Customer name |
| email | VARCHAR(255) | Customer email |
| phone | VARCHAR(50) | Customer phone |
| date | DATE | Booking date |
| time | TIME | Booking time |
| party_size | INTEGER | Number of guests |
| special_requests | TEXT | Special requests/allergies |
| status | VARCHAR(50) | pending/confirmed/rejected/completed/no-show |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Testing the API

Using curl:
```bash
# Test health endpoint
curl http://localhost:3001/health

# Create a booking
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

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check database credentials in `.env`
- Verify the database exists: `psql -l`

### Email Not Sending
- Check Gmail App Password is correct
- Verify 2FA is enabled on Gmail
- Check email credentials in `.env`

### Port Already in Use
- Change `PORT` in `.env` to another port (e.g., 3002)

## Next Steps

- [ ] Add authentication for admin endpoints
- [ ] Create admin dashboard
- [ ] Add rate limiting
- [ ] Implement booking capacity management
- [ ] Add automated reminders for upcoming bookings
