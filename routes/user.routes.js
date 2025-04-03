import express from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../model/user.model.js";

dotenv.config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    phoneNumber,
    address,
    pinCode,
    country,
    linkedIn,
    interest,
  } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email.trim() });

    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "Email already registered" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        username,
        email,
        password: hash,
        role,
        phoneNumber,
        address,
        pinCode,
        country,
        linkedIn,
        interest,
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "The new user has been registered",
        registeredUser: user,
      });
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Wrong Credentials" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res
          .status(401)
          .send({ success: false, message: "Wrong Credentials" });
      }
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).send({
        success: true,
        message: "Login successful!",
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

userRouter.post("/sendOTPToEmail", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ msg: "Email Id does not exist in the database" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      // to: email,
      subject: "Password Reset OTP",
      html: `
      <!-- Updated HTML template with image -->
<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
      <h2 style="color: #333;">OTP Verification</h2>
      <p style="color: #555; font-size: 16px;">Your One-Time Password (OTP) for verification is:</p>
      <div style="font-size: 24px; font-weight: bold; color: #333; padding: 10px 20px; background: #f8f8f8; border: 1px dashed #333; display: inline-block; margin: 10px 0;">
          ${otp}
      </div>
      <p style="color: #777; font-size: 14px;">This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
      <p style="color: #777; font-size: 14px;">If you did not request this, please ignore this email.</p>
      <div style="font-size: 12px; color: #aaa; margin-top: 20px;">© 2025 TrainCape Industries</div>
  </div>
</div>
`,
    };

    // Use Promise for better async handling
    transporter
      .sendMail(mailOptions)
      .then(() => {
        return res.json({ success: true, message: "OTP sent successfully" });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: "Error sending email" });
      });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
});

userRouter.post("/verifyOtp", async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Wrong Credentials" });
    }
    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }
    user.verifyOtp = "";
    user.verifyOTPExpireAt = 0;
    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
});

userRouter.post("/reset_password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Wrong Credentials" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();
    return res.json({
      success: true,
      message: "Password has been changed Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
});
export { userRouter };
