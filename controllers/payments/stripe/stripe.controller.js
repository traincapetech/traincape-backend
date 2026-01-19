import { UserModel } from "../../../model/user.model.js";
import Stripe from "stripe";
import Voucher from "../../../model/voucher.model.js";
import VoucherBatch from "../../../model/voucherBatch.model.js";
import VoucherPurchase from "../../../model/voucherPurchase.model.js";
import { sendVoucherEmail } from "../../../utils/email.js";

// Resolve Stripe secret from multiple possible env names
const STRIPE_SECRET_KEY = process.env.STRIPE_SK || process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET;

let stripe;
if (!STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE secret key is not set. Please set STRIPE_SK or STRIPE_SECRET_KEY.");
} else {
  stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
}

// Get the frontend URL with better fallback handling
const FRONTEND_URL = process.env.FRONTEND_URL || "https://traincapetech.in";

console.log("Using FRONTEND_URL for payment redirects:", FRONTEND_URL);

// Create payment session
const StripePayment = async (req, res) => {
  const { lineItems, success_url, cancel_url, email, productIds } = req.body;
  try {
    if (!stripe) {
      return res.status(500).json({ success: false, message: "Stripe is not configured on the server. Set STRIPE_SK or STRIPE_SECRET_KEY." });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Validate voucher inventory against requested productIds
    if (Array.isArray(productIds) && productIds.length > 0) {
      const requested = {};
      for (const pid of productIds) {
        if (typeof pid === 'string' && pid.startsWith('voucher-')) {
          const parts = pid.split('-');
          const course = parts[1] || '';
          const subCourse = parts.slice(2).join('-') || '';
          const key = `${course}__${subCourse}`;
          requested[key] = (requested[key] || 0) + 1;
        }
      }
      for (const key of Object.keys(requested)) {
        const [course, subCourse] = key.split('__');
        const availableCount = await (await import('../../../model/voucher.model.js')).default.countDocuments({ course, subCourse, status: 'available' });
        if (availableCount < requested[key]) {
          return res.status(400).json({ success: false, message: `Insufficient vouchers for ${course} ${subCourse}. Available ${availableCount}, requested ${requested[key]}` });
        }
      }
    }

    const totalInCents = lineItems.reduce((sum, item) => {
      return sum + Math.round(item.price_data.unit_amount) * item.quantity;
    }, 0);
    const transactionId = `txn_${new Date().getTime()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    const productMetadata = lineItems.map((item, index) => ({
      name: item.price_data.product_data.name,
      amount: (item.price_data.unit_amount / 100).toString(),
      productId: productIds[index],
    }));

    console.log("productMetadata", productMetadata);
    // Create the session with metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      currency: lineItems[0]?.price_data?.currency || 'usd',
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(
        email
      )}`,
      cancel_url: cancel_url,
      metadata: {
        userEmail: email,
        transactionId: transactionId,
        amount: (totalInCents / 100).toString(),
        productMetadata: JSON.stringify(productMetadata),
      },
    });

    console.log("Session created successfully:", session.id);

    //     // Create a transaction record with pending status
    const transaction_details = {
      type: "Purchase",
      amount: totalInCents / 100,
      date: new Date(),
      status: "pending",
      paymentMethod: "Stripe",
      transactionId: transactionId,
      stripeSessionId: session.id,
      metadata: session.metadata, // Store all metadata for reference
    };

    if (!user.transactions) {
      user.transactions = [];
    }

    user.transactions.unshift(transaction_details);
    await user.save();

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the Stripe payment",
      error: error.message,
    });
  }
};

// Success handler with atomic operations and better idempotencyconst StripePaymentSuccess = async (req, res) => {
const StripePaymentSuccess = async (req, res) => {
  try {
    const { session_id, email } = req.query;

    console.log("Processing payment success:", { session_id, email });

    if (!session_id || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing session ID or email",
      });
    }

    // // Verify the payment was successful with Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // // Find the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // // Try to find transaction by either session ID or metadata transactionId
    const transaction = user.transactions.find(
      (t) =>
        t.stripeSessionId === session_id ||
        t.transactionId === session.metadata?.transactionId
    );

    if (!transaction) {
      return res.status(400).json({
        success: false,
        message: "Transaction record not found",
        suggestion:
          "Check your account balance as the transaction might have already been processed",
      });
    }

    // Check if transaction is already completed
    if (transaction.status === "completed") {
      return res.status(200).json({
        success: true,
        message: "Payment was already processed",
        transaction: transaction,
      });
    }
    // Extract course info from metadata
    const rawMetadata = session.metadata?.productMetadata;
    if (!rawMetadata) {
      return res.status(400).json({
        success: false,
        message: "Missing course details in metadata",
      });
    }
    let productMetadata = JSON.parse(rawMetadata);
    const coursesToPush = productMetadata.map((course) => ({
      courseId: course.productId,
      amountPaid: Number(course.amount),
      purchaseDate: new Date(),
    }));

    // // Perform atomic update to prevent race conditions
    const updateResult = await UserModel.updateOne(
      {
        _id: user._id,
        "transactions.transactionId": transaction.transactionId,
        "transactions.status": "pending",
      },
      {
        $set: {
          "transactions.$.status": "completed",
          "transactions.$.completedAt": new Date(),
          "transactions.$.stripePaymentIntent": session.payment_intent?.id,
          "transactions.$.metadata": session.metadata,
        },
        $push: {
          courses: {
            $each: coursesToPush,
          },
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      // No documents were modified - likely already processed
      const currentUser = await UserModel.findOne({ email });
      return res.status(200).json({
        success: true,
        message: "Payment was already processed",
        newCoinQuantity: currentUser.coinQuantity,
        transaction: transaction,
      });
    }

    // Voucher email fallback (if webhook not configured)
    try {
      const rawProducts = session.metadata?.productMetadata;
      if (rawProducts) {
        const existing = await VoucherPurchase.findOne({ 'payment.stripePaymentIntentId': session.payment_intent });
        if (!existing) {
          const items = JSON.parse(rawProducts);
          for (const item of items) {
            const productId = item.productId || '';
            if (!productId.startsWith('voucher-')) continue;
            const parts = productId.split('-');
            const course = parts[1] || '';
            const subCourse = parts.slice(2).join('-') || '';

            const voucher = await Voucher.findOneAndUpdate(
              { course, subCourse, status: 'available' },
              { $set: { status: 'sold', soldAt: new Date(), soldTo: { name: user.username || email, email } } },
              { new: true }
            );
            if (!voucher) continue;

            const batch = await VoucherBatch.findOne({ batchId: voucher.batchId });
            if (batch) {
              batch.availableVouchers = Math.max(0, (batch.availableVouchers || 1) - 1);
              batch.soldVouchers = (batch.soldVouchers || 0) + 1;
              if (batch.availableVouchers === 0) batch.status = 'depleted';
              await batch.save();
            }

            const purchaseId = `PURCHASE_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
            const vp = new VoucherPurchase({
              purchaseId,
              voucherCode: voucher.voucherCode,
              course,
              subCourse,
              customer: { name: user.username || email, email },
              payment: { amount: Number(item.amount) || Number(session.amount_total/100) || 0, currency: (session.currency || 'usd').toUpperCase(), status: 'completed', stripePaymentIntentId: session.payment_intent }
            });
            await vp.save();

            try {
              await sendVoucherEmail(email, { name: user.username || email, voucherCode: voucher.voucherCode, course, subCourse, purchaseId });
              vp.emailSent = true; vp.emailSentAt = new Date(); await vp.save();
            } catch (_) {}
          }
        }
      }
    } catch (e) {
      console.error('Voucher fulfillment fallback failed:', e.message);
    }

    // // Get the updated user data
    const updatedUser = await UserModel.findOne({ email });
    const updatedTransaction = updatedUser.transactions.find(
      (t) => t.transactionId === transaction.transactionId
    );

    // Derive amount and currency robustly
    const amountCents = (session.amount_total != null)
      ? session.amount_total
      : (session.payment_intent?.amount || 0);
    const sessionCurrency = (session.currency || session.payment_intent?.currency || 'usd').toUpperCase();

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      transaction: updatedTransaction,
      amount: Number(amountCents) / 100,
      currency: sessionCurrency,
    });
  } catch (error) {
    console.error("Error processing successful payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the payment success",
      error: error.message,
    });
  }
};

// Webhook handler with signature verification
const StripeWebhook = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!endpointSecret) {
      return res.status(500).send('Webhook secret not configured');
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody || req.bodyRaw || req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session?.metadata?.userEmail;
      const paymentIntentId = session.payment_intent;

      // Mark user transaction complete (best-effort)
      if (email) {
        try {
          const user = await UserModel.findOne({ email });
          if (user) {
            const tx = user.transactions?.find(t => t.stripeSessionId === session.id || t.transactionId === session.metadata?.transactionId);
            if (tx && tx.status !== 'completed') {
              tx.status = 'completed';
              tx.completedAt = new Date();
              tx.stripePaymentIntent = paymentIntentId;
            }
            await user.save();
          }
        } catch (_) {}
      }

      // If vouchers are bought via direct voucher API, finalize email sending here if metadata contains purchaseId
      const rawProducts = session.metadata?.productMetadata;
      if (rawProducts && email) {
        try {
          const items = JSON.parse(rawProducts);
          for (const item of items) {
            const productId = item.productId || "";
            if (productId.startsWith("voucher-")) {
              // Parse format: voucher-<Course>-<SubCourse>
              const parts = productId.split("-");
              const course = parts[1] || "";
              const subCourse = parts.slice(2).join("-") || "";

              // Allocate an available voucher atomically: findOneAndUpdate to avoid race
              const voucher = await Voucher.findOneAndUpdate(
                { course, subCourse, status: 'available' },
                { $set: { status: 'sold', soldAt: new Date(), soldTo: { name: session.customer_details?.name || email, email } } },
                { new: true }
              );
              if (!voucher) {
                console.error(`No available voucher for ${course} ${subCourse}`);
                continue;
              }

              const batch = await VoucherBatch.findOne({ batchId: voucher.batchId });
              if (batch) {
                batch.availableVouchers = Math.max(0, (batch.availableVouchers || 1) - 1);
                batch.soldVouchers = (batch.soldVouchers || 0) + 1;
                if (batch.availableVouchers === 0) batch.status = 'depleted';
                await batch.save();
              }

              // Record voucher purchase
              const purchaseId = `PURCHASE_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
              const vp = new VoucherPurchase({
                purchaseId,
                voucherCode: voucher.voucherCode,
                course,
                subCourse,
                customer: { name: session.customer_details?.name || email, email },
                payment: { amount: Number(item.amount) || Number(session.amount_total/100) || 0, currency: (session.currency || 'usd').toUpperCase(), status: 'completed', stripePaymentIntentId: paymentIntentId }
              });
              await vp.save();

              // Send email
              try {
                await sendVoucherEmail(email, {
                  name: session.customer_details?.name || email,
                  voucherCode: voucher.voucherCode,
                  course,
                  subCourse,
                  purchaseId
                });
                vp.emailSent = true;
                vp.emailSentAt = new Date();
                await vp.save();
              } catch (e) {
                console.error('Voucher email send failed:', e.message);
              }
            }
          }
        } catch (e) {
          console.error('Failed to parse product metadata for webhook:', e.message);
        }
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).send('Webhook handler error');
  }
};

export { StripePayment, StripePaymentSuccess, StripeWebhook };
