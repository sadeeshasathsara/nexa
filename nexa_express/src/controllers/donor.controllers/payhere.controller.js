import Donation from '../../models/donor.models/donation.model.js';
import Donor from '../../models/donor.models/donor.model.js';
import crypto from 'crypto';

/**
 * PayHere Payment Gateway Controller
 * Handles PayHere.lk payment notifications and callbacks
 */

// PayHere configuration
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'MzQ0NTU4NzE5MTMxMjE3MTI5OTUxMzE0ODUwMTE=';

/**
 * Validate PayHere payment response
 * @param {Object} data - Payment response data from PayHere
 * @returns {boolean} - Whether the response is valid
 */
const validatePayHereResponse = (data) => {
  const {
    merchant_id,
    order_id,
    payment_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig
  } = data;

  // Create hash string for validation
  const hashString = 
    PAYHERE_MERCHANT_SECRET + 
    merchant_id + 
    order_id + 
    payhere_amount + 
    payhere_currency + 
    status_code;

  const calculatedHash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();
  
  return calculatedHash === md5sig;
};

/**
 * Handle PayHere payment notification
 * This endpoint receives payment status updates from PayHere
 */
export const handlePayHereNotification = async (req, res) => {
  try {
    const paymentData = req.body;
    
    console.log('PayHere notification received:', paymentData);

    // Validate the payment response
    if (!validatePayHereResponse(paymentData)) {
      console.error('Invalid PayHere response signature');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment response signature' 
      });
    }

    const {
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
      items
    } = paymentData;

    // Find existing donation by order_id
    let donation = await Donation.findOne({ 
      transactionId: order_id 
    });

    if (!donation) {
      // Create new donation record if not exists
      // Note: In a real implementation, you'd need to find the donor by email or other identifier
      const donor = await Donor.findOne({ email }) || await Donor.create({
        firstName: first_name,
        lastName: last_name,
        email,
        phone,
        address: {
          street: address,
          city,
          country
        }
      });

      donation = await Donation.create({
        donor: donor._id,
        institution: null, // You might want to extract this from items or other data
        amount: parseFloat(payhere_amount),
        currency: payhere_currency,
        donationType: 'one-time',
        purpose: 'general',
        paymentMethod: 'payhere',
        transactionId: order_id,
        status: status_code === '2' ? 'completed' : 'failed',
        message: items,
        processedAt: new Date()
      });
    } else {
      // Update existing donation
      donation.status = status_code === '2' ? 'completed' : 'failed';
      donation.transactionId = payment_id;
      donation.processedAt = new Date();
      await donation.save();
    }

    // Log the payment status
    console.log(`Payment ${order_id} status: ${status_code === '2' ? 'COMPLETED' : 'FAILED'}`);

    // Return success response to PayHere
    res.status(200).json({ 
      success: true, 
      message: 'Payment notification processed successfully' 
    });

  } catch (error) {
    console.error('PayHere notification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing payment notification',
      error: error.message 
    });
  }
};

/**
 * Handle PayHere payment return (success/cancel)
 * This endpoint handles users returning from PayHere
 */
export const handlePayHereReturn = async (req, res) => {
  try {
    const { payment_id, order_id, status_code } = req.query;
    
    console.log('PayHere return received:', { payment_id, order_id, status_code });

    // Find the donation
    const donation = await Donation.findOne({ transactionId: order_id });
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Update donation status based on return status
    if (status_code === '2') {
      donation.status = 'completed';
      donation.transactionId = payment_id;
      donation.processedAt = new Date();
      await donation.save();
    }

    // Redirect to frontend with appropriate status
    const redirectUrl = status_code === '2' 
      ? `${process.env.FRONTEND_URL || 'http://localhost:3000'}/donor/dashboard?payment=success&order_id=${order_id}`
      : `${process.env.FRONTEND_URL || 'http://localhost:3000'}/donor/dashboard?payment=failed&order_id=${order_id}`;

    res.redirect(redirectUrl);

  } catch (error) {
    console.error('PayHere return error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/donor/dashboard?payment=error`);
  }
};

/**
 * Get payment status
 * Check the status of a specific payment
 */
export const getPaymentStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    
    const donation = await Donation.findOne({ transactionId: order_id });
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        orderId: donation.transactionId,
        status: donation.status,
        amount: donation.amount,
        currency: donation.currency,
        createdAt: donation.createdAt,
        processedAt: donation.processedAt
      }
    });

  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving payment status',
      error: error.message
    });
  }
};

/**
 * Create PayHere payment session
 * Initialize a payment session for PayHere
 */
export const createPayHereSession = async (req, res) => {
  try {
    const { donationData, donorData } = req.body;
    
    // Validate required fields
    if (!donationData.amount || !donationData.currency) {
      return res.status(400).json({
        success: false,
        message: 'Amount and currency are required'
      });
    }

    // Create a pending donation record
    const donor = await Donor.findOne({ email: donorData.email }) || await Donor.create({
      firstName: donorData.firstName,
      lastName: donorData.lastName,
      email: donorData.email,
      phone: donorData.phone,
      address: donorData.address
    });

    const orderId = `DONATION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const donation = await Donation.create({
      donor: donor._id,
      institution: null, // You might want to extract this from donationData
      amount: parseFloat(donationData.amount),
      currency: donationData.currency,
      donationType: 'one-time',
      purpose: donationData.cause || 'general',
      paymentMethod: 'payhere',
      transactionId: orderId,
      status: 'pending',
      message: donationData.message,
      isAnonymous: donationData.anonymous
    });

    res.status(200).json({
      success: true,
      data: {
        orderId: donation.transactionId,
        amount: donation.amount,
        currency: donation.currency
      }
    });

  } catch (error) {
    console.error('Create PayHere session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment session',
      error: error.message
    });
  }
};
