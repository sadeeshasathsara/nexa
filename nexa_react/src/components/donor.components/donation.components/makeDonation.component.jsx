import { Heart, DollarSign, CreditCard, Building2, Target, Calendar, Shield, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import payHereService from '../../../utils/payhere-simple.utils.js';

const MakeDonation = ({ onBack }) => {
  const [donationData, setDonationData] = useState({
    amount: '',
    currency: 'USD',
    institution: '',
    cause: '',
    message: '',
    anonymous: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('payhere');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      country: 'Sri Lanka'
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDonorInfoChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setDonorInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setDonorInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'payhere') {
        // Validate required fields for PayHere
        if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
          alert('Please fill in your personal information for payment processing.');
          setIsProcessing(false);
          return;
        }

        // Submit payment to PayHere
        const result = payHereService.submitPayment(donationData, donorInfo);
        
        if (result.success) {
          // Payment form submitted successfully
          alert('Redirecting to PayHere payment gateway. Please complete your payment there.');
        } else {
          alert(`Payment submission failed: ${result.message}`);
        }
      } else {
        // Simulate other payment methods
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Donation successful! Thank you for your generosity.');
      }
      
      // Reset form only if not using PayHere (PayHere handles its own flow)
      if (paymentMethod !== 'payhere') {
        setDonationData({
          amount: '',
          currency: 'USD',
          institution: '',
          cause: '',
          message: '',
          anonymous: false
        });
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('Donation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
                  <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            Support Student Education
          </h1>
          <p className="text-gray-600 mt-2">Help students access quality education and tutoring services</p>
        </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('payhere')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        paymentMethod === 'payhere'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Shield className="w-6 h-6" />
                        <div className="text-left">
                          <div className="font-medium">PayHere.lk</div>
                          <div className="text-sm text-gray-600">Secure payment gateway</div>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('other')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        paymentMethod === 'other'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-6 h-6" />
                        <div className="text-left">
                          <div className="font-medium">Other Methods</div>
                          <div className="text-sm text-gray-600">Coming soon</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Amount Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount
                  </label>
                  <div className="flex items-center space-x-3">
                    <select
                      name="currency"
                      value={donationData.currency}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="LKR">LKR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <input
                      type="number"
                      name="amount"
                      value={donationData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                      required
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Institution Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Educational Institution
                  </label>
                  <select
                    name="institution"
                    value={donationData.institution}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose an educational institution</option>
                    <option value="local-school-district">Local School District</option>
                    <option value="community-college">Community College</option>
                    <option value="after-school-program">After-School Program</option>
                    <option value="tutoring-center">Tutoring Center</option>
                    <option value="online-learning-platform">Online Learning Platform</option>
                    <option value="special-education-center">Special Education Center</option>
                  </select>
                </div>

                {/* Cause Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Educational Focus Area
                  </label>
                  <select
                    name="cause"
                    value={donationData.cause}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an educational focus area</option>
                    <option value="math-science">Math & Science</option>
                    <option value="language-arts">Language Arts & Reading</option>
                    <option value="computer-science">Computer Science & Technology</option>
                    <option value="special-needs">Special Needs Education</option>
                    <option value="college-prep">College Preparation</option>
                    <option value="vocational-training">Vocational Training</option>
                    <option value="early-childhood">Early Childhood Education</option>
                  </select>
                </div>

                {/* Personal Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={donationData.message}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Share why supporting student education matters to you..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Donor Information for PayHere */}
                {paymentMethod === 'payhere' && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={donorInfo.firstName}
                          onChange={handleDonorInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={donorInfo.lastName}
                          onChange={handleDonorInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={donorInfo.email}
                          onChange={handleDonorInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={donorInfo.phone}
                          onChange={handleDonorInfoChange}
                          placeholder="+94XXXXXXXXX"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address.street"
                          value={donorInfo.address.street}
                          onChange={handleDonorInfoChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="address.city"
                          value={donorInfo.address.city}
                          onChange={handleDonorInfoChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <Shield className="inline w-4 h-4 mr-1" />
                        Your payment information is securely processed by PayHere.lk. We do not store your payment details.
                      </p>
                    </div>
                  </div>
                )}

                {/* Anonymous Donation */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={donationData.anonymous}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Make this educational support anonymous
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {paymentMethod === 'payhere' ? 'Redirecting to PayHere...' : 'Processing Donation...'}
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'payhere' ? (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Pay with PayHere
                        </>
                      ) : (
                        <>
                          <DollarSign className="w-5 h-5 mr-2" />
                          Complete Donation
                        </>
                      )}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">
                    {donationData.amount ? `${donationData.currency} ${donationData.amount}` : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Institution:</span>
                  <span className="font-medium">
                    {donationData.institution ? donationData.institution.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus Area:</span>
                  <span className="font-medium">
                    {donationData.cause ? donationData.cause.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}
                  </span>
                </div>
              </div>
            </div>

            {/* PayHere Information */}
            {paymentMethod === 'payhere' && (
              <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  PayHere.lk Security
                </h3>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• SSL encrypted payment processing</li>
                  <li>• PCI DSS compliant security</li>
                  <li>• Secure payment gateway</li>
                  <li>• Multiple payment methods supported</li>
                </ul>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Quick Tips</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Your support is tax-deductible</li>
                <li>• 100% goes directly to student education</li>
                <li>• You'll receive impact reports via email</li>
                <li>• Track how students benefit from your support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeDonation;
