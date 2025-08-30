import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const donorSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  // Account Security
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  // Profile Information
  profilePicture: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    default: 'prefer-not-to-say'
  },
  // Address Information
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  // Donor Preferences
  preferredCauses: [{
    type: String,
    enum: ['education', 'healthcare', 'poverty', 'environment', 'arts', 'sports', 'technology', 'other']
  }],
  preferredInstitutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution'
  }],
  // Donation Settings
  donationFrequency: {
    type: String,
    enum: ['one-time', 'monthly', 'quarterly', 'yearly'],
    default: 'one-time'
  },
  preferredCurrency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'LKR']
  },
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  // Timestamps
  lastLogin: Date,
  lastDonation: Date
}, {
  timestamps: true
});

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;

