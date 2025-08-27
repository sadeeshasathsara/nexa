import React, { useState } from 'react';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Shield,
    CheckCircle,
    User,
    Chrome,
    Github,
    AlertCircle
} from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Login attempt:', { ...formData, rememberMe });
            // Handle successful login here
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        // Handle social login
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23e2e8f0\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

            <div className="relative w-full max-w-md">
                {/* Main Login Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-blue-100">Sign in to your account</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <div className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter your email"
                                        disabled={isLoading}
                                    />
                                    {errors.email && (
                                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                                    )}
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        disabled={isLoading}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 cursor-pointer"
                                    disabled={isLoading}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 cursor-pointer"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Signing In...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        Sign In
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Google')}
                                disabled={isLoading}
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Chrome className="w-5 h-5 text-gray-600 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('GitHub')}
                                disabled={isLoading}
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Github className="w-5 h-5 text-gray-600 mr-2" />
                                <span className="text-sm font-medium text-gray-700">GitHub</span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                    disabled={isLoading}
                                >
                                    Sign up here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Features */}
                <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
                        <div className="flex items-center">
                            <Shield className="w-4 h-4 text-green-500 mr-1" />
                            <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span>Privacy Protected</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-center text-xs text-gray-500">
                    <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;