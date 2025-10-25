import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Auth
import {
  postAdminLogin,
  postAdminLogout,
  postAdminSignup,
  forgotAdminPassword,
} from "../../controllers/admin.controllers/admin.auth.controller.js";

// Profile
import {
  getMe,
  patchMe,
  patchMyPassword,
} from "../../controllers/admin.controllers/admin.me.controller.js";

// ✅ Tutor Approvals (from the new service)
import {
  getPendingTutorsController,
  getApprovedTutorsController,
  updateTutorApprovalController,
} from "../../controllers/admin.controllers/admin.tutorApproval.controller.js";

// Validation
import { requireFields } from "../../middlewares/admin.middlewares/validate.middleware.js";

// Session auth (cookies)
import { adminSessionAuth } from "../../middlewares/admin.middlewares/Admin.Session.Auth.js";

// Analytics
import {
  getSummary,
  getQuizAttemptsTable,
  getDonationsTable,
  getCoursesTable,
  downloadQuizAttemptsPDF,
  downloadDonationsPDF,
  downloadCoursesPDF,
} from "../../controllers/admin.controllers/admin.analytics.controller.js";

import { getCoursesChartController } from "../../controllers/admin.controllers/admin.dashboard.controller.js";

import {
  listUsersController,
  toggleUserSuspensionController,
} from "../../controllers/admin.controllers/admin.users.controller.js";

const router = express.Router();

// Router-level cookie parser
router.use(cookieParser());

// Force admin-scope CORS headers
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const corsCfg = cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
router.use(corsCfg);

/* -----------------------------
 * Public Admin Auth Routes
 * --------------------------- */
router.post("/auth/logout", postAdminLogout);
router.post("/auth/signup", requireFields(["name", "email", "password"]), postAdminSignup);
router.post("/forgot", forgotAdminPassword);

// ✅ login route if missing
router.post("/auth/login", requireFields(["email", "password"]), postAdminLogin);

/* -----------------------------
 * Protected Admin Routes (session required)
 * --------------------------- */
router.get("/me", adminSessionAuth, getMe);
router.patch("/me", adminSessionAuth, patchMe);
router.patch(
  "/me/password",
  adminSessionAuth,
  requireFields(["currentPassword", "newPassword"]),
  patchMyPassword
);

/* -----------------------------
 * Tutor Approval Routes
 * --------------------------- */

// 🟡 List pending tutor accounts (from accounts collection)
router.get("/tutors/pending", adminSessionAuth, getPendingTutorsController);

// 🟢 List approved tutors (joined with tutorDetails)
router.get("/tutors/approved", adminSessionAuth, getApprovedTutorsController);

// 🔁 Approve or reject a tutor (by accountId)
router.patch(
  "/tutors/decision/:id",
  adminSessionAuth,
  requireFields(["action"]),
  updateTutorApprovalController
);

// ✅ Fetch total student count
router.get("/students/count", async (req, res) => {
  try {
    console.log("Counting students…");
    const db = mongoose.connection.db;
    const accounts = db.collection("accounts");
    const count = await accounts.countDocuments({ role: "student" });
    
    res.status(200).json({ success: true, count });
  } catch (err) {
    console.error("Error fetching student count:", err);
    res.status(500).json({ success: false, message: "Failed to count students" });
  }
});

/* -----------------------------
 * Admin Analytics Routes
 * Base: /api/.../v1/admin/analytics/*
 * --------------------------- */
router.get("/analytics/summary",       adminSessionAuth, getSummary);
router.get("/analytics/quiz-attempts", adminSessionAuth, getQuizAttemptsTable);
router.get("/analytics/donations",     adminSessionAuth, getDonationsTable);
router.get("/analytics/courses",       adminSessionAuth, getCoursesTable);

router.get("/analytics/quiz-attempts/pdf", adminSessionAuth, downloadQuizAttemptsPDF);
router.get("/analytics/donations/pdf",     adminSessionAuth, downloadDonationsPDF);
router.get("/analytics/courses/pdf",       adminSessionAuth, downloadCoursesPDF);
// ...inside the protected/admin router area (like other dashboard routes)
router.get("/dashboard/courses-chart", /* adminSessionAuth, */ getCoursesChartController);

/* -----------------------------
 * User Management
 * Base: /api/.../v1/admin/users
 * --------------------------- */
router.get("/users", /* adminSessionAuth, */ listUsersController);
router.patch("/users/:id/suspend", /* adminSessionAuth, */ toggleUserSuspensionController);


export default router;


