import { authenticateAccount } from "../../../services/global.services/login.service.js";
import { generateAccountToken } from "../../../services/global.services/jwtToken.service.js";

/**
 * Login Controller
 *
 * Handles user authentication and JWT token generation.
 *
 * Workflow:
 * 1. Validate required fields (email, password).
 * 2. Authenticate user with `authenticateAccount`.
 * 3. Generate JWT token with `generateAccountToken`.
 * 4. Store token in an HTTP-only cookie for secure client usage.
 * 5. Return role-based access URL for frontend redirection.
 *
 * @route POST /api/auth/login
 * @group Authentication - User login and session handling
 * @access Public
 *
 * @param {string} req.body.email - User's registered email
 * @param {string} req.body.password - User's password
 *
 * @returns {object} 200 - Login success response
 * @returns {string} 200.data.url - Role-specific base URL (e.g., /v1/student, /v1/admin, etc.)
 * @returns {Error} 400 - Missing required fields (email or password)
 * @returns {Error} 401 - Authentication failed (invalid credentials)
 *
 * @example Request:
 * {
 *   "email": "user@example.com",
 *   "password": "mypassword123"
 * }
 *
 * @example Success Response:
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "data": {
 *     "url": "/v1/student"
 *   }
 * }
 */
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Step 2: Authenticate user credentials
        const account = await authenticateAccount(email, password);

        // Step 3: Generate JWT token
        const token = generateAccountToken(account);

        // Step 4: Store token in secure HTTP-only cookie
        res.cookie("auth_token", token, {
            httpOnly: true,        // Prevent JS access (XSS protection)
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "strict",    // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days expiration
        });

        // Helper function: Role-based URL mapping
        const findAccessUrl = (account) => {
            switch (account.role) {
                case "student":
                    return "/v1/student";
                case "tutor":
                    return "/v1/tutor";
                case "institution":
                    return "/v1/institution";
                case "donor":
                    return "/v1/donor";
                case "admin":
                    return "/v1/admin";
                default:
                    return null;
            }
        };

        // Step 5: Send success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                url: findAccessUrl(account),
            }
        });
    } catch (error) {
        // Handle authentication failure
        res.status(401).json({
            success: false,
            message: error.message || "Authentication failed",
        });
    }
};
