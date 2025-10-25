
export const protect = (req, res, next) => {
    next();
};

export const authorize = () => (req, res, next) => {
    next();
};

export const optionalAuth = (req, res, next) => {
    next();
};


import jwt from 'jsonwebtoken';
import Donor from '../models/donor.models/donor.model.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get donor from token
      const donor = await Donor.findById(decoded.id).select('-password');

      if (!donor) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      }

      // Check if donor account is active
      if (!donor.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated. Please contact support.'
        });
      }

      // Check if password was changed after token was issued
      if (donor.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({
          success: false,
          message: 'Password was recently changed. Please log in again.'
        });
      }

      req.donor = donor;
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Optional auth - verify JWT token if provided, but don't require it
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get donor from token
        const donor = await Donor.findById(decoded.id).select('-password');

        if (donor && donor.isActive) {
          // Check if password was changed after token was issued
          if (!donor.changedPasswordAfter(decoded.iat)) {
            req.donor = donor;
          }
        }
      } catch (error) {
        // Token is invalid, but we don't fail the request
        console.log('Invalid token in optional auth:', error.message);
      }
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

// Role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.donor) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    if (!roles.includes(req.donor.role)) {
      return res.status(403).json({
        success: false,
        message: 'User role is not authorized to access this route'
      });
    }

    next();
  };
};
