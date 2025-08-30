import Donor from '../../models/donor.models/donor.model.js';
import Donation from '../../models/donor.models/donation.model.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mongoose from 'mongoose';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// @desc    Register a new donor
// @route   POST /api/v1/donor/register
// @access  Public
export const registerDonor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      address,
      preferredCauses,
      donationFrequency,
      preferredCurrency
    } = req.body;

    // Check if donor already exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: 'Donor with this email already exists'
      });
    }

    // Create new donor
    const donor = new Donor({
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      address,
      preferredCauses,
      donationFrequency,
      preferredCurrency
    });

    await donor.save();

    // Generate token
    const token = generateToken(donor._id);

    // Remove password from response
    donor.password = undefined;

    res.status(201).json({
      success: true,
      message: 'Donor registered successfully',
      data: {
        donor,
        token
      }
    });

  } catch (error) {
    console.error('Error registering donor:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering donor',
      error: error.message
    });
  }
};

// @desc    Login donor
// @route   POST /api/v1/donor/login
// @access  Public
export const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if donor exists and password is correct
    const donor = await Donor.findOne({ email }).select('+password');
    if (!donor) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await donor.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (!donor.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Update last login
    donor.lastLogin = new Date();
    await donor.save();

    // Generate token
    const token = generateToken(donor._id);

    // Remove password from response
    donor.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        donor,
        token
      }
    });

  } catch (error) {
    console.error('Error logging in donor:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in donor',
      error: error.message
    });
  }
};

// @desc    Get donor profile
// @route   GET /api/v1/donor/profile
// @access  Private
export const getDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findById(req.donor.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: donor
    });

  } catch (error) {
    console.error('Error getting donor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting donor profile',
      error: error.message
    });
  }
};

// @desc    Update donor profile
// @route   PUT /api/v1/donor/profile
// @access  Private
export const updateDonorProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      address,
      preferredCauses,
      donationFrequency,
      preferredCurrency
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      address,
      preferredCauses,
      donationFrequency,
      preferredCurrency
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const donor = await Donor.findByIdAndUpdate(
      req.donor.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: donor
    });

  } catch (error) {
    console.error('Error updating donor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating donor profile',
      error: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/v1/donor/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get donor with password
    const donor = await Donor.findById(req.donor.id).select('+password');

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    // Check current password
    const isCurrentPasswordValid = await donor.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    donor.password = newPassword;
    donor.passwordChangedAt = new Date();
    await donor.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message
    });
  }
};

// @desc    Get donor donations
// @route   GET /api/v1/donor/donations
// @access  Private
export const getDonorDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { donor: req.donor.id };
    if (status) query.status = status;

    const donations = await Donation.find(query)
      .populate('institution', 'name logo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Donation.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        donations,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('Error getting donor donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting donor donations',
      error: error.message
    });
  }
};

// @desc    Get donor statistics
// @route   GET /api/v1/donor/statistics
// @access  Private
export const getDonorStatistics = async (req, res) => {
  try {
    const donorId = req.donor.id;

    // Get total donations
    const totalDonations = await Donation.countDocuments({ donor: donorId });

    // Get total amount donated
    const totalAmount = await Donation.aggregate([
      { $match: { donor: new mongoose.Types.ObjectId(donorId), status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Get donations by status
    const donationsByStatus = await Donation.aggregate([
      { $match: { donor: new mongoose.Types.ObjectId(donorId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get donations by month (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyDonations = await Donation.aggregate([
      {
        $match: {
          donor: new mongoose.Types.ObjectId(donorId),
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        donationsByStatus,
        monthlyDonations
      }
    });

  } catch (error) {
    console.error('Error getting donor statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting donor statistics',
      error: error.message
    });
  }
};

// @desc    Forgot password
// @route   POST /api/v1/donor/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor with this email not found'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    donor.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    donor.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await donor.save();

    // TODO: Send email with reset token
    // For now, just return the token (in production, send via email)
    res.status(200).json({
      success: true,
      message: 'Password reset token sent to email',
      data: {
        resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
      }
    });

  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({
      success: false,
      message: 'Error in forgot password',
      error: error.message
    });
  }
};

// @desc    Reset password
// @route   PUT /api/v1/donor/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find donor with valid reset token
    const donor = await Donor.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!donor) {
      return res.status(400).json({
        success: false,
        message: 'Token is invalid or has expired'
      });
    }

    // Update password and clear reset token
    donor.password = password;
    donor.passwordResetToken = undefined;
    donor.passwordResetExpires = undefined;
    donor.passwordChangedAt = Date.now();

    await donor.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password',
      error: error.message
    });
  }
};

// @desc    Delete donor account
// @route   DELETE /api/v1/donor/account
// @access  Private
export const deleteDonorAccount = async (req, res) => {
  try {
    const donor = await Donor.findById(req.donor.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    // Soft delete - just deactivate the account
    donor.isActive = false;
    await donor.save();

    res.status(200).json({
      success: true,
      message: 'Account deactivated successfully'
    });

  } catch (error) {
    console.error('Error deleting donor account:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting donor account',
      error: error.message
    });
  }
};
