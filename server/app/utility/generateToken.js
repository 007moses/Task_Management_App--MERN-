import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1h" });
};

export { generateToken };
