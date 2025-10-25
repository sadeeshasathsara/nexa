import bcrypt from "bcryptjs";
import Account from "../../models/global.models/account.model.js";

/**
 * Authenticate an account using email and password.
 *
 * This service function performs account authentication in three steps:
 * 1. Verifies whether an account with the given email exists.
 * 2. Compares the provided password with the stored hashed password using bcrypt.
 * 3. Returns the account object (with the password field removed) if authentication succeeds.
 *
 * @async
 * @function authenticateAccount
 * @param {string} email - The email address of the account attempting to log in.
 * @param {string} password - The plain-text password provided by the user.
 * @throws {Error} Throws an error if the account does not exist or if the password does not match.
 * @returns {Promise<Object>} The authenticated account object without the password field.
 *
 * @example
 * try {
 *   const account = await authenticateAccount("user@example.com", "PlainTextPassword123");
 *   console.log("Authenticated account:", account);
 * } catch (error) {
 *   console.error("Authentication failed:", error.message);
 * }
 */
export const authenticateAccount = async (email, password) => {
    try {
        // 1. Check if account exists
        const account = await Account.findOne({ email });
        if (!account) {
            throw new Error("Invalid email or password");
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // 3. Return account (without password)
        const accountObj = account.toObject();
        delete accountObj.password;

        return accountObj;
    } catch (error) {
        throw new Error(error.message);
    }
};
