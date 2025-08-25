import mongoose from 'mongoose';

const voucherPurchaseSchema = new mongoose.Schema({
  purchaseId: {
    type: String,
    required: true,
    unique: true
  },
  voucherCode: {
    type: String,
    required: true,
    ref: 'Voucher'
  },
  course: {
    type: String,
    required: true
  },
  subCourse: {
    type: String,
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String
  },
  payment: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    stripePaymentIntentId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  status: {
    type: String,
    enum: ['purchased', 'delivered', 'used'],
    default: 'purchased'
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  },
  deliveredAt: Date,
  usedAt: Date,
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: Date
});

export default mongoose.model('VoucherPurchase', voucherPurchaseSchema);
