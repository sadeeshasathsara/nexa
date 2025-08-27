import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Auto delete after 1 hour
    }
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
