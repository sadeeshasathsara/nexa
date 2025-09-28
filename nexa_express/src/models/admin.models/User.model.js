import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role:   { type: String, enum: ["admin","tutor","institution","student"], default: "admin", index: true },
    status: { type: String, enum: ["pending","active","rejected"], default: "pending", index: true },
    meta:   { type: Object, default: {} }
  },
  { timestamps: true}
);

const User = mongoose.model("Admin", UserSchema);
export default User;