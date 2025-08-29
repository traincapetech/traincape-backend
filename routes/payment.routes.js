import express from "express";
import {
  StripePayment,
  StripePaymentSuccess,
  StripeWebhook,
} from "../controllers/payments/stripe/stripe.controller.js";
// import { StripeAppointment, TamdCoinAppointment, StripeAppointmentSuccess } from "../Controllers/payments/appointments/appointment.payment.controller.js";

const paymentRouter = express.Router();

//Routes
paymentRouter.post("/stripe", StripePayment);
paymentRouter.get("/stripe-success", StripePaymentSuccess);
// Stripe requires the raw body for webhook signature verification
paymentRouter.post("/stripe/webhook", express.raw({ type: "application/json" }), StripeWebhook);
export { paymentRouter };