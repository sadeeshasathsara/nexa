import { RefreshCw, Calendar, DollarSign, Target, CreditCard, Building2 } from 'lucide-react';
import React, { useState } from 'react';

const RecurringDonation = ({ onBack }) => {
  const [recurringData, setRecurringData] = useState({
    amount: '',
    currency: 'USD',
    frequency: 'monthly',
    institution: '',
    cause: '',
    startDate: '',
    endDate: '',
    paymentMethod: 'card',
    message: '',
    anonymous: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecurringData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate recurring donation setup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Recurring donation setup successful! Your first donation will be processed on the start date.');
      
      // Reset form
      setRecurringData({
        amount: '',
        currency: 'USD',
        frequency: 'monthly',
        institution: '',
        cause: '',
        startDate: '',
        endDate: '',
        paymentMethod: 'card',
        message: '',
        anonymous: false
      });
    } catch (error) {
      alert('Setup failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getFrequencyLabel = (freq) => {
    const labels = {
      weekly: 'Weekly',
      biweekly: 'Every 2 weeks',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly'
    };
    return labels[freq] || freq;
  };

  const calculateTotalDonations = () => {
    if (!recurringData.amount || !recurringData.startDate || !recurringData.endDate) return 0;
    
    const start = new Date(recurringData.startDate);
    const end = new Date(recurringData.endDate);
    const amount = parseFloat(recurringData.amount);
    
    if (start >= end) return 0;
    
    const frequencyMultipliers = {
      weekly: 52,
      biweekly: 26,
      monthly: 12,
      quarterly: 4,
      yearly: 1
    };
    
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const frequencyMultiplier = frequencyMultipliers[recurringData.frequency];
    
    if (recurringData.frequency === 'weekly' || recurringData.frequency === 'biweekly') {
      const weeksDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7));
      return Math.ceil(weeksDiff / (recurringData.frequency === 'weekly' ? 1 : 2)) * amount;
    }
    
    return Math.ceil(monthsDiff / (12 / frequencyMultiplier)) * amount;
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
            <RefreshCw className="w-8 h-8 text-blue-500 mr-3" />
            Set Up Recurring Educational Support
          </h1>
          <p className="text-gray-600 mt-2">Create lasting educational opportunities with automatic recurring support</p>
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
                      value={recurringData.currency}
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
                      value={recurringData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                      required
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Frequency Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Frequency
                  </label>
                  <select
                    name="frequency"
                    value={recurringData.frequency}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Every 2 weeks</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={recurringData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={recurringData.endDate}
                      onChange={handleInputChange}
                      min={recurringData.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    value={recurringData.institution}
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
                    value={recurringData.cause}
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

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={recurringData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {/* Personal Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={recurringData.message}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Share why you chose to support student education regularly..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Anonymous Donation */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={recurringData.anonymous}
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
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Setting Up Recurring Donation...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Set Up Recurring Donation
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recurring Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recurring Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">
                    {recurringData.amount ? `${recurringData.currency} ${recurringData.amount}` : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium">
                    {getFrequencyLabel(recurringData.frequency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Institution:</span>
                  <span className="font-medium">
                    {recurringData.institution ? recurringData.institution.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus Area:</span>
                  <span className="font-medium">
                    {recurringData.cause ? recurringData.cause.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}
                  </span>
                </div>
                {recurringData.startDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">
                      {new Date(recurringData.startDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {recurringData.endDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">
                      {new Date(recurringData.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {recurringData.amount && recurringData.startDate && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Total:</span>
                      <span className="font-bold text-lg text-blue-600">
                        {recurringData.currency} {calculateTotalDonations().toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">🌟 Benefits</h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• Consistent support for student education</li>
                <li>• Automatic processing - no need to remember</li>
                <li>• Easy to modify or cancel anytime</li>
                <li>• Tax benefits for regular educational support</li>
                <li>• Track how students benefit over time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringDonation;
