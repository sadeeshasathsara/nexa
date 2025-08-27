import Account from "../../models/global.models/account.model.js";
import bcrypt from "bcryptjs";

/**
 * Create a new account
 * @param {Object} accountData - { firstName, lastName, email, password, tnc }
 * @returns {Object} created account
 */
export const createAccount = async (accountData) => {
    try {
        // Hash password before saving
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
 * Get accounts with optional query filters
 * @param {Object} query - Mongoose query object
 * @returns {Array} accounts
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
 * @param {String} id - Account ID
 * @returns {Object} account
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
 * @param {String} id - Account ID
 * @param {Object} updateData - fields to update
 * @returns {Object} updated account
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
 * @param {String} id - Account ID
 * @returns {Object} deleted account
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
