// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema(
//   {
//     username: {type: String},
//     email: {type: String, unique: true, require: true},
//     password: {type: String, required: true},
//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//     },
//   },
//   {
//     versionKey: false,
//   }
// );

// const UserModel = mongoose.model("users", userSchema);

// module.exports = {
//   UserModel,
// };

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true }, // It's better to define required for username as well
    email: { 
      type: String, 
      unique: true, 
      required: true, // Corrected from 'require' to 'required'
      lowercase: true, // Optionally enforce lowercase for consistency
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    versionKey: false, // Disable __v field
  }
);

// Ensure a unique index is created for the 'email' field if not already created
userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
