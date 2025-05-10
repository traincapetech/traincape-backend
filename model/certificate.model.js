import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  courseName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  issuedBy: { type: String, required: true },
  certificateURL: { type: String }, // optional: link to uploaded PDF
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);
