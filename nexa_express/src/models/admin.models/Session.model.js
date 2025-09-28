import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ip: String,
    ua: String,
  },
  { timestamps: true }
);

// 👇 default export (NOT a named export)
export default mongoose.model("AdminSession", SessionSchema);
