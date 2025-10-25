import { RefreshCw, Calendar, DollarSign, Target, CreditCard, Building2, Plus, Trash2, Eye, EyeOff, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const RecurringDonation = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('setup'); // 'setup', 'payment-methods', 'schedule'
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
  
  // Mock data for payment methods
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
      holderName: 'John Doe'
    },
    {
      id: 'pm_2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
      holderName: 'John Doe'
    }
  ]);

  // Mock data for recurring donations
  const [activeRecurringDonations, setActiveRecurringDonations] = useState([
    {
      id: 'rd_1',
      amount: 50,
      currency: 'USD',
      frequency: 'monthly',
      institution: 'Local School District',
      cause: 'Math & Science',
      nextPaymentDate: '2024-02-15',
      status: 'active',
      paymentMethod: 'pm_1',
      startDate: '2024-01-15',
      totalDonated: 50,
      totalScheduled: 600
    },
    {
      id: 'rd_2',
      amount: 25,
      currency: 'USD',
      frequency: 'weekly',
      institution: 'Community College',
      cause: 'Computer Science',
      nextPaymentDate: '2024-02-12',
      status: 'active',
      paymentMethod: 'pm_2',
      startDate: '2024-01-08',
      totalDonated: 100,
      totalScheduled: 1300
    }
  ]);

  // Mock data for donation history
  const [donationHistory, setDonationHistory] = useState([
    {
      id: 'd_1',
      amount: 50,
      currency: 'USD',
      date: '2024-01-15',
      status: 'completed',
      institution: 'Local School District',
      cause: 'Math & Science',
      recurringId: 'rd_1'
    },
    {
      id: 'd_2',
      amount: 25,
      currency: 'USD',
      date: '2024-01-08',
      status: 'completed',
      institution: 'Community College',
      cause: 'Computer Science',
      recurringId: 'rd_2'
    },
    {
      id: 'd_3',
      amount: 25,
      currency: 'USD',
      date: '2024-01-15',
      status: 'completed',
      institution: 'Community College',
      cause: 'Computer Science',
      recurringId: 'rd_2'
    }
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'card',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    isDefault: false
  });

  const [showCardDetails, setShowCardDetails] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecurringData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentMethodChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPaymentMethod(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addPaymentMethod = () => {
    if (newPaymentMethod.cardNumber && newPaymentMethod.holderName) {
      const newMethod = {
        id: `pm_${Date.now()}`,
        type: 'card',
        last4: newPaymentMethod.cardNumber.slice(-4),
        brand: newPaymentMethod.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        expiryMonth: newPaymentMethod.expiryMonth,
        expiryYear: newPaymentMethod.expiryYear,
        isDefault: savedPaymentMethods.length === 0,
        holderName: newPaymentMethod.holderName
      };
      
      setSavedPaymentMethods(prev => [...prev, newMethod]);
      setNewPaymentMethod({
        type: 'card',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        holderName: '',
        isDefault: false
      });
    }
  };

  const removePaymentMethod = (id) => {
    setSavedPaymentMethods(prev => prev.filter(pm => pm.id !== id));
  };

  const setDefaultPaymentMethod = (id) => {
    setSavedPaymentMethods(prev => 
      prev.map(pm => ({ ...pm, isDefault: pm.id === id }))
    );
  };

  const toggleCardDetails = (id) => {
    setShowCardDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getNextPaymentDate = (frequency, lastPaymentDate) => {
    const date = new Date(lastPaymentDate);
    switch (frequency) {
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'biweekly':
        date.setDate(date.getDate() + 14);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate recurring donation setup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new recurring donation
      const newRecurringDonation = {
        id: `rd_${Date.now()}`,
        amount: parseFloat(recurringData.amount),
        currency: recurringData.currency,
        frequency: recurringData.frequency,
        institution: recurringData.institution,
        cause: recurringData.cause,
        nextPaymentDate: recurringData.startDate,
        status: 'active',
        paymentMethod: savedPaymentMethods.find(pm => pm.isDefault)?.id || savedPaymentMethods[0]?.id,
        startDate: recurringData.startDate,
        totalDonated: 0,
        totalScheduled: calculateTotalDonations()
      };
      
      setActiveRecurringDonations(prev => [...prev, newRecurringDonation]);
      
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
      
      // Switch to schedule view
      setCurrentView('schedule');
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

  // Payment Methods View
  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
          <button
            onClick={() => setCurrentView('setup')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Setup
          </button>
        </div>

        {/* Saved Payment Methods */}
        <div className="space-y-4 mb-6">
          {savedPaymentMethods.map((method) => (
            <div key={method.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{method.brand} •••• {method.last4}</span>
                      {method.isDefault && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {method.holderName} • Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCardDetails(method.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    {showCardDetails[method.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {!method.isDefault && (
                    <button
                      onClick={() => setDefaultPaymentMethod(method.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => removePaymentMethod(method.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {showCardDetails[method.id] && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Full card number: **** **** **** {method.last4}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Payment Method */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={newPaymentMethod.cardNumber}
                onChange={handlePaymentMethodChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                name="holderName"
                value={newPaymentMethod.holderName}
                onChange={handlePaymentMethodChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Month</label>
              <select
                name="expiryMonth"
                value={newPaymentMethod.expiryMonth}
                onChange={handlePaymentMethodChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Year</label>
              <select
                name="expiryYear"
                value={newPaymentMethod.expiryYear}
                onChange={handlePaymentMethodChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() + i}>
                    {new Date().getFullYear() + i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={addPaymentMethod}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Schedule View
  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recurring Donations</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('setup')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Recurring Donation
            </button>
            <button
              onClick={() => setCurrentView('payment-methods')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Methods
            </button>
          </div>
        </div>

        {/* Active Recurring Donations */}
        <div className="space-y-4">
          {activeRecurringDonations.map((donation) => (
            <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {donation.currency} {donation.amount} {getFrequencyLabel(donation.frequency)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {donation.institution} • {donation.cause}
                    </p>
                    <p className="text-sm text-gray-500">
                      Next payment: {new Date(donation.nextPaymentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Total donated: {donation.currency} {donation.totalDonated}
                    </p>
                    <p className="text-sm text-gray-500">
                      Scheduled: {donation.currency} {donation.totalScheduled}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      donation.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {donation.status}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donation History */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Donations</h3>
          <div className="space-y-2">
            {donationHistory.slice(0, 5).map((donation) => (
              <div key={donation.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {donation.currency} {donation.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                      {donation.institution} • {donation.cause}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {new Date(donation.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-green-600">
                    {donation.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
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
              {currentView === 'setup' && 'Set Up Recurring Educational Support'}
              {currentView === 'payment-methods' && 'Payment Methods'}
              {currentView === 'schedule' && 'Recurring Donations'}
            </h1>
            <p className="text-gray-600 mt-2">
              {currentView === 'setup' && 'Create lasting educational opportunities with automatic recurring support'}
              {currentView === 'payment-methods' && 'Manage your saved payment methods'}
              {currentView === 'schedule' && 'View and manage your recurring donations'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentView('setup')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'setup'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Setup
            </button>
            <button
              onClick={() => setCurrentView('payment-methods')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'payment-methods'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setCurrentView('schedule')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'schedule'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Schedule
            </button>
          </div>
        </div>

        {/* Main Content */}
        {currentView === 'setup' && (
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
        )}

        {currentView === 'payment-methods' && renderPaymentMethods()}
        {currentView === 'schedule' && renderSchedule()}
      </div>
    </div>
  );
};

export default RecurringDonation;