import bcrypt from "bcryptjs";
import Account from "../../models/global.models/account.model.js";

export const resetPassword = async (email, password) => {
    try {
        const user = await Account.findOne({ email });
        if (!user) {
            return { success: false, message: `Could not find an account for ${email}` };
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        return { success: true, message: "Password updated successfully" };
    } catch (e) {
        return { success: false, message: e.message };
    }
};