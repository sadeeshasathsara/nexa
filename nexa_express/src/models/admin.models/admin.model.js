// src/models/admin.models/admin.model.js
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // keep if you use name at signup
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExp: { type: Date },
  },
  { timestamps: true }
);

// IMPORTANT: guard against OverwriteModelError
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
