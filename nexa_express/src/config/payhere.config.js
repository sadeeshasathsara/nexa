// PayHere.lk Payment Gateway Configuration

const payHereConfig = {
  // PayHere Merchant Credentials
  // Get these from your PayHere merchant account
  merchantId: process.env.PAYHERE_MERCHANT_ID || '1217129',
  merchantSecret: process.env.PAYHERE_MERCHANT_SECRET || 'MzQ0NTU4NzE5MTMxMjE3MTI5OTUxMzE0ODUwMTE=',
  
  // PayHere Environment (sandbox for testing, production for live)
  sandboxMode: process.env.PAYHERE_SANDBOX === 'true' || true,
  
  // PayHere Endpoints
  checkoutUrl: process.env.PAYHERE_SANDBOX === 'true' 
    ? 'https://sandbox.payhere.lk/pay/checkout'
    : 'https://www.payhere.lk/pay/checkout',
  
  // Frontend and API URLs
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:5000',
  
  // Supported currencies
  supportedCurrencies: ['LKR', 'USD', 'EUR', 'GBP'],
  
  // Payment status codes
  statusCodes: {
    COMPLETED: '2',
    PENDING: '0',
    FAILED: '-1',
    CANCELLED: '-2'
  }
};

export default payHereConfig;
