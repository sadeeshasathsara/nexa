import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * Send an email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} htmlContent - HTML content of the email
 */
export const sendMail = async (to, subject, htmlContent) => {
    try {
        const info = await transporter.sendMail({
            from: `"NEXA" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html: htmlContent,
        });

        return { success: true, messageId: info.messageId };
    } catch (err) {
        console.error("Error sending mail:", err);
        return { success: false, error: err.message };
    }
};
