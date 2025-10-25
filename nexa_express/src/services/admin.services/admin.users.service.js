// src/services/admin.services/admin.users.service.js
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

/**
 * List users from the 'accounts' collection with filters and pagination.
 * Supports: q (name/email), role, status (Active|Suspended), page, limit, sort
 */
export async function listUsersService({
  q = "",
  role = "",
  status = "",
  page = 1,
  limit = 20,
  sort = "-createdAt",
}) {
  const db = mongoose.connection.db;
  const col = db.collection("accounts");

  const match = {};
  if (role) match.role = role; // 'student' | 'tutor' | 'institution' | 'admin' etc.

  // status mapping — we’ll use a simple boolean field `suspended`
  if (status === "Active") match.suspended = { $ne: true };
  if (status === "Suspended") match.suspended = true;

  if (q) {
    match.$or = [
      { firstName: { $regex: q, $options: "i" } },
      { lastName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ];
  }

  // sort parser
  const sortStage = {};
  if (sort) {
    const dir = sort.startsWith("-") ? -1 : 1;
    const key = sort.replace(/^-/, "");
    sortStage[key] = dir;
  } else {
    sortStage.createdAt = -1;
  }

  const skip = (Math.max(+page || 1, 1) - 1) * Math.max(+limit || 20, 1);
  const $facet = {
    rows: [
      { $match: match },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: Math.max(+limit || 20, 1) },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          role: 1,
          createdAt: 1,
          suspended: { $ifNull: ["$suspended", false] },
          // These fields might not exist; keep them optional
          courses: { $ifNull: ["$coursesCount", 0] },
          violations: { $ifNull: ["$violations", 0] },
        },
      },
    ],
    meta: [
      { $match: match },
      { $count: "total" },
    ],
  };

  const [res] = await col.aggregate([{ $facet }]).toArray();

  const rows = (res?.rows || []).map((u) => ({
    _id: u._id,
    name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "—",
    email: u.email,
    role:
      u.role === "student"
        ? "Student"
        : u.role === "tutor"
        ? "Tutor"
        : u.role === "institution"
        ? "Institution"
        : "Admin",
    status: u.suspended ? "Suspended" : "Active",
    courses: u.courses || 0,
    violations: u.violations || 0,
    createdAt: u.createdAt,
  }));

  const total = res?.meta?.[0]?.total || 0;

  return {
    rows,
    total,
    page: +page || 1,
    limit: +limit || 20,
  };
}

/** Toggle/Set suspension status on a user document */
export async function setUserSuspensionService(userId, suspended) {
  const db = mongoose.connection.db;
  const col = db.collection("accounts");

  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(String(userId)) },
    { $set: { suspended: !!suspended } },
    { returnDocument: "after" }
  );

  return {
    _id: result?.value?._id,
    suspended: !!result?.value?.suspended,
  };
}
