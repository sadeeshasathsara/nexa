import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Auth
import {
  postAdminLogin,
  postAdminLogout,
  postAdminSignup,
  forgotAdminPassword,
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

// Also let cors() set the same (harmless if duplicated)
const corsCfg = cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
router.use(corsCfg);

// Public auth

router.post("/auth/logout", postAdminLogout);
router.post("/auth/signup", requireFields(["name", "email", "password"]), postAdminSignup);
router.post("/forgot", forgotAdminPassword);

// Protected (cookie session required)
router.get("/me", adminSessionAuth, getMe);
router.patch("/me", adminSessionAuth, patchMe);
router.patch(
  "/me/password",
  adminSessionAuth,
  requireFields(["currentPassword", "newPassword"]),
  patchMyPassword
);

router.get("/pending", adminSessionAuth, getPending);
router.get("/approved", adminSessionAuth, getApproved);
router.patch(
  "/decision/:type",
  adminSessionAuth,
  requireFields(["action"]),
  patchDecision
);

export default router;
