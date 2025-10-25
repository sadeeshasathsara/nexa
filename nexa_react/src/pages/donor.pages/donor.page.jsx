import React, { useState } from 'react';
import RegisterDonor from '../../components/donor.components/register.components/registerDonor.component.jsx';
import LoginDonor from '../../components/donor.components/login.components/loginDonor.component.jsx';
import DonorDashboard from '../../components/donor.components/dashboard.components/donorDashboard.component.jsx';
import TestComponent from '../../components/TestComponent.jsx';
import SimpleDonorDashboard from '../../components/SimpleDonorDashboard.jsx';

function DonorPage() {
    const [currentView, setCurrentView] = useState('dashboard'); // 'login', 'register', 'dashboard'
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setCurrentView('dashboard');
    };

    const handleRegisterSuccess = () => {
        setIsAuthenticated(true);
        setCurrentView('dashboard');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentView('login');
    };

    if (isAuthenticated) {
        return <DonorDashboard onLogout={handleLogout} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Nexa</h1>
                    <p className="text-xl text-gray-600">Connect with causes that matter to you</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-2xl p-2 shadow-lg">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCurrentView('login')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                    currentView === 'login'
                                        ? 'bg-rose-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setCurrentView('register')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                    currentView === 'register'
                                        ? 'bg-rose-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="transition-all duration-300">
                    {currentView === 'login' && (
                        <LoginDonor onLoginSuccess={handleLoginSuccess} />
                    )}
                    {currentView === 'register' && (
                        <RegisterDonor onRegisterSuccess={handleRegisterSuccess} />
                    )}
                </div>

                {/* Footer Info */}
                <div className="text-center mt-12 text-gray-500">
                    <p>Join thousands of donors making a difference in education</p>
                </div>
            </div>
        </div>
    );
}

export default DonorPage;