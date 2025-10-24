import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../../models/admin.models/User.model.js";
import { comparePassword, signJWT, hashPassword } from "../../utils/admin.utils/admin.utils.js";

/* -----------------------------
 * Config / helpers
 * --------------------------- */

// Normalize email
function normEmail(email) {
  return (email || "").toString().trim().toLowerCase();
}

// Admin app origin (for reset links)
function appOrigin() {
  const origin =
    process.env.ADMIN_APP_ORIGIN ||
    process.env.CORS_ORIGIN ||
    "http://localhost:3000";
  return origin.replace(/\/$/, "");
}

// SMTP config
const SMTP_HOST = process.env.SMTP_HOST || process.env.MAIL_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || process.env.MAIL_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || process.env.MAIL_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.MAIL_PASS;
const MAIL_FROM =
  process.env.MAIL_FROM || process.env.MAIL_FORM || '"NEXA ADMIN" <no-reply@nexa.app>';

/* -----------------------------
 * Auth (login / signup / reset)
 * --------------------------- */

/**
 * Login admin
 */
export async function loginAdmin({ email, password }) {
  const admin = await User.findOne({ email: normEmail(email) });
  if (!admin) throw new Error("Admin not found");

  if (admin.status !== "active") {
    throw new Error("Admin account is not active");
  }

  // Ensure password comparison with bcrypt
  const ok = await comparePassword(password, admin.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  const token = signJWT({
    id: admin._id.toString(),
    role: admin.role,
    email: admin.email,
  });

  return {
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  };
}

/**
 * Send reset password email
 */
export async function setAdminResetEmail(emailRaw) {
  const email = normEmail(emailRaw);
  const admin = await User.findOne({ email, role: "admin" });
  if (!admin) throw new Error("Admin not found");

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  admin.resetPasswordToken = token;
  admin.resetPasswordExpires = expiresAt;
  await admin.save();

  const resetUrl = `${appOrigin()}/v1/admin/reset?token=${token}&email=${encodeURIComponent(
    email
  )}`;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const mail = {
    from: MAIL_FROM,
    to: email,
    subject: "Reset your NEXA ADMIN password",
    html: `
      <p>Hello ${admin.name || "ADMIN"},</p>
      <p>You requested to reset your NEXA Admin password.</p>
      <p>This link is valid for 1 hour:</p>
      <p><a href="${resetUrl}" target="_blank" rel="noopener noreferrer">${resetUrl}</a></p>
      <p>If you did not request this, you can ignore this email.</p>
      <p>- NEXA Security</p>
    `,
  };

  await transporter.sendMail(mail);
  return true;
}

/**
 * Signup admin (Settings page only)
 */
export async function signupAdmin({ name, email, password }) {
  const em = normEmail(email);
  const exists = await User.findOne({ email: em });
  if (exists) throw new Error("Email already in use");

  const passwordHash = await hashPassword(password);
  const admin = await User.create({
    name,
    email: em,
    passwordHash,
    role: "admin",
    status: "active",
  });

  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    status: admin.status,
  };
}

/**
 * Get admin by ID
 */
export async function getAdminById(id) {
  const admin = await User.findOne({ _id: id, role: "admin" });
  if (!admin) throw new Error("Admin not found");
  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    status: admin.status,
  };
}

/**
 * Update admin details
 */
export async function updateAdminById(id, { name, email }) {
  const update = {};
  if (name) update.name = name;
  if (email) {
    const em = normEmail(email);
    const exists = await User.findOne({ email: em, _id: { $ne: id } });
    if (exists) throw new Error("Email already in use");
    update.email = em;
  }
  if (Object.keys(update).length === 0) throw new Error("Nothing to update");

  const admin = await User.findOneAndUpdate(
    { _id: id, role: "admin" },
    { $set: update },
    { new: true }
  );
  if (!admin) throw new Error("Admin not found");

  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    status: admin.status,
  };
}

/**
 * Change admin password
 */
export async function changeAdminPassword(id, { currentPassword, newPassword }) {
  const admin = await User.findOne({ _id: id, role: "admin" });
  if (!admin) throw new Error("Admin not found");

  const ok = await comparePassword(currentPassword, admin.passwordHash);
  if (!ok) throw new Error("Current password incorrect");

  const passwordHash = await hashPassword(newPassword);
  await User.updateOne({ _id: id }, { $set: { passwordHash } });
  return true;
}

/* -----------------------------
 * Basic helper exports
 * --------------------------- */

export async function getMe(id) {
  return getAdminById(id);
}

export async function patchMe(id, data) {
  return updateAdminById(id, data);
}

export async function patchMyPassword(id, data) {
  return changeAdminPassword(id, data);
}
