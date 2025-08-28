import Account from "../../models/global.models/account.model.js";
import bcrypt from "bcryptjs";

/**
 * Create a new account
 *
 * Hashes the password and stores a new account in the database.
 *
 * @async
 * @function createAccount
 * @param {Object} accountData - Object containing account fields:
 *   @param {string} accountData.firstName - First name of the user
 *   @param {string} accountData.lastName - Last name of the user
 *   @param {string} accountData.email - Email address
 *   @param {string} accountData.password - Plain-text password
 *   @param {boolean} accountData.tnc - Terms & Conditions accepted
 *   @param {string} accountData.role - User role (student, tutor, institution, donor, admin)
 * @returns {Promise<Object>} Created account document
 * @throws {Error} If saving fails or validation fails
 *
 * @example
 * const user = await createAccount({
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john@example.com",
 *   password: "secret123",
 *   tnc: true,
 *   role: "student"
 * });
 */
export const createAccount = async (accountData) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(accountData.password, salt);

        const newAccount = new Account({
            ...accountData,
            password: hashedPassword,
        });

        const savedAccount = await newAccount.save();
        return savedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get all accounts with optional query filters
 *
 * @async
 * @function getAccounts
 * @param {Object} [query={}] - Mongoose query object to filter accounts
 * @returns {Promise<Array>} Array of account documents
 * @throws {Error} If query fails
 *
 * @example
 * const students = await getAccounts({ role: "student" });
 */
export const getAccounts = async (query = {}) => {
    try {
        const accounts = await Account.find(query);
        return accounts;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get a single account by ID
 *
 * @async
 * @function getAccountById
 * @param {string} id - MongoDB ObjectId of the account
 * @returns {Promise<Object>} Account document
 * @throws {Error} If account not found or query fails
 *
 * @example
 * const user = await getAccountById("64f8a1e9c1234567890abcd1");
 */
export const getAccountById = async (id) => {
    try {
        const account = await Account.findById(id);
        if (!account) throw new Error("Account not found");
        return account;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Update an account by ID
 *
 * Hashes the password if included in updateData.
 *
 * @async
 * @function updateAccount
 * @param {string} id - MongoDB ObjectId of the account
 * @param {Object} updateData - Fields to update (firstName, lastName, password, etc.)
 * @returns {Promise<Object>} Updated account document
 * @throws {Error} If account not found or update fails
 *
 * @example
 * const updatedUser = await updateAccount("64f8a1e9c1234567890abcd1", { firstName: "Jane" });
 */
export const updateAccount = async (id, updateData) => {
    try {
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAccount) throw new Error("Account not found");
        return updatedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Delete an account by ID
 *
 * @async
 * @function deleteAccount
 * @param {string} id - MongoDB ObjectId of the account
 * @returns {Promise<Object>} Deleted account document
 * @throws {Error} If account not found or deletion fails
 *
 * @example
 * const deletedUser = await deleteAccount("64f8a1e9c1234567890abcd1");
 */
export const deleteAccount = async (id) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(id);
        if (!deletedAccount) throw new Error("Account not found");
        return deletedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};
