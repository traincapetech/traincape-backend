import express from 'express';
import voucherController from '../controllers/voucher.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/admin.middleware.js';

const router = express.Router();

// Admin routes (protected)
router.post('/batches', authMiddleware, adminOnly, voucherController.createVoucherBatch);
router.get('/batches', authMiddleware, adminOnly, voucherController.getVoucherBatches);
router.put('/batches/price', authMiddleware, adminOnly, voucherController.updateVoucherBatchPrice);
router.get('/analytics', authMiddleware, adminOnly, voucherController.getVoucherAnalytics);

// Public routes
router.get('/available', voucherController.getAvailableVouchers);
router.post('/purchase', voucherController.purchaseVoucher);
router.post('/complete-purchase', voucherController.completeVoucherPurchase);

export default router;
