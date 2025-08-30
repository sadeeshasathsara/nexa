import {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
} from "../../../services/global.services/account.service.js";

/**
 * Create a new account
 *
 * @route POST /accounts
 * @group Accounts - Operations related to user accounts
 * @param {string} req.body.role - Role of the account (student, tutor, institution, donor, admin)
 * @param {string} req.body.firstName - First name of the user
 * @param {string} req.body.lastName - Last name of the user
 * @param {string} req.body.email - Email address (must be unique)
 * @param {string} req.body.password - Password for authentication
 * @param {boolean} req.body.otpVerified - OTP verification status
 * @param {boolean} req.body.tncAccepted - Whether the user accepted Terms & Conditions
 * @returns {object} 201 - Newly created account
 * @returns {Error} 400 - Validation or server error
 */
export const createAccountController = async (req, res) => {
    try {
        const { role, firstName, lastName, email, password, otpVerified, tncAccepted, ...otherFields } = req.body;

        const defaultRequiredFields = ["firstName", "lastName", "email", "password", "tncAccepted"];

        const roleRequiredFields = {
            student: ["role"],
            tutor: ["role"],
            institution: ["role"],
            donor: ["role"],
            admin: ["role"]
        };

        const requiredFields = Array.from(new Set([
            ...defaultRequiredFields,
            ...(roleRequiredFields[role] || [])
        ]));

        const missingFields = requiredFields.filter(field => req.body[field] == null);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        if (otpVerified === false) {
            return res.status(400).json({ success: false, message: "OTP is not verified" });
        }

        if (tncAccepted === false) {
            return res.status(400).json({ success: false, message: "Terms and Conditions are not accepted" });
        }

        const accountData = {
            role,
            firstName,
            lastName,
            email,
            password,
            otpVerified,
            tnc: tncAccepted
        };

        const account = await createAccount(accountData);

        // Role-specific logic placeholder
        switch (role) {
            case "student":
            case "tutor":
            case "institution":
            case "donor":
            case "admin":
                break;
            default:
                break;
        }

        res.status(201).json({ success: true, data: account, message: "Account created" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Get all accounts
 *
 * @route GET /accounts
 * @group Accounts - Operations related to user accounts
 * @param {object} req.query - Optional query filters (e.g., { role: "student" })
 * @returns {Array<object>} 200 - List of accounts
 * @returns {Error} 400 - Server error
 */
export const getAccountsController = async (req, res) => {
    try {
        const query = req.query || {};
        const accounts = await getAccounts(query);
        res.status(200).json({ success: true, data: accounts });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Get an account by ID
 *
 * @route GET /accounts/:id
 * @group Accounts - Operations related to user accounts
 * @param {string} req.params.id - The account ID
 * @returns {object} 200 - Account details
 * @returns {Error} 404 - Account not found
 */
export const getAccountByIdController = async (req, res) => {
    try {
        const account = await getAccountById(req.params.id);
        res.status(200).json({ success: true, data: account });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

/**
 * Update an account by ID
 *
 * @route PUT /accounts/:id
 * @group Accounts - Operations related to user accounts
 * @param {string} req.params.id - The account ID
 * @param {object} req.body - Fields to update
 * @returns {object} 200 - Updated account
 * @returns {Error} 400 - Validation or server error
 */
export const updateAccountController = async (req, res) => {
    try {
        const updatedAccount = await updateAccount(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedAccount });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Delete an account by ID
 *
 * @route DELETE /accounts/:id
 * @group Accounts - Operations related to user accounts
 * @param {string} req.params.id - The account ID
 * @returns {object} 200 - Deleted account details
 * @returns {Error} 404 - Account not found
 */
export const deleteAccountController = async (req, res) => {
    try {
        const deletedAccount = await deleteAccount(req.params.id);
        res.status(200).json({ success: true, data: deletedAccount });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
