import { Heart, DollarSign, Calendar, TrendingUp, User, Settings, LogOut, Gift, Target, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import MakeDonation from '../donation.components/makeDonation.component.jsx';
import RecurringDonation from '../recurring.components/recurringDonation.component.jsx';
import ViewImpact from '../impact.components/viewImpact.component.jsx';

const DonorDashboard = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [activeTab, setActiveTab] = useState('overview');
    const [donor, setDonor] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        profilePicture: null,
        preferredCauses: ['education', 'healthcare'],
        donationFrequency: 'monthly',
        preferredCurrency: 'USD',
        address: {
            city: 'New York',
            country: 'USA'
        }
    });

    const [statistics, setStatistics] = useState({
        totalDonations: 24,
        totalAmount: 2500,
        thisMonth: 200,
        thisYear: 1200
    });

    const [recentDonations, setRecentDonations] = useState([
        {
            id: 1,
            institution: 'Education First Foundation',
            amount: 100,
            currency: 'USD',
            date: '2024-01-15',
            status: 'completed',
            purpose: 'scholarship'
        },
        {
            id: 2,
            institution: 'Community Health Center',
            amount: 150,
            currency: 'USD',
            date: '2024-01-10',
            status: 'completed',
            purpose: 'healthcare'
        },
        {
            id: 3,
            institution: 'Local School District',
            amount: 75,
            currency: 'USD',
            date: '2024-01-05',
            status: 'completed',
            purpose: 'infrastructure'
        }
    ]);

    const handleNavigateToMakeDonation = () => setCurrentView('makeDonation');
    const handleNavigateToRecurring = () => setCurrentView('recurring');
    const handleNavigateToImpact = () => setCurrentView('impact');
    const handleBackToDashboard = () => setCurrentView('dashboard');

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Donations</p>
                            <p className="text-2xl font-bold text-gray-900">{statistics.totalDonations}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Gift className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Amount</p>
                            <p className="text-2xl font-bold text-gray-900">${statistics.totalAmount}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">${statistics.thisMonth}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">This Year</p>
                            <p className="text-2xl font-bold text-gray-900">${statistics.thisYear}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Donations</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {recentDonations.map((donation) => (
                            <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-rose-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{donation.institution}</p>
                                        <p className="text-sm text-gray-600 capitalize">{donation.purpose}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">${donation.amount}</p>
                                    <p className="text-sm text-gray-600">{new Date(donation.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button className="text-rose-600 hover:text-rose-700 font-medium">
                            View All Donations
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button 
                            onClick={handleNavigateToMakeDonation}
                            className="p-4 border border-rose-200 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                            <Heart className="w-6 h-6 mx-auto mb-2" />
                            <span className="block text-sm font-medium">Support Student Education</span>
                        </button>
                        <button 
                            onClick={handleNavigateToRecurring}
                            className="p-4 border border-blue-200 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            <Target className="w-6 h-6 mx-auto mb-2" />
                            <span className="block text-sm font-medium">Set Up Recurring Support</span>
                        </button>
                        <button 
                            onClick={handleNavigateToImpact}
                            className="p-4 border border-green-200 rounded-xl text-green-600 hover:bg-green-50 transition-colors"
                        >
                            <Gift className="w-6 h-6 mx-auto mb-2" />
                            <span className="block text-sm font-medium">View Student Impact</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900">
                                {donor.firstName} {donor.lastName}
                            </h4>
                            <p className="text-gray-600">{donor.email}</p>
                            <p className="text-sm text-gray-500">
                                <MapPin className="inline w-4 h-4 mr-1" />
                                {donor.address.city}, {donor.address.country}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                value={donor.firstName}
                                onChange={(e) => setDonor({...donor, firstName: e.target.value})}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                value={donor.lastName}
                                onChange={(e) => setDonor({...donor, lastName: e.target.value})}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={donor.email}
                                onChange={(e) => setDonor({...donor, email: e.target.value})}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Donation Frequency</label>
                            <select
                                value={donor.donationFrequency}
                                onChange={(e) => setDonor({...donor, donationFrequency: e.target.value})}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            >
                                <option value="one-time">One Time</option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Causes</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {['education', 'healthcare', 'poverty', 'environment', 'arts', 'sports', 'technology', 'other'].map((cause) => (
                                <label key={cause} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={donor.preferredCauses.includes(cause)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setDonor({
                                                    ...donor,
                                                    preferredCauses: [...donor.preferredCauses, cause]
                                                });
                                            } else {
                                                setDonor({
                                                    ...donor,
                                                    preferredCauses: donor.preferredCauses.filter(c => c !== cause)
                                                });
                                            }
                                        }}
                                        className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                                    />
                                    <span className="text-sm capitalize">{cause}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Change Password</h4>
                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                            <button className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                                Update Password
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Notification Preferences</h4>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3">
                                <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" defaultChecked />
                                <span className="text-sm text-gray-700">Email notifications for new campaigns</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" defaultChecked />
                                <span className="text-sm text-gray-700">Monthly donation summaries</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" />
                                <span className="text-sm text-gray-700">Impact reports and updates</span>
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-md font-medium text-red-600 mb-4">Danger Zone</h4>
                        <button className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            Deactivate Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render different views based on currentView state
    if (currentView === 'makeDonation') {
        return <MakeDonation onBack={handleBackToDashboard} />;
    }

    if (currentView === 'recurring') {
        return <RecurringDonation onBack={handleBackToDashboard} />;
    }

    if (currentView === 'impact') {
        return <ViewImpact onBack={handleBackToDashboard} />;
    }

    // Main dashboard view
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900">Donor Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {donor.firstName} {donor.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">{donor.email}</p>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', label: 'Overview', icon: Heart },
                                    { id: 'profile', label: 'Profile', icon: User },
                                    { id: 'settings', label: 'Settings', icon: Settings }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                            activeTab === item.id
                                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'profile' && renderProfile()}
                        {activeTab === 'settings' && renderSettings()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;




