import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { UserModel } from '../model/user.model.js';

dotenv.config();

async function run() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MONGO_URI not found in env");
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB database");

    // Check if test admin already exists
    const testEmail = "admin@traincape.com";
    const existingTestAdmin = await UserModel.findOne({ email: testEmail });

    const hashedPassword = await bcrypt.hash("Admin@123", 5);

    if (existingTestAdmin) {
      console.log(`Test admin ${testEmail} already exists. Resetting password to Admin@123...`);
      existingTestAdmin.password = hashedPassword;
      existingTestAdmin.role = "admin";
      await existingTestAdmin.save();
      console.log("Password reset successful!");
    } else {
      console.log(`Creating test admin ${testEmail} with password Admin@123...`);
      const newAdmin = new UserModel({
        username: "Admin User",
        email: testEmail,
        password: hashedPassword,
        role: "admin",
        phoneNumber: "1234567890",
        address: "Admin HQ",
        pinCode: "110001",
        country: "India",
        interest: "IT Certifications"
      });

      await newAdmin.save();
      console.log("Test admin created successfully!");
    }

    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

run();
