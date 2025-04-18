// // const express = require("express");
// // const cors = require("cors");
// // const { connection } = require("./db");

// // const { userRouter } = require("./routes/user.routes");
// // const { reviewRouter } = require("./routes/review.routes");
// // const { bookRouter } = require("./routes/book.routes");
// // require("dotenv").config();

// // const app = express();

// // app.use(express.json());
// // app.use(cors());

// // app.use("/users", userRouter);
// // app.use("/review", reviewRouter);
// // app.use("/books", bookRouter);
// // app.get("/", (req, res) => { 
// //   res.status(200).send({
// //     message: "This is our Homepage",
// //   });
// // });

// // app.listen(process.env.PORT, async () => {
// //   try {
// //     await connection;
// //     console.log("Connected to MongoDB");
// //     console.log(`Server is running on port ${process.env.PORT}`);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // });
// // Updated by saurav
// // index.js
// const express = require("express");
// const cors = require("cors");
// const { connection } = require("./db");

// const { userRouter } = require("./routes/user.routes");
// const { reviewRouter } = require("./routes/review.routes");
// const { bookRouter } = require("./routes/book.routes");
// const { questionRouter } = require("./routes/question.routes"); 
// const { resultRouter } = require("./routes/result.routes");

// require("dotenv").config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/questions", questionRouter);  
// app.use("/results", resultRouter);  // Add the resultRouter here
// app.use("/users", userRouter);
// app.use("/review", reviewRouter);
// app.use("/books", bookRouter);

// app.get("/", (req, res) => { 
//   res.status(200).send({
//     message: "This is our Homepage",
//   });
// });

// app.listen(process.env.PORT, async () => {
//   try {
//     await connection;
//     console.log("Connected to MongoDB");
//     console.log(`Server is running on port ${process.env.PORT}`);
//   } catch (error) {
//     console.log("Error connecting to MongoDB:", error);
//   }
// });


// const express = require("express");
// const cors = require("cors");
// const { connection } = require("./db");

// const { userRouter } = require("./routes/user.routes");
// const { reviewRouter } = require("./routes/review.routes");
// const { bookRouter } = require("./routes/book.routes");
// require("dotenv").config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/users", userRouter);
// app.use("/review", reviewRouter);
// app.use("/books", bookRouter);
// app.get("/", (req, res) => { 
//   res.status(200).send({
//     message: "This is our Homepage",
//   });
// });

// app.listen(process.env.PORT, async () => {
//   try {
//     await connection;
//     console.log("Connected to MongoDB");
//     console.log(`Server is running on port ${process.env.PORT}`);
//   } catch (error) {
//     console.log(error);
//   }
// });
// Updated by saurav
// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { userRouter } from "./routes/user.routes.js";
import { reviewRouter } from "./routes/review.routes.js";
import { bookRouter } from "./routes/book.routes.js";
import { questionRouter } from "./routes/question.routes.js"; 
import { resultRouter } from "./routes/result.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://traincapetech.in',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use("/questions", questionRouter);  
app.use("/results", resultRouter);
app.use("/users", userRouter);
app.use("/review", reviewRouter);
app.use("/books", bookRouter);

app.get("/", (req, res) => { 
  res.status(200).send({
    message: "This is our Homepage",
  });
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();