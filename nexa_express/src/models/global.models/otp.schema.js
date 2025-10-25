import mongoose from "mongoose";

/**
 * OTP Schema
 *
 * Represents a One-Time Password (OTP) request for a user.
 * Used for login, registration, or verification workflows.
 * Automatically expires after 1 hour to prevent reuse.
 *
 * Fields:
 * - email: User email requesting OTP (required)
 * - ip: Client IP address associated with the request (required)
 * - otp: The generated OTP string (required)
 * - verified: Boolean flag indicating if OTP has been successfully verified (default: false)
 * - count: Number of OTP requests made by this email + IP combo (default: 0)
 * - createdAt: Timestamp of OTP creation, automatically deleted after 1 hour
 */
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // Must provide email to track OTP requests
    },
    ip: {
        type: String,
        required: true, // Store client IP for rate limiting
    },
    otp: {
        type: String,
        required: true, // Generated OTP code
    },
    verified: {
        type: Boolean,
        default: false, // Mark as true when OTP is verified
    },
    count: {
        type: Number,
        default: 0, // Track number of OTP requests per email+IP
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // Document auto-deletes after 1 hour
    }
});

/**
 * OTP Model
 *
 * Provides CRUD access to the 'otps' collection.
 * Example usage:
 * const otpEntry = await Otp.create({ email, ip, otp });
 * 
 * Automatically handles expiration via `createdAt.expires`.
 */
const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
