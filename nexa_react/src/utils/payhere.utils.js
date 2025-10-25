// PayHere.lk Payment Gateway Integration Utility

class PayHereService {
  constructor() {
    // PayHere configuration - these should be moved to environment variables
    // Use import.meta.env for Vite instead of process.env
    this.merchantId = import.meta.env.VITE_PAYHERE_MERCHANT_ID || '1217129'; // Test merchant ID
    this.merchantSecret = import.meta.env.VITE_PAYHERE_MERCHANT_SECRET || 'MzQ0NTU4NzE5MTMxMjE3MTI5OTUxMzE0ODUwMTE='; // Test merchant secret
    this.sandboxMode = import.meta.env.VITE_PAYHERE_SANDBOX === 'true' || true; // Default to sandbox for testing
    
    // PayHere endpoints
    this.checkoutUrl = this.sandboxMode 
      ? 'https://sandbox.payhere.lk/pay/checkout'
      : 'https://www.payhere.lk/pay/checkout';
    
    // API endpoints
    this.apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }

  /**
   * Generate MD5 hash using Web Crypto API
   * @param {string} text - Text to hash
   * @returns {Promise<string>} - Generated hash
   */
  async generateMD5Hash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  /**
   * Generate hash for PayHere payment security
   * @param {Object} paymentData - Payment data object
   * @returns {Promise<string>} - Generated hash
   */
  async generateHash(paymentData) {
    const {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
      order_id,
      items,
      currency,
      amount
    } = paymentData;

    // Create hash string in the order specified by PayHere
    const hashString = 
      this.merchantSecret + 
      merchant_id + 
      order_id + 
      amount + 
      currency + 
      first_name + 
      last_name + 
      email + 
      phone + 
      address + 
      city + 
      country + 
      items + 
      return_url + 
      cancel_url + 
      notify_url;

    // Generate MD5 hash using Web Crypto API
    return await this.generateMD5Hash(hashString);
  }

  /**
   * Create payment form data for PayHere
   * @param {Object} donationData - Donation form data
   * @param {Object} donorData - Donor information
   * @returns {Promise<Object>} - Formatted payment data for PayHere
   */
  async createPaymentData(donationData, donorData) {
    const orderId = `DONATION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const amount = parseFloat(donationData.amount).toFixed(2);
    
    const paymentData = {
      merchant_id: this.merchantId,
      return_url: `${window.location.origin}/donor/dashboard?payment=success`,
      cancel_url: `${window.location.origin}/donor/dashboard?payment=cancelled`,
      notify_url: `${this.apiUrl}/api/donors/payhere/notify`,
      first_name: donorData.firstName || 'Anonymous',
      last_name: donorData.lastName || 'Donor',
      email: donorData.email || 'donor@example.com',
      phone: donorData.phone || '+94123456789',
      address: donorData.address?.street || '123 Main Street',
      city: donorData.address?.city || 'Colombo',
      country: donorData.address?.country || 'Sri Lanka',
      order_id: orderId,
      items: `Donation for ${donationData.institution} - ${donationData.cause}`,
      currency: donationData.currency,
      amount: amount
    };

    // Generate hash for security
    paymentData.hash = await this.generateHash(paymentData);

    return paymentData;
  }

  /**
   * Submit payment to PayHere
   * @param {Object} donationData - Donation form data
   * @param {Object} donorData - Donor information
   * @returns {Promise} - Payment submission result
   */
  async submitPayment(donationData, donorData) {
    try {
      const paymentData = await this.createPaymentData(donationData, donorData);
      
      // Create a form and submit it to PayHere
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = this.checkoutUrl;
      form.target = '_blank'; // Open in new tab

      // Add all payment data as hidden inputs
      Object.keys(paymentData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData[key];
        form.appendChild(input);
      });

      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      return {
        success: true,
        orderId: paymentData.order_id,
        message: 'Redirecting to PayHere payment gateway...'
      };

    } catch (error) {
      console.error('PayHere payment submission error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Payment submission failed. Please try again.'
      };
    }
  }

  /**
   * Validate payment response from PayHere
   * @param {Object} responseData - Response data from PayHere
   * @returns {Promise<boolean>} - Whether the response is valid
   */
  async validatePaymentResponse(responseData) {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig
    } = responseData;

    // Create hash string for validation
    const hashString = 
      this.merchantSecret + 
      merchant_id + 
      order_id + 
      payhere_amount + 
      payhere_currency + 
      status_code;

    const calculatedHash = await this.generateMD5Hash(hashString);
    
    return calculatedHash === md5sig;
  }

  /**
   * Handle payment success
   * @param {Object} responseData - Payment response data
   * @returns {Promise<Object>} - Processed success response
   */
  async handlePaymentSuccess(responseData) {
    const isValid = await this.validatePaymentResponse(responseData);
    
    if (!isValid) {
      return {
        success: false,
        error: 'Invalid payment response signature'
      };
    }

    return {
      success: true,
      paymentId: responseData.payment_id,
      orderId: responseData.order_id,
      amount: responseData.payhere_amount,
      currency: responseData.payhere_currency,
      status: responseData.status_code
    };
  }

  /**
   * Get supported currencies for PayHere
   * @returns {Array} - List of supported currencies
   */
  getSupportedCurrencies() {
    return [
      { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs.' },
      { code: 'USD', name: 'US Dollar', symbol: '$' },
      { code: 'EUR', name: 'Euro', symbol: '€' },
      { code: 'GBP', name: 'British Pound', symbol: '£' }
    ];
  }
}

// Create and export a singleton instance
const payHereService = new PayHereService();
export default payHereService;
