import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  date: Date,
  status: String,
  paymentMethod: String,
  transactionId: String,
  stripeSessionId: String,
  metadata: Object,
});
// Course Purchase Schema
const courseSchema = new mongoose.Schema(
  {
    courseId: String,
    purchaseDate: { type: Date, required: true },
    amountPaid: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
    linkedIn: { type: String },
    interest: { type: String, required: true },
    testHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    transactions: [transactionSchema],
    courses: [courseSchema],
  },
  {
    versionKey: false,
  }
);

userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model("users", userSchema);

export { UserModel };