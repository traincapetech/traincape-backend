import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

// Routers
import { userRouter } from "./routes/user.routes.js";
import { reviewRouter } from "./routes/review.routes.js";
import { bookRouter } from "./routes/book.routes.js";
import { questionRouter } from "./routes/question.routes.js"; 
import { resultRouter } from "./routes/result.routes.js";
import { paymentRouter } from "./routes/payment.routes.js";
import { employeeRouter } from "./routes/employee.routes.js";
import certificateRouter from "./routes/certificate.routes.js"; // ✅ NEW

dotenv.config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: ['https://traincapetech.in', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// ✅ Static Files
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/questions", questionRouter);  
app.use("/employees", employeeRouter);
app.use("/results", resultRouter);
app.use("/users", userRouter);
app.use("/review", reviewRouter);
app.use("/books", bookRouter);
app.use("/payments", paymentRouter);
app.use("/certificates", certificateRouter); // ✅ NEW ROUTE

// ✅ Home Endpoint
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Traincape Technology API",
  });
});

// ✅ Server Bootstrap
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
