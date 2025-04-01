import mongoose from "mongoose";

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
    resetOtpExpireAt: { type: Number, default: 0 }
  },
  {
    versionKey: false,
  }
);

userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model("users", userSchema);

export { UserModel };
