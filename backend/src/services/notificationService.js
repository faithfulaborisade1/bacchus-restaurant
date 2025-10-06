import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send booking email
export const sendBookingEmail = async ({ to, subject, booking, type }) => {
  try {
    let htmlContent = '';

    if (type === 'admin') {
      // Email to restaurant admin
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a961;">New Booking Request</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
            <h3>Booking Details:</h3>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Party Size:</strong> ${booking.party_size} people</p>
            ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
            <p><strong>Status:</strong> <span style="color: #ff9800; font-weight: bold;">PENDING</span></p>
          </div>
          <p style="margin-top: 20px;">Please review and confirm this booking through your admin dashboard.</p>
        </div>
      `;
    } else if (type === 'customer_pending') {
      // Email to customer (pending)
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px;">
            <h1 style="color: #c9a961;">Bacchus Restaurant</h1>
            <h2>Booking Request Received</h2>
          </div>

          <div style="background: #fff8e7; padding: 20px; border-left: 4px solid #c9a961; margin: 20px 0;">
            <p style="font-size: 18px; font-weight: bold; color: #c9a961;">⏳ Pending Confirmation</p>
            <p>Thank you for your booking request! This is <strong>NOT a confirmed reservation</strong>.</p>
            <p>Our team will review your request and send you a confirmation via email and SMS shortly.</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>Your Booking Details:</h3>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Party Size:</strong> ${booking.party_size} people</p>
            ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
          </div>

          <p><strong>Important:</strong> Please arrive within 15 minutes of your reservation time.</p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Questions? Contact us:</p>
            <p>📞 09064 50433</p>
            <p>📧 info@bacchusrestaurant.ie</p>
            <p style="color: #999; font-size: 12px;">Custume Pier, Athlone, CO. Westmeath</p>
          </div>
        </div>
      `;
    } else if (type === 'customer_confirmed') {
      // Email to customer (confirmed)
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px;">
            <h1 style="color: #c9a961;">Bacchus Restaurant</h1>
            <h2 style="color: #4caf50;">✓ Booking Confirmed!</h2>
          </div>

          <div style="background: #e8f5e9; padding: 20px; border-left: 4px solid #4caf50; margin: 20px 0;">
            <p style="font-size: 18px; font-weight: bold; color: #4caf50;">Your reservation is confirmed!</p>
            <p>We're looking forward to welcoming you to Bacchus Restaurant.</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>Your Confirmed Booking:</h3>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Party Size:</strong> ${booking.party_size} people</p>
            ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
          </div>

          <p><strong>Important Reminders:</strong></p>
          <ul>
            <li>Please arrive within 15 minutes of your reservation time</li>
            <li>If you need to cancel or modify your booking, please call us as soon as possible</li>
            <li>We cannot split bills</li>
          </ul>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Need to make changes? Contact us:</p>
            <p>📞 09064 50433</p>
            <p>📧 info@bacchusrestaurant.ie</p>
            <p style="color: #999; font-size: 12px;">Custume Pier, Athlone, CO. Westmeath</p>
          </div>
        </div>
      `;
    } else if (type === 'customer_rejected') {
      // Email to customer (rejected)
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px;">
            <h1 style="color: #c9a961;">Bacchus Restaurant</h1>
            <h2>Booking Update</h2>
          </div>

          <div style="background: #ffebee; padding: 20px; border-left: 4px solid #f44336; margin: 20px 0;">
            <p>We're sorry, but we're unable to accommodate your booking request for:</p>
            <p><strong>${new Date(booking.date).toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${booking.time}</strong></p>
            <p>This may be due to full capacity or other scheduling conflicts.</p>
          </div>

          <p>We'd love to find an alternative time for you. Please call us at <strong>09064 50433</strong> to discuss other available dates and times.</p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Contact us:</p>
            <p>📞 09064 50433</p>
            <p>📧 info@bacchusrestaurant.ie</p>
            <p style="color: #999; font-size: 12px;">Custume Pier, Athlone, CO. Westmeath</p>
          </div>
        </div>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Bacchus Restaurant <noreply@bacchusrestaurant.ie>',
      to: to,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // Don't throw error - we don't want booking to fail if email fails
  }
};

// Send booking SMS (using Twilio or similar service)
export const sendBookingSMS = async (phone, booking, status = 'pending') => {
  try {
    // TODO: Implement SMS sending with Twilio
    // This is a placeholder for SMS functionality
    console.log(`📱 SMS would be sent to ${phone} - Status: ${status}`);

    /*
    // Example Twilio implementation:
    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    let message = '';
    if (status === 'pending') {
      message = `Bacchus Restaurant: Your booking request for ${booking.date} at ${booking.time} has been received. We'll confirm shortly.`;
    } else if (status === 'confirmed') {
      message = `Bacchus Restaurant: Your booking for ${booking.date} at ${booking.time} is CONFIRMED! See you soon!`;
    }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    */
  } catch (error) {
    console.error('❌ Error sending SMS:', error);
  }
};
