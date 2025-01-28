// const express = require("express");
// const userRouter = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const { UserModel } = require("../model/user.model");

// userRouter.post("/register", async (req, res) => {
//   const { username, email, password, role } = req.body;
//   try {
//     bcrypt.hash(password, 5, async (err, hash) => {
//       const user = new UserModel({ username, email, password: hash, role });
//       await user.save();
//       res.status(200).send({
//         msg: "The new user has been registered",
//         registeredUser: user,
//       });
//     });
//   } catch (error) {
//     res.status(400).send({ error: error });
//   }
// });
// userRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     if (user) {
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (result) {
//           res.status(200).send({
//             msg: "Login successful!", 
//             token: jwt.sign(
//               { userId: user._id, username: user.username },
//               process.env.secretKey
//             ),
//             user,
//           });
//         } else {
//           console.log(err);
//           res.status(402).send({ error: err });
//         }
//         // result == true
//       });
//     } else {
//       res.status(400).send({ msg: "Wrong Credentials" });
//     }
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

// module.exports = {
//   userRouter,
// };
// updated by saurav
// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const { UserModel } = require("../model/user.model");

// const userRouter = express.Router();

// userRouter.post("/register", async (req, res) => {
//   const { username, email, password, role } = req.body;
//   try {
//     // Check if email already exists
    
    
//     const existingUser = await UserModel.findOne({email: email.trim()});
    
//     if (existingUser) {
//       return res.status(400).send({ msg: "Email already registered" });
//     }

//     bcrypt.hash(password, 5, async (err, hash) => {
//       const user = new UserModel({ username, email, password: hash, role });
//       await user.save();
//       res.status(200).send({
//         msg: "The new user has been registered",
//         registeredUser: user,
//       });
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });



// userRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(400).send({ msg: "Wrong Credentials" });
//     }
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err || !result) {
//         return res.status(401).send({ msg: "Wrong Credentials" });
//       }
//       const token = jwt.sign(
//         { userId: user._id, username: user.username },
//         process.env.secretKey,
//         { expiresIn: "1h" }
//       );
//       res.status(200).send({
//         msg: "Login successful!",
//         token,
//         user,
//       });
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// module.exports = {
//   userRouter,
// };

//Updated by Ritik
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password, role, phoneNumber, address, pinCode, country, linkedIn, interest } = req.body;
  try {
    // Check if email already exists
    
    
    const existingUser = await UserModel.findOne({email: email.trim()});
    
    if (existingUser) {
      return res.status(400).send({ msg: "Email already registered" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ username, email, password: hash, role, phoneNumber, address, pinCode, country, linkedIn, interest });
      await user.save();
      res.status(200).send({
        msg: "The new user has been registered",
        registeredUser: user,
      });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Wrong Credentials" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).send({ msg: "Wrong Credentials" });
      }
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.secretKey,
        { expiresIn: "1h" }
      );
      res.status(200).send({
        msg: "Login successful!",
        token,
        user: {
          username: user.username,
          email: user.email
        },
      });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  userRouter,
};