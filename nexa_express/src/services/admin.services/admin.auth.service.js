// src/services/admin.services/admin.auth.service.js
import crypto from "crypto";
import User from "../../models/admin.models/User.model.js";
import transporter from "../../config/admin.config/mail.config.js";

function normEmail(email) {
  return (email || "").toString().trim().toLowerCase();
}

function appOrigin() {
  const origin = process.env.ADMIN_APP_ORIGIN || process.env.CORS_ORIGIN || "http://localhost:3000";
  return origin.replace(/\/$/, "");
}

export async function sendResetPasswordEmail(emailRaw) {
  try {
    const email = normEmail(emailRaw);
    console.log("=== FORGOT PASSWORD DEBUG ===");
    console.log("1. Looking for admin with email:", email);

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      console.log("❌ Admin not found in database");
      throw new Error("Admin not found");
    }
    console.log("✅ Admin found:", admin.name);

    // FIX: Check for MAIL_USER instead of SMTP_HOST
    console.log("2. Checking email configuration...");
    console.log("MAIL_USER:", process.env.MAIL_USER ? "Exists" : "Missing");
    console.log("MAIL_PASS:", process.env.MAIL_PASS ? "Exists" : "Missing");
    console.log("MAIL_HOST:", process.env.MAIL_HOST);

    // FIX: Use MAIL_USER check instead of SMTP_HOST
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.log("❌ Email configuration missing - need MAIL_USER and MAIL_PASS");
      throw new Error("Mail config missing");
    }
    console.log("✅ Email configuration OK");

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    admin.resetPasswordToken = token;
    admin.resetPasswordExpires = expiresAt;
    await admin.save();
    console.log("✅ Reset token saved to database");

    const resetUrl = `${appOrigin()}/admin/reset/${token}?email=${encodeURIComponent(email)}`;
    console.log("Reset URL:", resetUrl);

    console.log("3. Attempting to send email...");
    console.log("From:", process.env.MAIL_FROM || process.env.MAIL_USER);
    console.log("To:", email);

    try {
      const result = await transporter.sendMail({
        to: email,
        from: process.env.MAIL_FROM || process.env.MAIL_USER,
        subject: "NEXA Admin Password Reset",
        html: `
          <p>Hello ${admin.name || "Admin"},</p>
          <p>You requested a password reset for your NEXA Admin account.</p>
          <p>This link is valid for 1 hour:</p>
          <p><a href="${resetUrl}" target="_blank" rel="noopener noreferrer">${resetUrl}</a></p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p>— NEXA Security</p>
        `,
      });
      
      console.log("✅ Email sent successfully! Message ID:", result.messageId);
      console.log("=== FORGOT PASSWORD COMPLETE ===");
      return "Reset link sent successfully!";
      
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.message);
      console.error("Email error details:", emailError);
      throw new Error("Failed to send reset email");
    }
    
  } catch (error) {
    console.log("❌ FORGOT PASSWORD ERROR:", error.message);
    throw error; // Re-throw to let controller handle it
  }
}