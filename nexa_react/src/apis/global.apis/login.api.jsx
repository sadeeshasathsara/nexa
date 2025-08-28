import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";

/**
 * Login API
 *
 * Sends a login request to the backend and handles response.
 * - Sends user credentials to the `/login` endpoint.
 * - Includes cookies (withCredentials: true) for session/JWT handling.
 * - Returns the response data or error message in a consistent object.
 *
 * @async
 * @function loginApi
 * @param {Object} payload - Login credentials
 *   @param {string} payload.email - User's email
 *   @param {string} payload.password - User's password
 * @returns {Promise<Object>} Response object from backend
 *   - success: boolean indicating login success
 *   - message: descriptive message
 *   - data: optional, account info or redirect URL
 *
 * @example
 * const payload = { email: "john@example.com", password: "secret123" };
 * const response = await loginApi(payload);
 * if(response.success) {
 *   console.log("Login successful:", response.data);
 * } else {
 *   console.error("Login failed:", response.message);
 * }
 */
export const loginApi = async (payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, payload, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.error("Login API error:", e);

        // Return backend error if available, otherwise fallback to generic error
        if (e.response?.data) {
            return e.response.data;
        }
        return { success: false, message: e.message };
    }
};
