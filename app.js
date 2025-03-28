//app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./db.js";
import userRouter from "./Routes/newuser.route.js";
import buyNowRouter from "./Routes/buynow.route.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
connectdb();

app.use(cors({
    methods: ['POST', 'GET', 'PUT', 'DELETE' ],
    credentials: true,
}));

app.use(express.json());

//Routes
app.use("/users", userRouter);
app.use("/buynow", buyNowRouter);


app.get('/', (req, res) => { 
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is listening ${port}`);
});


export default app;