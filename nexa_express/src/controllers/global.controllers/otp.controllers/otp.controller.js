import { sendOtp, validateOtp } from "../../../services/global.services/otp.service.js";

export const otpController = async (req, res) => {
    const { email, clientIp } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const otp = await sendOtp(email, clientIp);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to send OTP',
        });
    }
};

export const validateOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        // ✅ Call service function
        const result = await validateOtp(email, otp);

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });

    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};