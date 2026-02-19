import * as brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Career Application Controller using Brevo
 * Handles career form submissions and sends emails to HR
 */

/**
 * Submit career application
 * POST /api/career/apply
 */
export const submitCareerApplication = async (req, res) => {
  try {
    const { name, email, phoneNumber, resumeLink, role, message } = req.body;

    // Validation
    if (!name || !email || !phoneNumber || !resumeLink || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Initialize Brevo API client
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Email content to send to HR
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🎯 New Career Application</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">${role}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Candidate Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <p style="margin: 10px 0; color: #666;"><strong style="color: #1e3a8a;">👤 Name:</strong> ${name}</p>
            <p style="margin: 10px 0; color: #666;"><strong style="color: #1e3a8a;">📧 Email:</strong> ${email}</p>
            <p style="margin: 10px 0; color: #666;"><strong style="color: #1e3a8a;">📱 Phone:</strong> ${phoneNumber}</p>
            <p style="margin: 10px 0; color: #666;"><strong style="color: #1e3a8a;">💼 Role Applied:</strong> ${role}</p>
            <p style="margin: 10px 0; color: #666;"><strong style="color: #1e3a8a;">📄 Resume Link:</strong> <a href="${resumeLink}" style="color: #3b82f6;">View Resume</a></p>
          </div>
          
          ${message ? `
          <div style="background: #e8f4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e3a8a; margin: 0 0 10px 0;">💬 Message:</h3>
            <p style="color: #666; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px;">This application was submitted via Traincape Career Page</p>
            <p style="color: #999; font-size: 12px;">Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      </div>
    `;

    // Send email to HR using Brevo
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = `🎯 New Career Application - ${role}`;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: 'Traincape Career Portal', email: 'jhasonu136@gmail.com' };
    sendSmtpEmail.to = [{ email: 'hr@traincapetech.in', name: 'HR Team' }];

    // Only add replyTo if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      sendSmtpEmail.replyTo = { email: email, name: name };
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Our HR team will contact you soon.',
    });
  } catch (error) {
    console.error('Error submitting career application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
      error: error.message,
    });
  }
};
