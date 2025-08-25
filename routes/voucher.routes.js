import express from 'express';
import voucherController from '../controllers/voucher.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin routes (protected)
router.post('/batches', authMiddleware, voucherController.createVoucherBatch);
router.get('/batches', authMiddleware, voucherController.getVoucherBatches);
router.put('/batches/price', authMiddleware, voucherController.updateVoucherBatchPrice);
router.get('/analytics', authMiddleware, voucherController.getVoucherAnalytics);

// Public routes
router.get('/available', voucherController.getAvailableVouchers);
router.post('/purchase', voucherController.purchaseVoucher);
router.post('/complete-purchase', voucherController.completeVoucherPurchase);

export default router;
