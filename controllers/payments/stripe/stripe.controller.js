import { UserModel } from "../../../model/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SK,
  {
    apiVersion: "2023-10-16",
  }
);

// Get the frontend URL with better fallback handling
const FRONTEND_URL = process.env.FRONTEND_URL || "https://traincapetech.in";

console.log("Using FRONTEND_URL for payment redirects:", FRONTEND_URL);

// Create payment session
const StripePayment = async (req, res) => {
  const { lineItems, success_url, cancel_url, email, productIds } = req.body;
  try {
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

    // // Get the updated user data
    const updatedUser = await UserModel.findOne({ email });
    const updatedTransaction = updatedUser.transactions.find(
      (t) => t.transactionId === transaction.transactionId
    );

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      transaction: updatedTransaction,
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

export { StripePayment, StripePaymentSuccess };
