import { Heart, DollarSign, CreditCard, Building2, Target, Calendar } from 'lucide-react';
import React, { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate donation processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Donation successful! Thank you for your generosity.');
      
      // Reset form
      setDonationData({
        amount: '',
        currency: 'USD',
        institution: '',
        cause: '',
        message: '',
        anonymous: false
      });
    } catch (error) {
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
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
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
                      Processing Donation...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-5 h-5 mr-2" />
                      Complete Donation
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
