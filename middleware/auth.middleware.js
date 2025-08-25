import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ msg: "Please login" });
  }

  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: "Token is invalid or expired" });
    }
    req.body.userId = decoded.userId;
    req.body.username = decoded.username;
    next();
  });
};

export default auth;
