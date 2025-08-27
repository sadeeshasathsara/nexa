import Otp from "../../models/global.models/otp.schema.js";

/**
 * OTP Request Limiter Middleware
 * - Allows only 5 OTP requests per hour for a given email + IP combo.
 */
const otpLimiter = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // ✅ Safely get client IP
        const clientIp =
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // if behind proxy/load balancer
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            req.ip;

        // Find OTP record for this email + ip
        const otpDoc = await Otp.findOne({ email: email.toLowerCase() });

        if (otpDoc && otpDoc.count >= 5) {
            return res.status(429).json({
                success: false,
                message: "Too many OTP requests. Please try again after 1 hour.",
            });
        }

        req.clientIp = clientIp;

        // Continue if limit not reached
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default otpLimiter;
