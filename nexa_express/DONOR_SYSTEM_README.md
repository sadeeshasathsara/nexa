# Donor System - Nexa Platform

## Overview
The Donor System is a comprehensive solution for managing donor accounts, donations, and preferences in the Nexa educational platform. It provides secure authentication, profile management, donation tracking, and analytics.

## Features

### 🔐 Authentication & Security
- **User Registration**: Multi-step registration with validation
- **Secure Login**: JWT-based authentication with password hashing
- **Password Management**: Change password, forgot password, reset password
- **Account Security**: Account deactivation, email verification

### 👤 Profile Management
- **Personal Information**: Name, email, phone, date of birth, gender
- **Address Management**: Street, city, state, country, zip code
- **Preferences**: Preferred causes, donation frequency, currency
- **Profile Picture**: Avatar upload and management

### 💰 Donation System
- **Donation Tracking**: Complete history of all donations
- **Recurring Donations**: Monthly, quarterly, yearly options
- **Payment Methods**: Credit card, debit card, bank transfer, PayPal, etc.
- **Donation Purposes**: General, scholarship, infrastructure, programs, emergency
- **Anonymous Donations**: Option to donate anonymously

### 📊 Analytics & Reporting
- **Donation Statistics**: Total donations, amounts, trends
- **Monthly Reports**: Monthly and yearly donation summaries
- **Impact Tracking**: See how donations are making a difference
- **Tax Deductions**: Track tax-deductible donations

## Backend Architecture

### Models
- **Donor Model** (`donor.model.js`): Core donor information and preferences
- **Donation Model** (`donation.model.js`): Individual donation records

### Controllers
- **Donor Controller** (`donor.controller.js`): All donor-related business logic
- **Authentication**: Registration, login, password management
- **Profile Management**: CRUD operations for donor profiles
- **Donation Management**: Track and manage donations
- **Analytics**: Generate donor statistics and reports

### Routes
- **Public Routes**: Registration, login, password reset
- **Protected Routes**: Profile, donations, statistics (require authentication)
- **Validation**: Input validation using express-validator

### Middleware
- **Authentication**: JWT token verification and protection
- **Validation**: Request data validation and sanitization
- **Error Handling**: Centralized error handling and responses

## API Endpoints

### Public Endpoints
```
POST /api/v1/donor/register          - Register new donor
POST /api/v1/donor/login             - Login donor
POST /api/v1/donor/forgot-password   - Request password reset
PUT  /api/v1/donor/reset-password/:token - Reset password
```

### Protected Endpoints (Require JWT)
```
GET    /api/v1/donor/profile         - Get donor profile
PUT    /api/v1/donor/profile         - Update donor profile
PUT    /api/v1/donor/change-password - Change password
GET    /api/v1/donor/donations       - Get donation history
GET    /api/v1/donor/statistics      - Get donation statistics
DELETE /api/v1/donor/account         - Deactivate account
```

## Frontend Components

### Core Components
- **RegisterDonor**: Multi-step registration form with validation
- **LoginDonor**: Secure login with social options
- **DonorDashboard**: Comprehensive dashboard with tabs
- **DonorPage**: Main page with authentication flow

### Dashboard Features
- **Overview Tab**: Statistics, recent donations, quick actions
- **Profile Tab**: Edit personal information and preferences
- **Settings Tab**: Password change, notifications, account management

## Database Schema

### Donor Collection
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String,
  password: String (hashed),
  dateOfBirth: Date,
  gender: String (enum),
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  preferredCauses: [String],
  donationFrequency: String (enum),
  preferredCurrency: String (enum),
  isActive: Boolean,
  isVerified: Boolean,
  emailVerified: Boolean,
  lastLogin: Date,
  lastDonation: Date,
  timestamps: true
}
```

### Donation Collection
```javascript
{
  donor: ObjectId (ref: Donor),
  institution: ObjectId (ref: Institution),
  amount: Number (required),
  currency: String (required),
  donationType: String (enum),
  frequency: String (enum),
  purpose: String (required),
  designation: String,
  paymentMethod: String (required),
  transactionId: String,
  status: String (enum),
  recurringDetails: {
    startDate: Date,
    endDate: Date,
    nextPaymentDate: Date,
    totalPayments: Number,
    successfulPayments: Number
  },
  isAnonymous: Boolean,
  message: String,
  isTaxDeductible: Boolean,
  receiptSent: Boolean,
  timestamps: true
}
```

## Security Features

### Password Security
- **Bcrypt Hashing**: 12 salt rounds for secure password storage
- **Password Validation**: Minimum 8 characters with complexity requirements
- **Password History**: Track password changes for security

### JWT Authentication
- **Token Expiration**: Configurable token lifetime
- **Secure Storage**: HTTP-only cookies or secure headers
- **Token Refresh**: Automatic token refresh mechanism

### Input Validation
- **Data Sanitization**: Remove malicious input
- **Type Validation**: Ensure correct data types
- **Length Limits**: Prevent buffer overflow attacks

## Setup Instructions

### 1. Environment Configuration
Copy `env.example` to `.env` and configure:
```bash
MONGODB_URI=mongodb://localhost:27017/nexa
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

### 2. Database Connection
The system automatically connects to MongoDB on startup:
```javascript
import connectDB from './src/config/database.config.js';
connectDB();
```

### 3. Dependencies
Ensure all required packages are installed:
```bash
npm install bcryptjs jsonwebtoken express-validator mongoose
```

### 4. Start the Server
```bash
npm run dev
```

## Testing the API

### Register a New Donor
```bash
curl -X POST http://localhost:5000/api/v1/donor/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "preferredCauses": ["education", "healthcare"],
    "donationFrequency": "monthly"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/donor/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Profile (with JWT)
```bash
curl -X GET http://localhost:5000/api/v1/donor/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Future Enhancements

### Planned Features
- **Email Verification**: Send verification emails
- **Social Login**: Google, Facebook, Twitter integration
- **Two-Factor Authentication**: SMS or app-based 2FA
- **Donation Campaigns**: Create and manage fundraising campaigns
- **Impact Stories**: Share how donations make a difference
- **Mobile App**: React Native mobile application

### Technical Improvements
- **Rate Limiting**: Prevent API abuse
- **Caching**: Redis for improved performance
- **Webhooks**: Real-time notifications
- **Analytics**: Advanced reporting and insights
- **API Documentation**: Swagger/OpenAPI specification

## Contributing

### Code Style
- Use ES6+ features
- Follow ESLint configuration
- Write meaningful commit messages
- Include tests for new features

### Development Workflow
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit pull request

## Support

For questions or issues:
- Check the documentation
- Review existing issues
- Create a new issue with detailed description
- Contact the development team

---

**Note**: This system is designed to be scalable and secure. Always follow security best practices when deploying to production.




