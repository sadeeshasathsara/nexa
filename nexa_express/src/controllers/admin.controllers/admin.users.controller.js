// src/controllers/admin.controllers/admin.users.controller.js
import {
  listUsersService,
  setUserSuspensionService,
} from "../../services/admin.services/admin.users.service.js";

export async function listUsersController(req, res) {
  try {
    const { q, role, status, page, limit, sort } = req.query;
    const data = await listUsersService({ q, role, status, page, limit, sort });
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("listUsersController error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
}

export async function toggleUserSuspensionController(req, res) {
  try {
    const { id } = req.params;
    const { suspended } = req.body; // boolean
    if (typeof suspended === "undefined") {
      return res.status(400).json({ success: false, message: "`suspended` is required" });
    }

    const data = await setUserSuspensionService(id, !!suspended);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("toggleUserSuspensionController error:", err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
}
