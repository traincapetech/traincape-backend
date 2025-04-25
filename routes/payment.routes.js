import express from "express";
import {
  StripePayment,
  StripePaymentSuccess,
} from "../controllers/payments/stripe/stripe.controller.js";
// import { StripeAppointment, TamdCoinAppointment, StripeAppointmentSuccess } from "../Controllers/payments/appointments/appointment.payment.controller.js";

const paymentRouter = express.Router();

//Routes
paymentRouter.post("/stripe", StripePayment);
paymentRouter.get("/stripe-success", StripePaymentSuccess);
export { paymentRouter };