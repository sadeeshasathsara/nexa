# PayHere.lk Payment Gateway Integration

This document explains how to set up and use the PayHere.lk payment gateway integration in the Nexa donation system.

## Overview

The PayHere integration allows donors to make secure payments through the PayHere.lk payment gateway, which supports multiple payment methods including credit cards, debit cards, and bank transfers.

## Features

- ✅ Secure payment processing via PayHere.lk
- ✅ Multiple currency support (LKR, USD, EUR, GBP)
- ✅ Payment status tracking and notifications
- ✅ Sandbox mode for testing
- ✅ Automatic payment verification
- ✅ User-friendly payment flow
- ✅ Mobile-responsive design

## Setup Instructions

### 1. PayHere Merchant Account

1. Visit [PayHere.lk](https://www.payhere.lk/) and create a merchant account
2. Complete the application process with your business details
3. Get approved and receive your merchant credentials

### 2. Environment Configuration

Create a `.env` file in the `nexa_react` directory with the following variables:

```env
# PayHere Configuration for Vite
# Note: Vite uses VITE_ prefix for environment variables
VITE_PAYHERE_MERCHANT_ID=your_merchant_id_here
VITE_PAYHERE_MERCHANT_SECRET=your_merchant_secret_here
VITE_PAYHERE_SANDBOX=true
VITE_API_URL=http://localhost:5000
```

For the backend, create a `.env` file in the `nexa_express` directory:

```env
# PayHere Backend Configuration
PAYHERE_MERCHANT_ID=your_merchant_id_here
PAYHERE_MERCHANT_SECRET=your_merchant_secret_here
PAYHERE_SANDBOX=true
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000
```

### 3. Install Dependencies (Optional)

The integration includes a dependency-free version (`payhere-simple.utils.js`) that works without external packages. However, for production use, you may want to install `crypto-js` for more robust hash generation:

```bash
cd nexa_react
npm install crypto-js  # Optional - dependency-free version is already configured
```

**Note:** The current setup uses `payhere-simple.utils.js` which doesn't require any external dependencies.

### 4. Backend Setup

The PayHere integration includes the following backend components:

- **PayHere Controller** (`src/controllers/donor.controllers/payhere.controller.js`)
- **PayHere Routes** (`src/routes/donor.routes/payhere.route.js`)
- **PayHere Configuration** (`src/config/payhere.config.js`)

Make sure these files are properly imported in your main application.

## Usage

### Frontend Integration

The PayHere integration is automatically available in the donation form. Users can:

1. Select PayHere as their payment method
2. Fill in their personal information
3. Complete the donation form
4. Click "Pay with PayHere" to redirect to the payment gateway

### Payment Flow

1. **Donation Form**: User fills out donation details and selects PayHere
2. **Payment Submission**: Form data is submitted to PayHere with proper hash validation
3. **PayHere Gateway**: User is redirected to PayHere's secure payment page
4. **Payment Processing**: User completes payment on PayHere's platform
5. **Return Handling**: User is redirected back to the application
6. **Status Update**: Payment status is updated via webhook notifications

### API Endpoints

The integration provides the following API endpoints:

- `POST /api/donors/payhere/notify` - PayHere webhook notifications
- `GET /api/donors/payhere/return` - Payment return handling
- `GET /api/donors/payhere/status/:order_id` - Payment status check
- `POST /api/donors/payhere/session` - Create payment session

## Testing

### Sandbox Mode

The integration includes sandbox mode for testing:

1. Set `REACT_APP_PAYHERE_SANDBOX=true` in your environment
2. Use PayHere's test credentials
3. Test payments will not be charged to real cards

### Test Component

A test component is available at `src/components/donor.components/payment.components/payhereTest.component.jsx` for testing the integration.

## Security Features

- **Hash Validation**: All payment responses are validated using MD5 hash
- **SSL Encryption**: All communications are encrypted
- **PCI DSS Compliance**: PayHere handles sensitive payment data
- **Secure Redirects**: Safe return URLs for payment completion

## Supported Currencies

- LKR (Sri Lankan Rupee) - Primary
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)

## Error Handling

The integration includes comprehensive error handling for:

- Invalid payment responses
- Network errors
- Payment failures
- User cancellations
- Timeout scenarios

## Monitoring and Logging

Payment transactions are logged with:

- Order IDs for tracking
- Payment status updates
- Error messages for debugging
- User interaction logs

## Production Deployment

Before going live:

1. Update environment variables with production credentials
2. Set `PAYHERE_SANDBOX=false`
3. Test with real payment methods
4. Configure proper webhook URLs
5. Set up monitoring and alerts

## Support

For PayHere-specific issues:

- PayHere Documentation: [support.payhere.lk](https://support.payhere.lk/)
- PayHere Support: Contact through your merchant account

For integration issues:

- Check the browser console for errors
- Verify environment variables
- Test with the provided test component
- Review payment logs in the backend

## Files Modified/Created

### Frontend Files:
- `src/utils/payhere-simple.utils.js` - PayHere service utility (dependency-free)
- `src/utils/payhere.utils.js` - PayHere service utility (with crypto-js dependency)
- `src/components/donor.components/donation.components/makeDonation.component.jsx` - Updated donation form
- `src/components/donor.components/payment.components/paymentResult.component.jsx` - Payment result page
- `src/components/donor.components/payment.components/payhereTest.component.jsx` - Test component
- `src/components/donor.components/dashboard.components/donorDashboard.component.jsx` - Updated dashboard

### Backend Files:
- `src/controllers/donor.controllers/payhere.controller.js` - PayHere controller
- `src/routes/donor.routes/payhere.route.js` - PayHere routes
- `src/config/payhere.config.js` - PayHere configuration
- `src/routes/donor.routes/donor.route.js` - Updated donor routes

## Next Steps

1. Set up your PayHere merchant account
2. Configure environment variables
3. Test the integration in sandbox mode
4. Deploy to production
5. Monitor payment transactions

The PayHere integration is now ready to process donations securely through the PayHere.lk payment gateway!
