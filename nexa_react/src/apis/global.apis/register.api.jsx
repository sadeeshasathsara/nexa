import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";

/**
 * Register API
 *
 * Sends a request to create a new account on the backend.
 * Backend logic includes:
 *  - Validates required fields: firstName, lastName, email, password, tncAccepted
 *  - Role-specific required fields depending on "role" (student, tutor, institution, donor, admin)
 *  - OTP verification (otpVerified must be true)
 *  - Terms & Conditions acceptance (tncAccepted must be true)
 *  - Hashes password before saving
 *  - Creates account in database and returns created account
 *
 * @async
 * @function registerApi
 * @param {Object} payload - Registration data
 *   @param {string} payload.firstName - User's first name
 *   @param {string} payload.lastName - User's last name
 *   @param {string} payload.email - User's email
 *   @param {string} payload.password - User's password
 *   @param {boolean} payload.tncAccepted - Terms & Conditions acceptance
 *   @param {string} payload.role - User role (student, tutor, institution, donor, admin)
 *   @param {boolean} [payload.otpVerified] - Whether OTP was verified
 *   @param {Object} [payload.otherFields] - Any role-specific additional fields
 * @returns {Promise<Object>} Response object
 *   - success: boolean indicating if account creation was successful
 *   - message: descriptive message
 *   - data: created account object (if success)
 *
 * @example
 * const payload = {
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john@example.com",
 *   password: "secret123",
 *   tncAccepted: true,
 *   role: "student",
 *   otpVerified: true
 * };
 *
 * const response = await registerApi(payload);
 * if(response.success) {
 *   console.log("Account created:", response.data);
 * } else {
 *   console.error("Registration failed:", response.message);
 * }
 */
export const registerApi = async (payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/register`, payload, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.error("Register API error:", e);

        // Return backend error if available, otherwise fallback to generic error
        if (e.response?.data) return e.response.data;
        return { success: false, message: e.message };
    }
};
