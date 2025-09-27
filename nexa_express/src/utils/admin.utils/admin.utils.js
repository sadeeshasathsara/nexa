import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(plain, hashed) {
  if (!plain || !hashed) return false;
  return bcrypt.compare(plain, hashed);
}

export function signJWT(payload) {
  const secret = process.env.JWT_SECRET || "defaultsecret";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}
    
export function verifyJWT(token) {
  const secret = process.env.JWT_SECRET || "defaultsecret";
  return jwt.verify(token, secret);
}