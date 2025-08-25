import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
  voucherCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  subCourse: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'used'],
    default: 'available'
  },
  soldTo: {
    name: String,
    email: String,
    phone: String
  },
  soldAt: {
    type: Date
  },
  usedAt: {
    type: Date
  },
  purchaseId: {
    type: String
  },
  batchId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
voucherSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Voucher', voucherSchema);
