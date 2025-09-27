// src/middlewares/admin.middlewares/Admin.Session.Auth.js
import Session from "../../models/admin.models/Session.model.js";
import User from "../../models/admin.models/User.model.js";

export async function adminSessionAuth(req, res, next) {
  try {
    const sid = req.cookies?.nexa_admin_sid;
    if (!sid) return res.status(401).json({ message: "Not authenticated" });

    const session = await Session.findById(sid);
    if (!session) return res.status(401).json({ message: "Invalid session" });

    const admin = await User.findOne({ _id: session.adminId, role: "admin" });
    if (!admin) return res.status(401).json({ message: "Admin not found" });

    if (admin.status !== "active" && admin.status !== "approved") {
      return res.status(403).json({ message: "Admin not active" });
    }

    req.admin = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };
    // keep legacy code that reads req.user working
    req.user = req.admin;
    req.session = { id: session._id.toString() };

    next();
  } catch {
    res.status(401).json({ message: "Auth error" });
  }
}
