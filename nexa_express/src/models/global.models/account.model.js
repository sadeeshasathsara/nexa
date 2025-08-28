import mongoose from "mongoose";

/**
 * Account Schema
 *
 * Represents a user account in the system.
 * Supports multiple roles (student, tutor, institution, donor, admin).
 *
 * Fields:
 * - firstName: First name of the user (required, trimmed)
 * - lastName: Last name of the user (required, trimmed)
 * - email: User email (unique, lowercase, trimmed)
 * - password: Hashed password for authentication (required)
 * - tnc: Boolean indicating Terms & Conditions acceptance (default: false)
 * - role: User role (must be one of student, tutor, institution, donor, admin)
 * 
 * Timestamps:
 * - createdAt: Document creation time
 * - updatedAt: Document last update time
 */
const accountSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true, // Remove leading/trailing spaces
        },
        lastName: {
            type: String,
            required: true,
            trim: true, // Remove leading/trailing spaces
        },
        email: {
            type: String,
            unique: true, // Ensure email uniqueness
            lowercase: true, // Normalize to lowercase
            trim: true, // Remove spaces
        },
        password: {
            type: String,
            required: true, // Store hashed password
        },
        tnc: {
            type: Boolean,
            required: true,
            default: false, // Must accept T&C to create account
        },
        role: {
            type: String,
            required: true,
            enum: ["student", "tutor", "institution", "donor", "admin"], // Restrict to allowed roles
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);

/**
 * Account Model
 *
 * Provides CRUD access to the 'accounts' collection.
 * Example usage:
 * const user = await Account.create({ firstName, lastName, email, password, tnc, role });
 */
const Account = mongoose.model("Account", accountSchema);

export default Account;
