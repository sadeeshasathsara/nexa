// src/routes/admin.routes.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Import transporter properly
import transporter from "../../config/admin.config/mail.config.js";

// Auth controllers
import {
  postAdminLogin,
  postAdminLogout,
  postAdminSignup,
  forgotPassword, // <-- use this handler for /forgot
} from "../../controllers/admin.controllers/admin.auth.controller.js";

// Approvals
import {
  getPending,
  getApproved,
  patchDecision,
} from "../../controllers/admin.controllers/admin.approvals.controller.js";

// Profile
import {
  getMe,
  patchMe,
  patchMyPassword,
} from "../../controllers/admin.controllers/admin.me.controller.js";

// Validation
import { requireFields } from "../../middlewares/admin.middlewares/validate.middleware.js";

// Session auth (cookies)
import { adminSessionAuth } from "../../middlewares/admin.middlewares/Admin.Session.Auth.js";

const router = express.Router();

// Router-level cookie parser
router.use(cookieParser());

// Force admin-scope CORS headers (overwrite any global "*")
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204); // preflight OK
  next();
});

// CORS configuration
const corsCfg = cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
router.use(corsCfg);

/* ------------------------- Public auth routes ------------------------- */
router.post("/auth/login", requireFields(["email", "password"]), postAdminLogin);

router.post("/auth/logout", postAdminLogout);
router.post("/auth/signup", requireFields(["name", "email", "password"]), postAdminSignup);

// Forgot password
router.post("/forgot", forgotPassword);

/* ----------------------- Protected (session required) ----------------------- */
router.get("/me", adminSessionAuth, getMe);
router.patch("/me", adminSessionAuth, patchMe);
router.patch("/me/password",adminSessionAuth,requireFields(["currentPassword", "newPassword"]),patchMyPassword);

router.get("/pending", adminSessionAuth, getPending);
router.get("/approved", adminSessionAuth, getApproved);
router.patch("/decision/:type",adminSessionAuth,requireFields(["action"]),patchDecision);

// Simple email test route - add this
router.post("/test-email-simple", async (req, res) => {
  try {
    console.log("🧪 Testing email configuration...");
    console.log("MAIL_USER:", process.env.MAIL_USER);
    
    const testEmail = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: "nexa6764@gmail.com",
      subject: "NEXA Email Test - " + new Date().toISOString(),
      text: "This is a test email from NEXA Admin system",
      html: "<p>This is a <strong>test email</strong> from NEXA Admin system</p>",
    });

    console.log("✅ Test email sent successfully! Message ID:", testEmail.messageId);
    res.json({ 
      success: true, 
      message: "Test email sent successfully!",
      messageId: testEmail.messageId 
    });
    
  } catch (error) {
    console.log("❌ Test email FAILED:", error.message);
    console.log("Error details:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code 
    });
  }
});

export default router;
