import { sendMail } from "./mail.service.js";
import Otp from "../../models/global.models/otp.schema.js";
import bcrypt from "bcryptjs";

/**
 * Generate a random 6-digit OTP
 *
 * @function generateOtp
 * @returns {string} 6-digit OTP as a string
 *
 * @example
 * const otp = generateOtp(); // "482915"
 */
export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP to a user's email
 *
 * Stores the hashed OTP in the database and emails the plain OTP to the user.
 * - Updates existing OTP record for the email + IP or creates a new one.
 * - OTP is valid for 5 minutes.
 *
 * @async
 * @function sendOtp
 * @param {string} email - Recipient's email address
 * @param {string} clientIp - Client's IP address (for rate limiting)
 * @returns {Promise<string>} Plain OTP (for internal use, not exposed to client)
 * @throws {Error} If email sending or database operation fails
 *
 * @example
 * const otp = await sendOtp("user@example.com", "192.168.1.1");
 */
export const sendOtp = async (email, clientIp) => {
    const otp = generateOtp();

    // Hash the OTP before storing
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Upsert OTP document for email + IP
    const otpDoc = await Otp.findOneAndUpdate(
        { email: email.toLowerCase(), ip: clientIp },
        {
            otp: hashedOtp,
            $inc: { count: 1 },
            createdAt: Date.now(),
            verified: false
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // HTML content of the OTP email
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>NEXA - OTP Verification</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #374151;
                    background-color: #f8fafc;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    min-height: 100vh;
                    padding: 20px;
                }
                
                .email-content {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                }
                
                .header {
                    background: linear-gradient(135deg, #043345 0%, #0D9AAC 100%);
                    color: white;
                    text-align: center;
                    padding: 40px 20px;
                    position: relative;
                    overflow: hidden;
                }
                
                .header::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    animation: shimmer 3s ease-in-out infinite;
                }
                
                @keyframes shimmer {
                    0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                    50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
                }
                
                .logo {
                    font-size: 32px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    letter-spacing: 2px;
                    position: relative;
                    z-index: 1;
                }
                
                .tagline {
                    font-size: 16px;
                    opacity: 0.9;
                    position: relative;
                    z-index: 1;
                }
                
                .main-content {
                    padding: 40px 30px;
                    text-align: center;
                }
                
                .greeting {
                    font-size: 24px;
                    font-weight: 600;
                    color: #043345;
                    margin-bottom: 16px;
                }
                
                .message {
                    font-size: 16px;
                    color: #6b7280;
                    margin-bottom: 32px;
                    line-height: 1.6;
                }
                
                .otp-container {
                    background: linear-gradient(135deg, #00B6C7 0%, #009966 100%);
                    border-radius: 12px;
                    padding: 24px;
                    margin: 32px 0;
                    box-shadow: 0 8px 20px rgba(0, 182, 199, 0.3);
                }
                
                .otp-label {
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .otp-code {
                    font-size: 36px;
                    font-weight: bold;
                    color: white;
                    letter-spacing: 4px;
                    font-family: 'Courier New', monospace;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 16px 24px;
                    border-radius: 8px;
                    display: inline-block;
                    margin: 8px 0;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                
                .security-note {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    border: 1px solid #f59e0b;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 24px 0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .security-icon {
                    color: #d97706;
                    font-size: 18px;
                }
                
                .security-text {
                    color: #92400e;
                    font-size: 14px;
                    font-weight: 500;
                }
                
                .footer {
                    background: #f8fafc;
                    padding: 32px 30px;
                    text-align: center;
                    border-top: 1px solid #e2e8f0;
                }
                
                .footer-text {
                    color: #6b7280;
                    font-size: 14px;
                    margin-bottom: 16px;
                }
                
                .contact-info {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    gap: 24px;
                    flex-wrap: wrap;
                    margin-top: 16px;
                }
                
                .contact-item {
                    color: #043345;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .contact-item:hover {
                    color: #0D9AAC;
                }
                
                .brand-colors {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    gap: 8px;
                    margin-top: 20px;
                }
                
                .color-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                
                @media (max-width: 600px) {
                    .email-container {
                        padding: 10px;
                    }
                    
                    .main-content {
                        padding: 30px 20px;
                    }
                    
                    .otp-code {
                        font-size: 28px;
                        letter-spacing: 2px;
                        padding: 12px 16px;
                    }
                    
                    .contact-info {
                        flex-direction: column;
                        gap: 12px;
                    }
                    
                    .greeting {
                        font-size: 20px;
                    }

                    .w-full {
                        width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-content">
                    <!-- Header -->
                    <div class="header">
                        <div class="logo">NEXA</div>
                        <div class="tagline">Next Level Learning</div>
                    </div>
                    
                    <!-- Main Content -->
                    <div class="main-content">
                        <h1 class="greeting">🔐 Verification Required</h1>
                        <p class="message">
                            We've received a request to verify your account. Please use the OTP code below to complete your verification process.
                        </p>
                        
                        <div class="otp-container">
                            <div class="otp-label">Your Verification Code</div>
                            <div class="otp-code">${otp}</div>
                        </div>
                        
                        <div class="security-note">
                            <span class="security-icon">⚡</span>
                            <span class="security-text">
                                This code will expire in 5 minutes. Do not share this code with anyone for your security.
                            </span>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
                            If you didn't request this verification, please ignore this email or contact our support team if you have concerns.
                        </p>
                    </div>
                    
                    <!-- Footer -->
                    <div class="footer">
                        <p class="footer-text">
                            Thank you for choosing NEXA for your journey!
                        </p>
                        
                        <p style="color: #9ca3af; font-size: 12px; margin-top: 16px;">
                            © 2024 NEXA. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    // Send email
    await sendMail(email, "🔐 NEXA Verification Code - Complete Your Account Setup", htmlContent);

    return otp;
};

/**
 * Validate OTP submitted by the user
 *
 * - Checks if an OTP exists for the email.
 * - Verifies OTP is not expired (5 minutes).
 * - Compares submitted OTP with stored hashed OTP.
 * - Deletes OTP from database after successful validation.
 *
 * @async
 * @function validateOtp
 * @param {string} email - User's email address
 * @param {string} otpCode - OTP code submitted by the user
 * @returns {Promise<Object>} Result object:
 *   - success: boolean
 *   - message: descriptive message
 *
 * @example
 * const result = await validateOtp("user@example.com", "482915");
 * if(result.success) console.log("OTP verified!");
 * else console.log(result.message);
 */
export const validateOtp = async (email, otpCode) => {
    try {
        // Get latest OTP for this email
        const otpDoc = await Otp.findOne({ email: email.toLowerCase() })
            .sort({ createdAt: -1 });

        if (!otpDoc) {
            return { success: false, message: "No OTP request found." };
        }

        // Check expiration (5 minutes)
        const now = Date.now();
        const expiryTime = otpDoc.createdAt.getTime() + (5 * 60 * 1000);
        if (now > expiryTime) {
            return { success: false, message: "OTP has expired. Please request a new one." };
        }

        // Compare submitted OTP with hashed OTP
        const isMatch = await bcrypt.compare(otpCode, otpDoc.otp);
        if (!isMatch) {
            return { success: false, message: "Invalid OTP. Please try again." };
        }

        // OTP verified successfully, remove from DB
        await Otp.deleteOne({ _id: otpDoc._id });

        return { success: true, message: "OTP verified successfully." };
    } catch (error) {
        console.error("OTP validation error:", error);
        return { success: false, message: "Internal server error during OTP validation." };
    }
};
