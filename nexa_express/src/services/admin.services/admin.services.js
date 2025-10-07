// src/services/admin.services/admin.services.js
import mongoose from "mongoose";
import User from "../../models/admin.models/User.model.js";
import { comparePassword, signJWT, hashPassword } from "../../utils/admin.utils/admin.utils.js";

/* ----------------------------- Helpers ----------------------------- */

const STATUS_MAP = { approve: "approved", reject: "rejected" };

function oid(id) {
  try { return new mongoose.Types.ObjectId(id); } catch { return null; }
}

function normEmail(email) {
  return (email || "").toString().trim().toLowerCase();
}

function getCols() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("DB not ready");
  return {
    tutors: db.collection("tutors_staging"),
    institutions: db.collection("institutions_staging"),
  };
}

/* ----------------------------- Auth (no mail here) ----------------------------- */

export async function loginAdmin({ email, password }) {
  const admin = await User.findOne({ email: normEmail(email) });
  if (!admin) throw new Error("Admin not found");
  if (admin.status !== "active") throw new Error("Admin account is not active");

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

export async function signupAdmin({ name, email, password }) {
  const em = normEmail(email);
  const exists = await User.findOne({ email: em });
  if (exists) throw new Error("Email already in use");

  const passwordHash = await hashPassword(password);
  const admin = await User.create({ name, email: em, passwordHash, role: "admin", status: "active" });

  return { id: admin._id, name: admin.name, email: admin.email, role: admin.role, status: admin.status };
}

export async function getAdminById(id) {
  const admin = await User.findOne({ _id: id, role: "admin" });
  if (!admin) throw new Error("Admin not found");
  return { id: admin._id, name: admin.name, email: admin.email, role: admin.role, status: admin.status };
}

export async function updateAdminById(id, { name, email }) {
  const update = {};
  if (name) update.name = name;
  if (email) {
    const em = normEmail(email);
    const exists = await User.findOne({ email: em, _id: { $ne: id } });
    if (exists) throw new Error("Email already in use");
    update.email = em;
  }
  if (!Object.keys(update).length) throw new Error("Nothing to update");

  const admin = await User.findOneAndUpdate({ _id: id, role: "admin" }, { $set: update }, { new: true });
  if (!admin) throw new Error("Admin not found");
  return { id: admin._id, name: admin.name, email: admin.email, role: admin.role, status: admin.status };
}

export async function changeAdminPassword(id, { currentPassword, newPassword }) {
  const admin = await User.findOne({ _id: id, role: "admin" });
  if (!admin) throw new Error("Admin not found");

  const ok = await comparePassword(currentPassword, admin.passwordHash);
  if (!ok) throw new Error("Current password incorrect");

  const passwordHash = await hashPassword(newPassword);
  await User.updateOne({ _id: id }, { $set: { passwordHash } });
  return true;
}

/* ----------------------------- Admin actions ----------------------------- */

export async function changeStatus({ type, action, reason, id, email }) {
  const { tutors, institutions } = getCols();
  const status = STATUS_MAP[action];
  if (!status) throw new Error("Invalid action");

  if (!!id === !!email) throw new Error("Provide exactly one of: id OR email");

  const col = type === "tutor" ? tutors : type === "institution" ? institutions : null;
  if (!col) throw new Error("Invalid type");

  let filter;
  if (id) {
    const _id = oid(id);
    filter = _id ? { $or: [{ _id }, { _id: id }] } : { _id: id };
  } else {
    const em = normEmail(email);
    filter = { email: new RegExp(`^${em}$`, "i") };
  }

  const now = new Date();
  const set = { status, "meta.decisionReason": reason ?? null };
  if (status === "approved") set.approvedAt = now;

  const updateDoc = { $set: set };
  if (status === "rejected") updateDoc.$unset = { approvedAt: "" };

  const update = await col.updateOne(filter, updateDoc);
  if (update.modifiedCount === 0) {
    throw new Error(id ? `${type} with id ${id} not found!` : `${type} with email ${email} not found`);
  }

  return await col.findOne(filter);
}

export async function listPending({ type }) {
  const { tutors, institutions } = getCols();
  if (type === "tutor") return tutors.find({ status: "pending" }).sort({ _id: -1 }).toArray();
  if (type === "institution") return institutions.find({ status: "pending" }).sort({ _id: -1 }).toArray();
  throw new Error("Invalid type");
}

export async function listApproved({ type, limit = 5 }) {
  const { tutors, institutions } = getCols();
  const lim = Number(limit) || 5;

  if (type === "tutor") {
    return tutors.find({ status: "approved" }).sort({ approvedAt: -1, _id: -1 }).limit(lim).toArray();
  }
  if (type === "institution") {
    return institutions.find({ status: "approved" }).sort({ approvedAt: -1, _id: -1 }).limit(lim).toArray();
  }
  throw new Error("Invalid type");
}

/* ---- tiny aliases expected by some controllers ---- */
export async function getMe(id) { return getAdminById(id); }
export async function patchMe(id, data) { return updateAdminById(id, data); }
export async function patchMyPassword(id, data) { return changeAdminPassword(id, data); }
