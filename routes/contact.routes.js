import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Brevo from "@getbrevo/brevo";

dotenv.config();

const contactRouter = express.Router();

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

// ============================================
// CAREER APPLICATION ENDPOINT (using Brevo)
// ============================================
contactRouter.post("/career-application", async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      phone = "",
      position = "",
      experience = "",
      linkedinUrl = "",
      resumeLink = "",
      coverLetter = "",
    } = req.body || {};

    // Validation
    const safeName = String(name).trim();
    const safeEmail = String(email).trim();
    const safePhone = String(phone).trim();
    const safePosition = String(position).trim();
    const safeExperience = String(experience).trim();
    const safeLinkedin = String(linkedinUrl).trim();
    const safeResumeLink = String(resumeLink).trim();
    const safeCoverLetter = String(coverLetter).trim();

    if (safeName.length < 2) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter your full name." });
    }
    if (!isValidEmail(safeEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }
    if (!safePhone || safePhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }
    if (!safePosition) {
      return res
        .status(400)
        .json({ success: false, message: "Please select a position." });
    }
    if (safeCoverLetter.length < 20) {
      return res.status(400).json({
        success: false,
        message: "Cover letter must be at least 20 characters.",
      });
    }

    // Build email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #152b54, #1e40af); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
          .value { font-size: 16px; color: #1e293b; padding: 10px; background: white; border-radius: 6px; border-left: 3px solid #3b82f6; }
          .position-badge { display: inline-block; background: #3b82f6; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; }
          .cover-letter { white-space: pre-wrap; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .footer { background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; font-size: 14px; }
          a { color: #3b82f6; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Career Application</h1>
            <p>A candidate has applied for a position at Traincape Technology</p>
          </div>
          <div class="content">
            <div class="field" style="text-align: center; margin-bottom: 25px;">
              <span class="position-badge">${safePosition}</span>
            </div>
            
            <div class="field">
              <div class="label">Full Name</div>
              <div class="value">${safeName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value"><a href="tel:${safePhone}">${safePhone}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Experience Level</div>
              <div class="value">${safeExperience || "Not specified"}</div>
            </div>
            
            ${
              safeLinkedin
                ? `
            <div class="field">
              <div class="label">LinkedIn Profile</div>
              <div class="value"><a href="${safeLinkedin}" target="_blank">${safeLinkedin}</a></div>
            </div>
            `
                : ""
            }
            
            ${
              safeResumeLink
                ? `
            <div class="field">
              <div class="label">Resume Link</div>
              <div class="value"><a href="${safeResumeLink}" target="_blank">📄 View Resume</a></div>
            </div>
            `
                : ""
            }
            
            <div class="field">
              <div class="label">Cover Letter / Why They Want to Join</div>
              <div class="cover-letter">${safeCoverLetter.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
          </div>
          <div class="footer">
            <p>Received via Traincape Technology Careers Portal</p>
            <p>Reply directly to this email to contact the candidate</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Use Hostinger SMTP to send form data to HR
    const smtpUser = process.env.EMAIL_USER;
    const smtpPass = process.env.EMAIL_PASS;
    if (!smtpUser || !smtpPass) {
      console.error("EMAIL_USER or EMAIL_PASS not configured");
      return res.status(500).json({
        success: false,
        message: "Email service not configured. Please try again later.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: "hr@traincapetech.in",
      replyTo: safeEmail,
      subject: `📋 New Application: ${safePosition} — ${safeName}`,
      html: htmlContent,
    });

    console.log(
      `Career application sent successfully: ${safeName} for ${safePosition}`,
    );
    return res.json({
      success: true,
      message:
        "Application submitted successfully! We'll review your profile and get back to you soon.",
    });
  } catch (error) {
    console.error("Career application error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit application. Please try again.",
    });
  }
});

contactRouter.post("/lead", async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      subject = "",
      message = "",
      phoneNumber = "",
      location = "",
    } = req.body || {};

    if (!String(name).trim() || String(name).trim().length < 2) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required." });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "A valid email is required." });
    }
    if (!String(subject).trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Please select a service." });
    }
    if (!String(message).trim() || String(message).trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters.",
      });
    }

    const smtpUser = process.env.EMAIL_USER;
    const smtpPass = process.env.EMAIL_PASS;
    if (!smtpUser || !smtpPass) {
      return res.status(500).json({
        success: false,
        message: "Server email is not configured. Please try again later.",
      });
    }

    const toEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "sales@traincapetech.in";

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const safe = (v) => String(v || "").trim();
    const text = [
      `New website lead`,
      ``,
      `Name: ${safe(name)}`,
      `Email: ${safe(email)}`,
      `Phone / WhatsApp: ${safe(phoneNumber)}`,
      `Country: ${safe(location)}`,
      `Service / Course: ${safe(subject)}`,
      ``,
      `Message:`,
      safe(message),
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="margin: 0 0 12px;">New Website Lead</h2>
        <table style="border-collapse: collapse;">
          <tr><td style="padding: 4px 10px 4px 0;"><strong>Name</strong></td><td>${safe(name)}</td></tr>
          <tr><td style="padding: 4px 10px 4px 0;"><strong>Email</strong></td><td>${safe(email)}</td></tr>
          <tr><td style="padding: 4px 10px 4px 0;"><strong>Phone / WhatsApp</strong></td><td>${safe(phoneNumber)}</td></tr>
          <tr><td style="padding: 4px 10px 4px 0;"><strong>Country</strong></td><td>${safe(location)}</td></tr>
          <tr><td style="padding: 4px 10px 4px 0;"><strong>Service / Course</strong></td><td>${safe(subject)}</td></tr>
        </table>
        <h3 style="margin: 16px 0 8px;">Message</h3>
        <div style="white-space: pre-wrap; background: #f6f7f8; padding: 12px; border-radius: 8px;">
          ${safe(message).replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: smtpUser,
      to: toEmail,
      replyTo: safe(email),
      subject: `New Lead: ${safe(subject)} — ${safe(name)}`,
      text,
      html,
    });

    return res.json({
      success: true,
      message: "Thanks! We’ll get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact lead error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    });
  }
});

export { contactRouter };
