import mongoose from "mongoose";

function getCollections() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database not ready");
  return {
    accounts: db.collection("accounts"),
    tutorDetails: db.collection("tutordetails"),
  };
}

/* 🟡 Get all tutors waiting for approval */
export async function getPendingTutors() {
  const { accounts } = getCollections();
  return accounts
    .find({ role: "tutor", approvalStatus: { $in: ["pending", null] } })
    .project({ firstName: 1, lastName: 1, email: 1, createdAt: 1, approvalStatus: 1 })
    .sort({ createdAt: -1 })
    .toArray();
}

/* 🟢 Get approved tutors with details joined */
export async function getApprovedTutors(limit = 20) {
  const { accounts, tutorDetails } = getCollections();
  return accounts.aggregate([
    { $match: { role: "tutor", approvalStatus: "approved" } },
    { $sort: { approvedAt: -1, _id: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "tutordetails",
        localField: "_id",
        foreignField: "accountId",
        as: "details",
      },
    },
    { $addFields: { details: { $arrayElemAt: ["$details", 0] } } },
    {
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        approvedAt: 1,
        "details.phoneNumber": 1,
        "details.educationLevel": 1,
        "details.subjects": 1,
        "details.preferredGradeLevels": 1,
      },
    },
  ]).toArray();
}

/* 🔁 Approve / Reject Tutor by ID */
export async function updateTutorApproval({ accountId, action, reason }) {
  const { accounts } = getCollections();
  if (!["approve", "reject"].includes(action)) throw new Error("Invalid action");

  const status = action === "approve" ? "approved" : "rejected";
  const result = await accounts.updateOne(
    { _id: new mongoose.Types.ObjectId(accountId), role: "tutor" },
    {
      $set: {
        approvalStatus: status,
        approvalReason: reason || null,
        approvedAt: action === "approve" ? new Date() : null,
      },
    }
  );

  if (result.matchedCount === 0) throw new Error("Tutor not found");
  return await accounts.findOne(
    { _id: new mongoose.Types.ObjectId(accountId) },
    { projection: { firstName: 1, lastName: 1, email: 1, approvalStatus: 1, approvedAt: 1 } }
  );
}

