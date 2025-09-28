import axios from "axios";

/**
 * Middleware: verifyCaptcha
 *
 * Validates Google reCAPTCHA tokens to protect endpoints from bot/spam requests.
 *
 * Workflow:
 * 1. Extract `captchaToken` from request body.
 * 2. Send verification request to Google reCAPTCHA API.
 * 3. Check API response:
 *    - If valid → call `next()` and continue request lifecycle.
 *    - If invalid → return `400 Bad Request`.
 *
 * @middleware
 * @group Security - Captcha Verification
 * @access Public (but typically used in login/register/otp routes)
 *
 * @param {string} req.body.captchaToken - Client-side reCAPTCHA token
 *
 * @returns {void} Calls next() if verification succeeds.
 * @returns {Error} 400 - Missing or invalid captcha token
 * @returns {Error} 500 - Internal server error
 *
 * @example Request:
 * {
 *   "email": "user@example.com",
 *   "password": "mypassword",
 *   "captchaToken": "03AGdBq25..."
 * }
 *
 * @example Error Response (Invalid Captcha):
 * {
 *   "message": "Captcha verification failed",
 *   "error": {
 *     "success": false,
 *     "error-codes": ["invalid-input-response"]
 *   }
 * }
 */
export const verifyCaptcha = async (req, res, next) => {
    try {
        const { captchaToken } = req.body;

        // Step 1: Ensure captcha token exists
        if (!captchaToken) {
            return res.status(400).json({ message: "Captcha token is missing" });
        }

        // Step 2: Build Google reCAPTCHA verification URL
        const secret = process.env.RECAPTCHA_SECRET_KEY;
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`;

        // Step 3: Call Google reCAPTCHA API
        const response = await axios.post(verifyUrl);

        // Step 4: Validate reCAPTCHA response
        if (!response.data.success) {
            return res.status(400).json({
                message: "Captcha verification failed",
                error: response.data, // Include only relevant error info
            });
        }

        // Step 5: Continue request lifecycle
        next();
    } catch (e) {
        console.error("Captcha verification error:", e.message);

        // Handle unexpected errors
        res.status(500).json({ message: "Internal server error" });
    }
};
