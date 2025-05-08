import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    // Personal information
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: false,
    },
    linkedinUrl: {
      type: String,
      required: false,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
    },
    photo: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    // Educational and professional details
    collegeName: {
      type: String,
      required: false,
    },
    tenthMarksheet: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    twelfthMarksheet: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    bachelorsCertificate: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    pgCertificate: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    // Documents
    aadharCard: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    panCard: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    policeClearance: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    resume: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
    // Employment details
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Resigned", "Terminated"],
      default: "Active",
    },
    internshipDuration: {
      type: String,
      required: false,
    },
    offerLetter: {
      data: { type: Buffer },
      contentType: { type: String },
      filename: { type: String },
      size: { type: Number }
    },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;