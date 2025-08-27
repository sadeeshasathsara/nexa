import axios from "axios";

export const verifyCaptcha = async (req, res, next) => {
    try {
        const { captchaToken } = req.body;
        if (!captchaToken) {
            return res.status(400).json({ message: "Captcha token is missing" });
        }

        const secret = process.env.RECAPTCHA_SECRET_KEY;
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`;

        const response = await axios.post(verifyUrl);

        if (!response.data.success) {
            return res.status(400).json({
                message: "Captcha verification failed",
                error: response.data, // ✅ only send data
            });
        }

        next(); // captcha is valid, proceed
    } catch (e) {
        console.error("Captcha verification error:", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
