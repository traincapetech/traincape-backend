import Voucher from '../model/voucher.model.js';
import VoucherBatch from '../model/voucherBatch.model.js';
import VoucherPurchase from '../model/voucherPurchase.model.js';
import { v4 as uuidv4 } from 'uuid';
import { sendVoucherEmail } from '../utils/email.js';

// Create a new voucher batch
const createVoucherBatch = async (req, res) => {
  try {
    const { course, subCourse, price, totalVouchers, voucherCodes, description } = req.body;

    if (!course || !subCourse || !price || !totalVouchers || !voucherCodes || !Array.isArray(voucherCodes)) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (voucherCodes.length !== totalVouchers) {
      return res.status(400).json({ success: false, message: 'Number of voucher codes must match total vouchers' });
    }

    const batchId = `BATCH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create voucher batch
    const newBatch = new VoucherBatch({
      batchId,
      course,
      subCourse,
      price,
      totalVouchers,
      availableVouchers: totalVouchers,
      description,
      createdBy: req.user?.username || 'admin'
    });

    await newBatch.save();

    // Create individual vouchers
    const vouchers = voucherCodes.map(code => ({
      voucherCode: code.trim(),
      course,
      subCourse,
      price,
      batchId
    }));

    await Voucher.insertMany(vouchers);

    res.status(201).json({
      success: true,
      message: 'Voucher batch created successfully',
      batch: newBatch
    });

  } catch (error) {
    console.error('Error creating voucher batch:', error);
    res.status(500).json({ success: false, message: 'Error creating voucher batch' });
  }
};

// Get all voucher batches
const getVoucherBatches = async (req, res) => {
  try {
    const batches = await VoucherBatch.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, batches });
  } catch (error) {
    console.error('Error fetching voucher batches:', error);
    res.status(500).json({ success: false, message: 'Error fetching voucher batches' });
  }
};

// Get available vouchers for a course/subcourse
const getAvailableVouchers = async (req, res) => {
  try {
    const { course, subCourse } = req.query;

    if (!course || !subCourse) {
      return res.status(400).json({ success: false, message: 'Course and subCourse are required' });
    }

    const batch = await VoucherBatch.findOne({
      course,
      subCourse,
      status: 'active',
      availableVouchers: { $gt: 0 }
    });

    if (!batch) {
      return res.status(200).json({ success: true, available: false, message: 'No vouchers available' });
    }

    res.status(200).json({
      success: true,
      available: true,
      batch: {
        batchId: batch.batchId,
        course: batch.course,
        subCourse: batch.subCourse,
        price: batch.price,
        currency: batch.currency,
        availableVouchers: batch.availableVouchers
      }
    });

  } catch (error) {
    console.error('Error fetching available vouchers:', error);
    res.status(500).json({ success: false, message: 'Error fetching available vouchers' });
  }
};

// Purchase a voucher
const purchaseVoucher = async (req, res) => {
  try {
    const { course, subCourse, customer } = req.body;

    if (!course || !subCourse || !customer || !customer.name || !customer.email) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Find an available voucher
    const voucher = await Voucher.findOne({
      course,
      subCourse,
      status: 'available'
    });

    if (!voucher) {
      return res.status(400).json({ success: false, message: 'No vouchers available for this course' });
    }

    // Update voucher status to sold
    voucher.status = 'sold';
    voucher.soldTo = customer;
    voucher.soldAt = new Date();
    await voucher.save();

    // Update batch statistics
    const batch = await VoucherBatch.findOne({ batchId: voucher.batchId });
    if (batch) {
      batch.availableVouchers -= 1;
      batch.soldVouchers += 1;
      if (batch.availableVouchers === 0) {
        batch.status = 'depleted';
      }
      await batch.save();
    }

    // Create purchase record
    const purchaseId = `PURCHASE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const purchase = new VoucherPurchase({
      purchaseId,
      voucherCode: voucher.voucherCode,
      course,
      subCourse,
      customer,
      payment: {
        amount: voucher.price,
        currency: voucher.currency
      }
    });

    await purchase.save();

    res.status(200).json({
      success: true,
      message: 'Voucher purchased successfully',
      purchase: {
        purchaseId: purchase.purchaseId,
        voucherCode: voucher.voucherCode,
        course,
        subCourse,
        price: voucher.price,
        currency: voucher.currency
      }
    });

  } catch (error) {
    console.error('Error purchasing voucher:', error);
    res.status(500).json({ success: false, message: 'Error purchasing voucher' });
  }
};

// Complete payment and send voucher email
const completeVoucherPurchase = async (req, res) => {
  try {
    const { purchaseId, stripePaymentIntentId } = req.body;

    const purchase = await VoucherPurchase.findOne({ purchaseId });
    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Purchase not found' });
    }

    // Update payment status
    purchase.payment.status = 'completed';
    purchase.payment.stripePaymentIntentId = stripePaymentIntentId;
    purchase.status = 'delivered';
    purchase.deliveredAt = new Date();
    await purchase.save();

    // Send voucher email
    try {
      await sendVoucherEmail(purchase.customer.email, {
        name: purchase.customer.name,
        voucherCode: purchase.voucherCode,
        course: purchase.course,
        subCourse: purchase.subCourse,
        purchaseId: purchase.purchaseId
      });

      purchase.emailSent = true;
      purchase.emailSentAt = new Date();
      await purchase.save();
    } catch (emailError) {
      console.error('Error sending voucher email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Voucher purchase completed and email sent'
    });

  } catch (error) {
    console.error('Error completing voucher purchase:', error);
    res.status(500).json({ success: false, message: 'Error completing voucher purchase' });
  }
};

// Get voucher analytics
const getVoucherAnalytics = async (req, res) => {
  try {
    const totalBatches = await VoucherBatch.countDocuments();
    const activeBatches = await VoucherBatch.countDocuments({ status: 'active' });
    const totalVouchers = await Voucher.countDocuments();
    const soldVouchers = await Voucher.countDocuments({ status: 'sold' });
    const usedVouchers = await Voucher.countDocuments({ status: 'used' });
    const availableVouchers = await Voucher.countDocuments({ status: 'available' });

    const totalRevenue = await VoucherPurchase.aggregate([
      { $match: { 'payment.status': 'completed' } },
      { $group: { _id: null, total: { $sum: '$payment.amount' } } }
    ]);

    const salesByCourse = await VoucherPurchase.aggregate([
      { $match: { 'payment.status': 'completed' } },
      { $group: { _id: '$course', count: { $sum: 1 }, revenue: { $sum: '$payment.amount' } } },
      { $sort: { revenue: -1 } }
    ]);

    const recentPurchases = await VoucherPurchase.find({ 'payment.status': 'completed' })
      .sort({ purchasedAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      analytics: {
        totalBatches,
        activeBatches,
        totalVouchers,
        soldVouchers,
        usedVouchers,
        availableVouchers,
        totalRevenue: totalRevenue[0]?.total || 0,
        salesByCourse,
        recentPurchases
      }
    });

  } catch (error) {
    console.error('Error fetching voucher analytics:', error);
    res.status(500).json({ success: false, message: 'Error fetching voucher analytics' });
  }
};

// Update voucher batch price
const updateVoucherBatchPrice = async (req, res) => {
  try {
    const { batchId, price } = req.body;

    if (!batchId || !price) {
      return res.status(400).json({ success: false, message: 'Batch ID and price are required' });
    }

    const batch = await VoucherBatch.findOne({ batchId });
    if (!batch) {
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }

    // Update batch price
    batch.price = price;
    await batch.save();

    // Update all available vouchers in this batch
    await Voucher.updateMany(
      { batchId, status: 'available' },
      { price }
    );

    res.status(200).json({
      success: true,
      message: 'Voucher batch price updated successfully'
    });

  } catch (error) {
    console.error('Error updating voucher batch price:', error);
    res.status(500).json({ success: false, message: 'Error updating voucher batch price' });
  }
};

export default {
  createVoucherBatch,
  getVoucherBatches,
  getAvailableVouchers,
  purchaseVoucher,
  completeVoucherPurchase,
  getVoucherAnalytics,
  updateVoucherBatchPrice
};
