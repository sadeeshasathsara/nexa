import {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
} from "../../../services/global.services/account.service.js";

/**
 * Create a new account
 */
export const createAccountController = async (req, res) => {
    try {
        const { role, firstName, lastName, email, password, otpVerified, tncAccepted, ...otherFields } = req.body;

        // Default required fields for all accounts
        const defaultRequiredFields = ["firstName", "lastName", "email", "password", "tncAccepted"];

        // Role-specific required fields (exclude default fields)
        const roleRequiredFields = {
            student: ["role", /* add student-specific fields here */],
            tutor: ["role", /* add tutor-specific fields here */],
            institution: ["role", /* add institution-specific fields here */],
            donor: ["role", /* add donor-specific fields here */],
            admin: ["role", /* add admin-specific fields here */]
        };

        // Combine default + role-specific required fields
        const requiredFields = Array.from(new Set([
            ...defaultRequiredFields,
            ...(roleRequiredFields[role] || [])
        ]));

        // Check for missing required fields
        const missingFields = requiredFields.filter(field => req.body[field] == null);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        // Additional validations
        if (otpVerified === false) {
            return res.status(400).json({
                success: false,
                message: "OTP is not verified"
            });
        }

        if (tncAccepted === false) {
            return res.status(400).json({
                success: false,
                message: "Terms and Conditions are not accepted"
            });
        }

        // Save the common account data
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

        // Handle role-specific logic
        switch (role) {
            case "student":
                // handle student-specific data
                break;
            case "tutor":
                // handle tutor-specific data
                break;
            case "institution":
                // handle institution-specific data
                break;
            case "donor":
                // handle donor-specific data
                break;
            case "admin":
                // handle admin-specific data
                break;
            default:
                // optional: handle unknown roles
                break;
        }

        res.status(201).json({ success: true, data: account, message: "Account created" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Get all accounts (with optional query filters)
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
 * Get a single account by ID
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
 */
export const deleteAccountController = async (req, res) => {
    try {
        const deletedAccount = await deleteAccount(req.params.id);
        res.status(200).json({ success: true, data: deletedAccount });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
