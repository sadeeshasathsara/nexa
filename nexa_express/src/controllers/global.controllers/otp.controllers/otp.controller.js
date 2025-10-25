import { sendOtp, validateOtp } from "../../../services/global.services/otp.service.js";

/**
 * OTP Controller - Send OTP
 *
 * Handles OTP (One-Time Password) generation and delivery.
 *
 * Workflow:
 * 1. Validate required field (email).
 * 2. Call `sendOtp` service with email and client IP.
 * 3. Respond with success/failure status.
 *
 * @route POST /api/auth/otp/send
 * @group Authentication - OTP related endpoints
 * @access Public
 *
 * @param {string} req.body.email - User email address
 * @param {string} [req.body.clientIp] - (Optional) Client IP for rate limiting/security
 *
 * @returns {object} 200 - OTP sent successfully
 * @returns {Error} 400 - Missing email field
 * @returns {Error} 500 - Failed to send OTP (server error)
 *
 * @example Request:
 * {
 *   "email": "user@example.com"
 * }
 *
 * @example Success Response:
 * {
 *   "success": true,
 *   "message": "OTP sent successfully"
 * }
 */
export const otpController = async (req, res) => {
    const { email, clientIp } = req.body;

    // Step 1: Check required field
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        // Step 2: Call service to send OTP
        await sendOtp(email, clientIp);

        // Step 3: Return success response
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            success: false,
            message: error.message || "Failed to send OTP",
        });
    }
};

/**
 * OTP Controller - Validate OTP
 *
 * Handles OTP verification for user authentication or account actions.
 *
 * Workflow:
 * 1. Validate required fields (email, otp).
 * 2. Call `validateOtp` service function.
 * 3. Return success if OTP is valid, or error if invalid/expired.
 *
 * @route POST /api/auth/otp/validate
 * @group Authentication - OTP related endpoints
 * @access Public
 *
 * @param {string} req.body.email - User email address
 * @param {string} req.body.otp - One-time password to validate
 *
 * @returns {object} 200 - OTP validated successfully
 * @returns {Error} 400 - Missing required fields or invalid OTP
 * @returns {Error} 500 - Internal server error
 *
 * @example Request:
 * {
 *   "email": "user@example.com",
 *   "otp": "123456"
 * }
 *
 * @example Success Response:
 * {
 *   "success": true,
 *   "message": "OTP verified successfully"
 * }
 */
export const validateOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Step 1: Check required fields
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        // Step 2: Validate OTP using service
        const result = await validateOtp(email, otp);

        // Step 3: Handle invalid/expired OTP
        if (!result.success) {
            return res.status(400).json(result);
        }

        // Step 4: Return success response
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error("OTP verification error:", error);

        // Handle unexpected errors
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
