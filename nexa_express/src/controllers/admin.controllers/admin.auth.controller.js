// src/controllers/admin.controllers/admin.auth.controller.js
import Session from "../../models/admin.models/Session.model.js";
import { loginAdmin, signupAdmin, setAdminResetEmail, } from "../../services/admin.services/admin.services.js";

export async function postAdminLogin(req, res) {
  try {
    const {email, password} = req.body;
    const { admin } = await loginAdmin({ email, password }); // bcrypt compare etc.

    const sess = await Session.create({
      adminId: admin.id,
      ip: req.ip,
      ua: req.headers["user-agent"] || "",
    });

    res.cookie("nexa_admin_sid", String(sess._id), {
      httpOnly: true,
      secure: false,  // set true in prod (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ ok: true, admin });
  } catch (err) {
    res.status(401).json({ message: err.message || "Unauthorized" });
  }
}

export async function postAdminLogout(req, res) {
  try {
    const sid = req.cookies?.nexa_admin_sid;
    if (sid) await Session.deleteOne({ _id: sid }).catch(() => null);
    res.clearCookie("nexa_admin_sid", { path: "/" });
    res.json({ ok: true });
  } catch {
    res.json({ ok: true });
  }
}

/**
 * POST /api/v1/admin/auth/signup
 * Body: { name, email, password }
 * Creates a new admin (protected upstream in your routes).
 */
export async function postAdminSignup(req, res) {
  try {
    const admin = await signupAdmin(req.body);
    res.status(201).json({ ok: true, admin });
  } catch (err) {
    res.status(400).json({ message: err.message || "Signup failed" });
  }
}

/**
 * POST /api/v1/admin/forgot
 * Body: { email }
 * Sends a reset email using setAdminResetEmail(service).
 */
export async function forgotAdminPassword(req, res) {
  try {
    const email = (req.body?.email || "").trim();
    if (!email) return res.status(400).json({ message: "Email is required" });

    await setAdminResetEmail(email);
    res.json({ ok: true, message: "Password reset email sent (if account exists)" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to send reset email" });
  }
}