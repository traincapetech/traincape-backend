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
      // data: { type: Buffer, required: true }, // Specify `required` for data
      // contentType: { type: String, required: true }, // Specify `required` for contentType
      type: Object,
    },
    // Educational and professional details
    collegeName: {
      type: String,
      required: false,
    },
    tenthMarksheet: {
      // data: { type: Buffer, required: true }, // Specify `required` for data
      // contentType: { type: String, required: true }, // Specify `required` for contentType
      type: Object,
    },
    twelfthMarksheet: {
      // data: { type: Buffer, required: true }, // Specify `required` for data
      // contentType: { type: String, required: true }, // Specify `required` for contentType
      type: Object,
    },
    bachelorsCertificate: {
      // data: { type: Buffer, required: false },
      // contentType: { type: String, required: false },
      type: Object,
    },
    pgCertificate: {
      // data: { type: Buffer, required: false },
      // contentType: { type: String, required: false },
      type: Object,
    },
    // Documents
    aadharCard: {
      // data: { type: Buffer, required: false },
      // contentType: { type: String, required: false },
      type: Object,
    },
    panCard: {
      // data: { type: Buffer, required: false },
      // contentType: { type: String, required: false },
      type: Object,
    },
    policeClearance: {
      // data: { type: Buffer, required: false },
      // contentType: { type: String, required: false },
      type: Object,
    },
    resume: {
      // data: { type: Buffer, required: false },
      // contentType: { type: String, required: false },
      type: Object,
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
      // data: { type: Buffer, required: false },
      // contentType: { type: String, required: false },
      type: Object,
    },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;