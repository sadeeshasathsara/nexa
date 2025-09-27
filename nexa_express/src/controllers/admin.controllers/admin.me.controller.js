// src/controllers/admin.controllers/admin.me.controller.js
import { getAdminById, updateAdminById, changeAdminPassword, } from "../../services/admin.services/admin.services.js";

// GET /api/v1/admin/me
export async function getMe(req, res) {
  try {
    const admin = await getAdminById(req.user.id);
    res.json({ admin });
  } catch (err) {
    res.status(404).json({ message: err.message || "Not found" });
  }
}

// PATCH /api/v1/admin/me   (name, email)
export async function patchMe(req, res) {
  try {
    const { name, email } = req.body;
    const admin = await updateAdminById(req.user.id, { name, email });
    res.json({ message: "Updated", admin });
  } catch (err) {
    res.status(400).json({ message: err.message || "Update failed" });
  }
}

// PATCH /api/v1/admin/me/password   (currentPassword, newPassword)
export async function patchMyPassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    await changeAdminPassword(req.user.id, { currentPassword, newPassword });
    res.json({ message: "Password updated" });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || "Password update failed" });
  }
}
