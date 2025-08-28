import jwt from "jsonwebtoken";

/**
 * Generate JWT token for an account
 * @param {Object} account - Mongoose account object
 * @returns {string} JWT token
 */
export const generateAccountToken = (account) => {
    try {
        // Payload: you can add fields you want inside the token
        const payload = {
            id: account._id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            role: account.role
        };

        // Sign token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, // make sure to set this in .env
            { expiresIn: "7d" }     // token expiration (customize as needed)
        );

        return token;
    } catch (error) {
        throw new Error("Error generating token: " + error.message);
    }
};
