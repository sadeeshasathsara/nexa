// src/scripts/seed-admin.js
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/admin.models/User.model.js";
import "../config/admin.config/db.config.js";

async function main() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGODB_DB || "nexa";

  if (!uri) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
  }

  console.log(`[seed] Connecting to ${dbName}…`);
  await mongoose.connect(uri, { dbName });

  const email = (process.env.ADMIN_EMAIL || "admin@nexa.lk").toLowerCase();
  const name = process.env.ADMIN_NAME || "Super Admin";
  const pwd = process.env.ADMIN_PASSWORD || "Ehara123!";

  const exists = await User.findOne({ email, role: "admin" });
  if (exists) {
    console.log(`Admin already exists: ${email} & ${pwd}`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(pwd, 10);
  await User.create({
    name,
    email,
    passwordHash,
    role: "admin",
    status: "active",
  });

  console.log(`Seeded admin: ${email}  (password: ${pwd})`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
