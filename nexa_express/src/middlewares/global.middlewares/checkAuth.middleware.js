import jwt from "jsonwebtoken";
import ROLE_ACCESS_URLs from "../../config/roleUrl.config.js";

/**
 * Middleware: checkAuth
 *
 * Verifies JWT authentication by checking `auth_token` cookie.
 *
 * Workflow:
 * 1. Extract JWT token from cookies.
 * 2. Verify token using `jsonwebtoken` and server secret.
 * 3. Attach decoded user payload to `req.user`.
 * 4. Continue request lifecycle if valid; return 401 otherwise.
 *
 * @middleware
 * @group Security - Authentication
 * @access Private (applied to protected routes)
 *
 * @param {object} req.cookies.auth_token - JWT token stored in secure cookie
 *
 * @returns {void} Calls next() if valid.
 * @returns {Error} 401 - Unauthorized (missing, invalid, or expired token)
 *
 * @example Error Response (Missing Token):
 * {
 *   "message": "Unauthorized: No token provided"
 * }
 *
 * @example Error Response (Invalid Token):
 * {
 *   "message": "Unauthorized: Invalid or expired token"
 * }
 */
export const checkAuth = (req, res, next) => {
    try {
        // Step 1: Extract JWT token from cookies
        const token = req.cookies?.auth_token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Step 2: Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Step 3: Attach decoded user payload to request
        req.user = decoded;

        // Step 4: Continue to next middleware/route
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

/**
 * Middleware: checkRoleAccess
 *
 * Authorizes role-based access to protected routes.
 *
 * Workflow:
 * 1. Ensure `req.user` exists (populated by checkAuth).
 * 2. Determine user’s allowed base path from role config.
 * 3. Compare request URL against allowed base path.
 * 4. Continue request lifecycle if authorized; return 403 otherwise.
 *
 * @middleware
 * @group Security - Authorization
 * @access Private (role-specific routes)
 *
 * @param {string} req.user.role - Role extracted from JWT payload
 * @param {string} req.originalUrl - The requested API endpoint
 *
 * @returns {void} Calls next() if role access is valid.
 * @returns {Error} 401 - Unauthorized (no user in request)
 * @returns {Error} 403 - Forbidden (role not allowed for this path)
 *
 * @example ROLE_ACCESS_URLs config:
 * {
 *   "student": "/v1/student",
 *   "tutor": "/v1/tutor",
 *   "institution": "/v1/institution",
 *   "donor": "/v1/donor",
 *   "admin": "/v1/admin"
 * }
 *
 * @example Error Response (Forbidden):
 * {
 *   "message": "Forbidden: Access denied"
 * }
 */
export const checkRoleAccess = (req, res, next) => {
    try {
        // Step 1: Ensure authenticated user exists
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        // Step 2: Extract user role
        const userRole = req.user.role;

        // Step 3: Lookup allowed base path for this role
        const allowedBasePath = ROLE_ACCESS_URLs[userRole];

        // Step 4: Check if requested path starts with role's base path
        if (!req.originalUrl.startsWith(allowedBasePath)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        // Step 5: Continue request lifecycle
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: " + error.message });
    }
};
