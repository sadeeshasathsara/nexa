// src/services/admin.services/admin.dashboard.service.js
import mongoose from "mongoose";
import Course from "../../models/tutor.models/course.model.js"; // <- use the tutor course model you already have

// Utility: format date to YYYY-MM-DD
const dayStr = (d) => new Date(d).toISOString().slice(0, 10);

/**
 * Return last N days of published courses created per day
 * Output: [{ name: 'YYYY-MM-DD', courses: <count> }, ...]
 */
export async function getCoursesTimeSeries(days = 12) {
  const since = new Date();
  since.setDate(since.getDate() - (days - 1));
  since.setHours(0, 0, 0, 0);

  const pipeline = [
    { $match: { createdAt: { $gte: since } } }, // optionally add { status: 'published' }
    {
      $group: {
        _id: {
          y: { $year: "$createdAt" },
          m: { $month: "$createdAt" },
          d: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromParts: {
            year: "$_id.y",
            month: "$_id.m",
            day: "$_id.d",
          },
        },
        count: 1,
      },
    },
    { $sort: { date: 1 } },
  ];

  const rows = await Course.aggregate(pipeline);

  // Fill empty days with 0
  const out = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    const key = dayStr(d);
    const found = rows.find((r) => dayStr(r.date) === key);
    out.push({ name: key, courses: found ? found.count : 0 });
  }
  return out;
}
