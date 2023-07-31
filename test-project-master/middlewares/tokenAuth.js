import jwt from "jsonwebtoken";
import "dotenv/config";
const secretKey = process.env.SECRET_KEY;
export const TokenAuth = (req, res, next) => {
  let token = req.header("authorization").split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Invalid token" });
  }
  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
