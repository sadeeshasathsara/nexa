// controllers/account.controller.js
import { resetPassword } from "../../../services/global.services/resetPassword.service.js";

export const resetPasswordController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const result = await resetPassword(email, password);

        if (!result.success) {
            return res.status(404).json(result); // not found or failed
        }

        return res.status(200).json(result); // success
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};
