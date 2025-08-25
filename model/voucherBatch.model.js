import mongoose from 'mongoose';

const voucherBatchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true,
    unique: true
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
  totalVouchers: {
    type: Number,
    required: true,
    min: 1
  },
  availableVouchers: {
    type: Number,
    required: true,
    min: 0
  },
  soldVouchers: {
    type: Number,
    default: 0
  },
  usedVouchers: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'depleted'],
    default: 'active'
  },
  description: {
    type: String,
    trim: true
  },
  createdBy: {
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
voucherBatchSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('VoucherBatch', voucherBatchSchema);
