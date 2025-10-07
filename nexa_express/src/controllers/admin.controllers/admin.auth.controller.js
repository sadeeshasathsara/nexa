// src/controllers/admin.controllers/admin.auth.controller.js
import {
  loginAdmin,
  signupAdmin,
  getMe as getMeSvc,
  patchMe as patchMeSvc,
  patchMyPassword as patchMyPasswordSvc,
} from "../../services/admin.services/admin.services.js";

import { sendResetPasswordEmail } from "../../services/admin.services/admin.auth.service.js";

/* ----------- Auth endpoints ----------- */

export async function postAdminLogin(req, res) {
  try {
    const { email, password } = req.body || {};
    const out = await loginAdmin({ email, password });
    // If you use cookie session, set it here. For now just return data.
    return res.json(out);
  } catch (err) {
    return res.status(400).json({ message: err.message || "Login failed" });
  }
}

export async function postAdminLogout(_req, res) {
  // If using sessions/cookies, clear them here.
  return res.json({ message: "Logged out" });
}

export async function postAdminSignup(req, res) {
  try {
    const { name, email, password } = req.body || {};
    const admin = await signupAdmin({ name, email, password });
    return res.json({ message: "Admin created", admin });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Signup failed" });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ message: "Email is required" });
    const msg = await sendResetPasswordEmail(email);
    return res.json({ message: msg });
  } catch (err) {
    const known = ["Admin not found", "Mail config missing"];
    const status = known.includes(err.message) ? 400 : 500;
    return res.status(status).json({ message: err.message || "Failed to send reset email" });
  }
}

/* ----------- Me/Profile endpoints (if you call them) ----------- */

export async function getAdminMe(req, res) {
  try {
    const id = req.admin?.id || req.user?.id; // depends on your auth middleware
    const me = await getMeSvc(id);
    return res.json(me);
  } catch (err) {
    return res.status(400).json({ message: err.message || "Failed to fetch profile" });
  }
}

export async function patchAdminMe(req, res) {
  try {
    const id = req.admin?.id || req.user?.id;
    const me = await patchMeSvc(id, req.body || {});
    return res.json({ message: "Updated", me });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Update failed" });
  }
}

export async function patchAdminPassword(req, res) {
  try {
    const id = req.admin?.id || req.user?.id;
    const ok = await patchMyPasswordSvc(id, req.body || {});
    return res.json({ message: ok ? "Password changed" : "No change" });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Password change failed" });
  }
}
