import React, { useState, useEffect } from 'react';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    User,
    Chrome,
    Github,
    AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Login attempt:', { ...formData, rememberMe });
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
    };

    return (
        <div className="w-full max-w-md mx-auto h-full">
            <div
                className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden h-full flex flex-col transition-all duration-1000 ease-out ${isLoaded
                    ? 'opacity-100 transform translate-y-0 scale-100'
                    : 'opacity-0 transform translate-y-8 scale-95'
                    }`}
                style={{
                    transitionDelay: '200ms'
                }}
            >
                {/* Header */}
                <div
                    className={`px-6 py-6 text-center flex-shrink-0 transition-all duration-800 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                        }`}
                    style={{
                        background: 'linear-gradient(135deg, #043345 0%, #0D9AAC 100%)',
                        transitionDelay: '400ms'
                    }}
                >
                    <div
                        className={`w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-600 ease-out ${isLoaded ? 'opacity-100 transform rotate-0 scale-100' : 'opacity-0 transform rotate-180 scale-50'
                            }`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <h1
                        className={`text-xl font-bold text-white mb-1 transition-all duration-600 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                            }`}
                        style={{ transitionDelay: '700ms' }}
                    >
                        Welcome Back
                    </h1>
                    <p
                        className={`text-sm text-white/80 transition-all duration-600 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                            }`}
                        style={{ transitionDelay: '800ms' }}
                    >
                        Sign in to continue
                    </p>
                </div>

                {/* Form Content - Scrollable */}
                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div
                            className={`transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'
                                }`}
                            style={{ transitionDelay: '900ms' }}
                        >
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-1.5"
                                style={{ color: '#043345' }}
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedField === 'email' ? 'scale-110' : 'scale-100'
                                        }`}
                                    style={{ color: focusedField === 'email' ? '#00FF99' : '#0D9AAC' }}
                                />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`w-full outline-none pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-300 ${errors.email
                                        ? 'border-red-300 bg-red-50'
                                        : focusedField === 'email'
                                            ? 'border-[#00FF99] bg-gradient-to-r from-[#00FF99]/5 to-[#00B6C7]/5 shadow-lg ring-2 ring-[#00FF99]/20'
                                            : 'border-gray-200 hover:border-[#00B6C7]/50 focus:ring-[#00B6C7]/20'
                                        }`}
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4 animate-pulse" />
                                )}
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600 flex items-center animate-slideDown">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div
                            className={`transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'
                                }`}
                            style={{ transitionDelay: '1000ms' }}
                        >
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-1.5"
                                style={{ color: '#043345' }}
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedField === 'password' ? 'scale-110' : 'scale-100'
                                        }`}
                                    style={{ color: focusedField === 'password' ? '#00FF99' : '#0D9AAC' }}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`w-full outline-none pl-10 pr-10 py-2.5 border rounded-lg transition-all duration-300 ${errors.password
                                        ? 'border-red-300 bg-red-50'
                                        : focusedField === 'password'
                                            ? 'border-[#00FF99] bg-gradient-to-r from-[#00FF99]/5 to-[#00B6C7]/5 shadow-lg ring-2 ring-[#00FF99]/20'
                                            : 'border-gray-200 hover:border-[#00B6C7]/50 focus:ring-[#00B6C7]/20'
                                        }`}
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 hover:scale-110"
                                    style={{ color: '#0D9AAC' }}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600 flex items-center animate-slideDown">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div
                            className={`flex items-center justify-between transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                                }`}
                            style={{ transitionDelay: '1100ms' }}
                        >
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-3.5 h-3.5 outline-none rounded border-gray-300 focus:ring-0 cursor-pointer transition-all duration-300 group-hover:scale-110"
                                    style={{ accentColor: '#00B6C7' }}
                                    disabled={isLoading}
                                />
                                <span className="ml-2 text-sm text-gray-600 group-hover:text-[#043345] transition-colors duration-300">
                                    Remember me
                                </span>
                            </label>
                            <button
                                type="button"
                                className="text-sm font-medium transition-all duration-300 cursor-pointer hover:underline hover:scale-105"
                                style={{ color: '#0D9AAC' }}
                                disabled={isLoading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <div
                            className={`transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-4 scale-95'
                                }`}
                            style={{ transitionDelay: '1200ms' }}
                        >
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full text-white py-2.5 px-4 rounded-lg font-semibold focus:ring-4 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-102 active:scale-98 disabled:hover:scale-100 cursor-pointer hover:shadow-xl"
                                style={{
                                    background: isLoading
                                        ? 'linear-gradient(135deg, #666 0%, #999 100%)'
                                        : 'linear-gradient(135deg, #009966 0%, #00FF99 100%)',
                                    boxShadow: isLoading ? 'none' : '0 4px 20px rgba(0, 255, 153, 0.3)'
                                }}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Signing In...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        Sign In
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div
                            className={`my-5 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
                                }`}
                            style={{ transitionDelay: '1300ms' }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div
                            className={`grid grid-cols-2 gap-3 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                                }`}
                            style={{ transitionDelay: '1400ms' }}
                        >
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Google')}
                                disabled={isLoading}
                                className="flex items-center justify-center px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-[#00B6C7]/5 hover:to-[#00FF99]/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#00B6C7]/30 hover:scale-105 hover:shadow-lg"
                            >
                                <Chrome className="w-4 h-4 text-gray-600 mr-2 transition-colors duration-300 group-hover:text-[#0D9AAC]" />
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('GitHub')}
                                disabled={isLoading}
                                className="flex items-center justify-center px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-[#00B6C7]/5 hover:to-[#00FF99]/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#00B6C7]/30 hover:scale-105 hover:shadow-lg"
                            >
                                <Github className="w-4 h-4 text-gray-600 mr-2 transition-colors duration-300 group-hover:text-[#0D9AAC]" />
                                <span className="text-sm font-medium text-gray-700">GitHub</span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div
                            className={`mt-5 text-center transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                                }`}
                            style={{ transitionDelay: '1500ms' }}
                        >
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    onClick={() => navigate('/v1/register')}
                                    type="button"
                                    className="font-medium cursor-pointer transition-all duration-300 hover:underline hover:scale-102"
                                    style={{ color: '#0D9AAC' }}
                                    disabled={isLoading}
                                >
                                    Sign up here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Custom Scrollbar and Animation Styles */}
                <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #00B6C7 0%, #00FF99 100%);
                    border-radius: 3px;
                    transition: all 0.3s ease;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #009966 0%, #00B6C7 100%);
                    width: 8px;
                }
                
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #00B6C7 rgba(255, 255, 255, 0.1);
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                `}</style>

            </div>
        </div>
    );
};

export default LoginCard;