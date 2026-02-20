import mongoose from 'mongoose';

const consultantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  activeToken: { type: String, default: null }, // null = free, string = busy
  fcmToken: { type: String, default: null }
});

export default mongoose.model('Consultant', consultantSchema);