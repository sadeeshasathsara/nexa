import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  // Donor Information
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: [true, 'Donor is required']
  },
  
  // Institution Information
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
    required: [true, 'Institution is required']
  },
  
  // Donation Details
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Donation amount must be at least 1']
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'LKR'],
    default: 'USD'
  },
  
  // Donation Type and Frequency
  donationType: {
    type: String,
    required: [true, 'Donation type is required'],
    enum: ['one-time', 'recurring', 'pledge']
  },
  frequency: {
    type: String,
    enum: ['one-time', 'monthly', 'quarterly', 'yearly'],
    default: 'one-time'
  },
  
  // Purpose and Designation
  purpose: {
    type: String,
    required: [true, 'Donation purpose is required'],
    enum: ['general', 'scholarship', 'infrastructure', 'programs', 'emergency', 'other']
  },
  designation: {
    type: String,
    trim: true,
    maxlength: [200, 'Designation cannot exceed 200 characters']
  },
  
  // Payment Information
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['credit-card', 'debit-card', 'bank-transfer', 'paypal', 'check', 'cash', 'other']
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Donation Status
  status: {
    type: String,
    required: [true, 'Donation status is required'],
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // Recurring Donation Details
  recurringDetails: {
    startDate: Date,
    endDate: Date,
    nextPaymentDate: Date,
    totalPayments: {
      type: Number,
      default: 0
    },
    successfulPayments: {
      type: Number,
      default: 0
    }
  },
  
  // Anonymity
  isAnonymous: {
    type: Boolean,
    default: false
  },
  
  // Notes and Messages
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  
  // Tax and Receipt
  isTaxDeductible: {
    type: Boolean,
    default: false
  },
  receiptSent: {
    type: Boolean,
    default: false
  },
  receiptDate: Date,
  
  // Processing Information
  processedAt: Date,
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
donationSchema.index({ donor: 1, createdAt: -1 });
donationSchema.index({ institution: 1, createdAt: -1 });
donationSchema.index({ status: 1 });
donationSchema.index({ transactionId: 1 });
donationSchema.index({ createdAt: -1 });

// Virtual for formatted amount
donationSchema.virtual('formattedAmount').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.currency
  }).format(this.amount);
});

// Virtual for donation age
donationSchema.virtual('donationAge').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Ensure virtual fields are serialized
donationSchema.set('toJSON', { virtuals: true });
donationSchema.set('toObject', { virtuals: true });

// Pre-save middleware to update recurring details
donationSchema.pre('save', function(next) {
  if (this.isNew && this.donationType === 'recurring') {
    this.recurringDetails.startDate = new Date();
    this.recurringDetails.nextPaymentDate = new Date();
    
    // Set next payment date based on frequency
    switch (this.frequency) {
      case 'monthly':
        this.recurringDetails.nextPaymentDate.setMonth(this.recurringDetails.nextPaymentDate.getMonth() + 1);
        break;
      case 'quarterly':
        this.recurringDetails.nextPaymentDate.setMonth(this.recurringDetails.nextPaymentDate.getMonth() + 3);
        break;
      case 'yearly':
        this.recurringDetails.nextPaymentDate.setFullYear(this.recurringDetails.nextPaymentDate.getFullYear() + 1);
        break;
    }
  }
  next();
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
