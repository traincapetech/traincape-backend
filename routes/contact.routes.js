import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const contactRouter = express.Router();

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

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
      return res.status(400).json({ success: false, message: "Name is required." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "A valid email is required." });
    }
    if (!String(subject).trim()) {
      return res.status(400).json({ success: false, message: "Please select a service." });
    }
    if (!String(message).trim() || String(message).trim().length < 10) {
      return res.status(400).json({ success: false, message: "Message must be at least 10 characters." });
    }

    const smtpUser = process.env.EMAIL_USER;
    const smtpPass = process.env.EMAIL_PASS;
    if (!smtpUser || !smtpPass) {
      return res.status(500).json({
        success: false,
        message: "Server email is not configured. Please try again later.",
      });
    }

    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "sales@traincapetech.in";

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

    return res.json({ success: true, message: "Thanks! We’ll get back to you shortly." });
  } catch (error) {
    console.error("Contact lead error:", error);
    return res.status(500).json({ success: false, message: "Failed to send message. Please try again." });
  }
});

export { contactRouter };

