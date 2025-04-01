// mail.js

const nodemailer = require('nodemailer');

/**
 * Email Configuration
 */
const emailConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
};

/**
 * Create a Nodemailer Transporter
 */
const transporter = nodemailer.createTransport(emailConfig);

/**
 * Send an Email
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body
 */
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };