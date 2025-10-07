// src/config/admin.config/mail.config.js
import nodemailer from "nodemailer";

let transporter;

function createTransporter() {
  console.log("=".repeat(50));
  console.log("📧 CREATING EMAIL TRANSPORTER");
  console.log("=".repeat(50));
  console.log("MAIL_USER:", process.env.MAIL_USER ? "✅ Set" : "❌ Missing");
  console.log("MAIL_PASS:", process.env.MAIL_PASS ? `✅ Set (${process.env.MAIL_PASS.length} chars)` : "❌ Missing");
  
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log("❌ EMAIL CONFIGURATION INCOMPLETE");
    console.log("=".repeat(50));
    return null;
  }

  const newTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Verify connection
  newTransporter.verify(function (error, success) {
    if (error) {
      console.log("❌ SMTP CONNECTION FAILED:", error.message);
    } else {
      console.log("✅ SMTP CONNECTION SUCCESSFUL");
    }
    console.log("=".repeat(50));
  });

  return newTransporter;
}

// Create transporter when first used
export default function getTransporter() {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
}