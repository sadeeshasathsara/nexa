import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configure Nodemailer transporter
 *
 * Uses SMTP credentials from environment variables.
 * Make sure the following .env variables are set:
 * - MAIL_HOST
 * - MAIL_PORT
 * - MAIL_USER
 * - MAIL_PASS
 */
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    secure: false, // use TLS if true
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * Send an email
 *
 * Sends an email using the configured Nodemailer transporter.
 *
 * @async
 * @function sendMail
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} htmlContent - HTML content of the email
 * @returns {Promise<Object>} Result object
 *   - success: boolean indicating if email was sent
 *   - messageId: string ID of the sent message (if successful)
 *   - error: string error message (if failed)
 *
 * @throws {Error} If sending email fails
 *
 * @example
 * const result = await sendMail(
 *   "user@example.com",
 *   "Welcome to NEXA",
 *   "<h1>Hello John!</h1><p>Welcome to our platform.</p>"
 * );
 *
 * if (result.success) {
 *   console.log("Email sent:", result.messageId);
 * } else {
 *   console.error("Failed to send email:", result.error);
 * }
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
