// src/controllers/admin.controllers/admin.dashboard.controller.js
import { getCoursesTimeSeries } from "../../services/admin.services/admin.dashboard.service.js";

export async function getCoursesChartController(req, res) {
  try {
    const days = Number(req.query.days || 12);
    const data = await getCoursesTimeSeries(days);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("getCoursesChartController error:", err);
    res.status(500).json({ success: false, message: "Failed to load courses chart" });
  }
}
