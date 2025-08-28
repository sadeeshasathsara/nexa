import jwt from "jsonwebtoken";

/**
 * Generate JWT token for an account
 *
 * Creates a signed JSON Web Token containing key account information.
 * The token can be used for authentication in protected routes.
 *
 * Workflow:
 * 1. Prepare payload from account fields (id, name, email, role).
 * 2. Sign token using JWT_SECRET with expiration (default: 7 days).
 * 3. Return token string.
 *
 * @function generateAccountToken
 * @param {Object} account - Mongoose account document
 * @param {string} account._id - MongoDB ObjectId of the account
 * @param {string} account.firstName - First name of the user
 * @param {string} account.lastName - Last name of the user
 * @param {string} account.email - Email of the user
 * @param {string} account.role - Role of the user (student, tutor, institution, donor, admin)
 * @returns {string} JWT token
 * @throws {Error} If token generation fails
 *
 * @example
 * const token = generateAccountToken({
 *   _id: "64f8a1e9c1234567890abcd1",
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john@example.com",
 *   role: "student"
 * });
 *
 * console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6...
 */
export const generateAccountToken = (account) => {
    try {
        // Step 1: Build JWT payload
        const payload = {
            id: account._id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            role: account.role
        };

        // Step 2: Sign token with secret and expiration
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, // Ensure this is set in .env
            { expiresIn: "7d" }     // Token valid for 7 days
        );

        // Step 3: Return token string
        return token;
    } catch (error) {
        throw new Error("Error generating token: " + error.message);
    }
};
