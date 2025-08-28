import jwt from "jsonwebtoken";
import ROLE_ACCESS_URLs from "../../config/roleUrl.config.js";

/**
 * Middleware: Authenticate request by verifying JWT in cookies
 */
export const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies?.auth_token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

/**
 * Middleware: Authorize role-based access
 * Ensures the user's role matches the base path they are trying to access
 */
export const checkRoleAccess = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const userRole = req.user.role;
        const allowedBasePath = ROLE_ACCESS_URLs[userRole];

        // Ensure the request path starts with the role's allowed base path
        if (!req.originalUrl.startsWith(allowedBasePath)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: " + error.message });
    }
};
