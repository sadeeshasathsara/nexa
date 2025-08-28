import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        tnc: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: String,
            required: true,
            enum: ["student", "tutor", "institution", "donor", "admin"]
        }
    },
    {
        timestamps: true,
    }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
