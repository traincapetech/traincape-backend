// mail.js

import nodemailer from 'nodemailer';

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

// Send voucher email
const sendVoucherEmail = async (to, voucherData) => {
  try {
    const subject = `Your Voucher for ${voucherData.course} - ${voucherData.subCourse}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Your Voucher is Ready!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for your purchase</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Voucher Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
            <h3 style="color: #667eea; margin: 0 0 10px 0;">${voucherData.course} - ${voucherData.subCourse}</h3>
            <p style="margin: 5px 0; color: #666;"><strong>Voucher Code:</strong> <span style="background: #f0f0f0; padding: 5px 10px; border-radius: 4px; font-family: monospace; font-weight: bold;">${voucherData.voucherCode}</span></p>
            <p style="margin: 5px 0; color: #666;"><strong>Purchase ID:</strong> ${voucherData.purchaseId}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="color: #2d5a2d; margin: 0 0 10px 0;">📋 Important Instructions:</h4>
            <ul style="color: #2d5a2d; margin: 0; padding-left: 20px;">
              <li>Keep this voucher code safe and confidential</li>
              <li>Use this code when registering for your certification exam</li>
              <li>This voucher is valid for one-time use only</li>
              <li>Contact support if you have any questions</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; margin-bottom: 20px;">Need help? Contact our support team</p>
            <a href="mailto:support@traincapetech.in" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Contact Support</a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© 2024 Traincape Technology. All rights reserved.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Voucher email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending voucher email:', error);
    return false;
  }
};

export { sendEmail, sendVoucherEmail };