import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  if (!token) {
    return res.status(401).send({ error: "Please login" });
  }

  const secret = process.env.SECRET_KEY; // Align with token signing secret
  if (!secret) {
    return res.status(500).send({ error: "Server misconfiguration: SECRET_KEY is not set" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: "Token is invalid or expired" });
    }
    req.user = { userId: decoded.userId, username: decoded.username, role: decoded.role };
    next();
  });
};

export default auth;
