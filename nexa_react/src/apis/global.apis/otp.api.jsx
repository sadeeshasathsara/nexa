import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";

/**
 * Send OTP API
 *
 * Sends a request to generate and send an OTP to the user's email.
 * - Includes cookies for session handling (`withCredentials: true`).
 * - Returns the backend response containing success status and message.
 *
 * @async
 * @function otpApi
 * @param {Object} payload - Request payload
 *   @param {string} payload.email - User's email
 *   @param {string} [payload.clientIp] - Optional client IP for rate limiting
 * @returns {Promise<Object>} Response object
 *   - success: boolean indicating if OTP was sent
 *   - message: descriptive message
 *
 * @example
 * const response = await otpApi({ email: "john@example.com" });
 * if(response.success) console.log("OTP sent successfully");
 * else console.error(response.message);
 */
export const otpApi = async (payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/otp`, payload, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.error("OTP API error:", e);
        if (e.response?.data) return e.response.data;
        return { success: false, message: e.message };
    }
};

/**
 * Validate OTP API
 *
 * Sends a request to validate a user-submitted OTP.
 * - Compares OTP against backend records.
 * - Returns success status and descriptive message.
 *
 * @async
 * @function validateOtpApi
 * @param {Object} payload - Request payload
 *   @param {string} payload.email - User's email
 *   @param {string} payload.otp - OTP code submitted by the user
 * @returns {Promise<Object>} Response object
 *   - success: boolean indicating OTP validation result
 *   - message: descriptive message
 *
 * @example
 * const response = await validateOtpApi({ email: "john@example.com", otp: "482915" });
 * if(response.success) console.log("OTP verified successfully");
 * else console.error(response.message);
 */
export const validateOtpApi = async (payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/otp-validate`, payload, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.error("Validate OTP API error:", e);
        if (e.response?.data) return e.response.data;
        return { success: false, message: e.message };
    }
};
