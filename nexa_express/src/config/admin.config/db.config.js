import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("[DB] MONGO_URI not set");
  process.exit(1);
}

let connected = false;

export async function connectDB() {
  if (connected) return;
  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
    connected = true;
    console.log("[DB] Connected to MongoDB Atlas");
  } catch (err) {
    console.error("[DB] Connection error:", err.message);
    process.exit(1);
  }
}

// auto-connect on import
await connectDB();
