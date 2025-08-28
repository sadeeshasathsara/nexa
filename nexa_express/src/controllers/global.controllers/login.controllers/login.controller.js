import { authenticateAccount } from "../../../services/global.services/login.service.js";
import { generateAccountToken } from "../../../services/global.services/jwtToken.service.js";

/**
 * Login Controller
 *
 * Handles user login by:
 * 1. Validating credentials with authenticateAccount.
 * 2. Generating a JWT token using generateAccountToken.
 * 3. Returning the authenticated account (without password) and setting token in cookies.
 *
 * @route POST /api/auth/login
 * @access Public
 */
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Step 1: Authenticate account
        const account = await authenticateAccount(email, password);

        // Step 2: Generate JWT token
        const token = generateAccountToken(account);

        // Step 3: Set token in cookie (httpOnly for security)
        res.cookie("auth_token", token, {
            httpOnly: true,        // cannot be accessed via JS
            secure: process.env.NODE_ENV === "production", // only https in prod
            sameSite: "strict",    // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        const findAccessUrl = (account) => {
            switch (account.role) {
                case 'student':
                    return '/v1/student';
                case 'tutor':
                    return '/v1/tutor';
                case 'institution':
                    return '/v1/institution';
                case 'donor':
                    return '/v1/donor';
                case 'admin':
                    return '/v1/admin';
                default:
                    return null;
            }
        };

        // Step 4: Respond with account + token
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                url: findAccessUrl(account),
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message || "Authentication failed",
        });
    }
};
