import Otp from "../../models/global.models/otp.schema.js";

/**
 * Middleware: otpLimiter
 *
 * Restricts the number of OTP requests a user can make within a defined time window.
 * - Limit: 5 OTP requests per hour for a given email + client IP.
 * - Helps prevent brute-force or abuse of OTP endpoints.
 *
 * Workflow:
 * 1. Extract email from request body.
 * 2. Safely determine client IP address (supports proxies/load balancers).
 * 3. Lookup OTP record for the email (normalized to lowercase).
 * 4. If request count ≥ 5 → block with HTTP 429 (Too Many Requests).
 * 5. Otherwise → attach client IP to request and continue.
 *
 * @middleware
 * @group Security - Rate Limiting
 * @access Public (used on OTP send endpoints)
 *
 * @param {string} req.body.email - Email address requesting OTP
 * @param {string} req.clientIp - (Injected) Client IP address extracted from headers or socket
 *
 * @returns {void} Calls next() if request is allowed.
 * @returns {Error} 400 - Missing email in request
 * @returns {Error} 429 - Too many OTP requests in 1 hour
 * @returns {Error} 500 - Internal server error
 *
 * @example Error Response (Missing Email):
 * {
 *   "success": false,
 *   "message": "Email is required"
 * }
 *
 * @example Error Response (Rate Limit Exceeded):
 * {
 *   "success": false,
 *   "message": "Too many OTP requests. Please try again after 1 hour."
 * }
 */
const otpLimiter = async (req, res, next) => {
    try {
        // Step 1: Ensure email is provided
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Step 2: Safely determine client IP
        const clientIp =
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // if behind proxy/load balancer
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            req.ip;

        // Step 3: Find OTP record for this email (normalize email to lowercase)
        const otpDoc = await Otp.findOne({ email: email.toLowerCase() });

        // Step 4: Enforce rate limit
        if (otpDoc && otpDoc.count >= 5) {
            return res.status(429).json({
                success: false,
                message: "Too many OTP requests. Please try again after 1 hour.",
            });
        }

        // Step 5: Attach clientIp for later use (OTP service)
        req.clientIp = clientIp;

        // Step 6: Continue request lifecycle
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default otpLimiter;
