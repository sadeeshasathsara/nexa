import React, { useState, useEffect } from 'react';
import Portal from './portal.component';
import Notification from './notification.component';
import OTPInput from './otpInput.component';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    Check,
    X,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { otpApi, validateOtpApi } from '../../../../apis/global.apis/otp.api';
import { resetPassword } from '../../../../apis/global.apis/resetPassword.api';

function ForgotPasswordComponent({ togglePopup, show = false }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });
    const [errors, setErrors] = useState({});
    const [otpResetFunction, setOtpResetFunction] = useState(null);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState(false);

    const handleCaptcha = (token) => {
        setCaptchaToken(token);
    };

    // Reset form when popup opens/closes
    useEffect(() => {
        if (show) {
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
            setErrors({});
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    }, [show]);

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
    };

    const hideNotification = () => {
        setNotification({ show: false, type: '', message: '' });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            minLength,
            hasUpper,
            hasLower,
            hasNumber,
            hasSpecial,
            isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
        };
    };

    const validateCaptcha = () => {
        if (!captchaToken) {
            setCaptchaError(true)
            return;
        }
    }

    const handleStep1Submit = async () => {
        setErrors({});

        if (!validateEmail(email)) {
            setErrors({ email: 'Please enter a valid email address' });
            return;
        }
        if (!captchaToken) {
            alert("Please complete the captcha first!");
            return;
        }

        validateCaptcha();

        setLoading(true);

        try {
            const res = await otpApi({
                captchaToken: captchaToken,
                email: email
            })

            if (!res || !res.success) {
                showNotification('error', res?.message || 'reCAPTCHA failed.');
                return;
            }

            showNotification('success', 'OTP sent to your email successfully!');
            setStep(2);
        } catch (e) {
            return;
        } finally {
            setLoading(false);
        }
    };

    const handleStep2Submit = async (otpValue = otp) => {
        setErrors({});

        if (otpValue.length !== 6) {
            setErrors({ otp: 'Please enter a valid 6-digit OTP' });
            return;
        }

        setLoading(true);

        try {
            setLoading(true);
            const res = await validateOtpApi({
                email: email,
                otp: otpValue
            });

            // Check if validation is successful
            if (res.success) {
                showNotification('success', 'OTP verified successfully!');
                setStep(3);
            } else {
                showNotification('error', res.message || 'Invalid OTP. Please try again.');
                setErrors({ otp: res.message || 'Invalid OTP. Please try again.' });
                // Reset OTP digits on failed attempt
                if (otpResetFunction) {
                    otpResetFunction();
                }
            }
        } catch (e) {
            showNotification('error', e.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStep3Submit = async () => {
        setErrors({});

        const passwordValidation = validatePassword(newPassword);
        const newErrors = {};

        if (!passwordValidation.isValid) {
            newErrors.password = 'Password does not meet requirements';
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const res = await resetPassword({ email, password: newPassword });
            if (res.success) {
                showNotification('success', 'Password reset successfully!');
                togglePopup();
            }
        } catch (e) {
            showNotification('error', e.message)
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => {
        if (step > 1) {
            setStep(step - 1);
            setErrors({});
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            togglePopup();
        }
    };

    const handleKeyDown = (e, action) => {
        if (e.key === 'Enter') {
            action();
        }
    };

    if (!show) return null;

    const passwordValidation = validatePassword(newPassword);

    const gradientStyle = {
        background: 'linear-gradient(135deg, #04384a 0%, #0b8395 100%)'
    };

    return (
        <Portal>
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
                onClick={handleBackdropClick}
            >
                <div className="bg-white h-[85vh] custom-scrollbar overflow-y-auto rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            {step > 1 && (
                                <button
                                    onClick={goBack}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </button>
                            )}
                            <h2 className="text-xl font-semibold text-gray-900">
                                Reset Password
                            </h2>
                        </div>
                        <button
                            onClick={togglePopup}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {[1, 2, 3].map((i) => (
                                <React.Fragment key={i}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${i === step
                                        ? 'text-white'
                                        : i < step
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}
                                        style={i === step ? gradientStyle : {}}
                                    >
                                        {i < step ? <Check className="w-4 h-4" /> : i}
                                    </div>
                                    {i < 3 && (
                                        <div className={`w-8 h-0.5 transition-colors duration-300 ${i < step ? 'bg-green-500' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Step {step} of 3: {
                                    step === 1 ? 'Enter Email' :
                                        step === 2 ? 'Verify OTP' :
                                            'Set New Password'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6">
                        {/* Step 1: Email */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                                        background: 'linear-gradient(135deg, rgba(4, 56, 74, 0.1) 0%, rgba(11, 131, 149, 0.1) 100%)'
                                    }}>
                                        <Mail className="w-8 h-8" style={{ color: '#0b8395' }} />
                                    </div>
                                    <p className="text-gray-600">
                                        Enter your email address and we'll send you an OTP to reset your password.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, handleStep1Submit)}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${errors.email
                                                ? 'border-red-500'
                                                : 'border-gray-300 focus:border-[#04384a] focus:ring-[#04384a]/20'
                                                }`}
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="recaptcha-wrapper w-full flex flex-col items-center justify-center">
                                    <ReCAPTCHA
                                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                        onChange={handleCaptcha}
                                    />

                                    {captchaError && (
                                        <span className="text-red-500 text-[10px]"> Please complete the reCAPTCHA</span>
                                    )}

                                </div>

                                <button
                                    onClick={handleStep1Submit}
                                    disabled={loading}
                                    className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={gradientStyle}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending OTP...
                                        </>
                                    ) : (
                                        'Send OTP'
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Step 2: OTP */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                                        background: 'linear-gradient(135deg, rgba(4, 56, 74, 0.1) 0%, rgba(11, 131, 149, 0.1) 100%)'
                                    }}>
                                        <Lock className="w-8 h-8" style={{ color: '#0b8395' }} />
                                    </div>
                                    <p className="text-gray-600 mb-2">
                                        We've sent a 6-digit OTP to
                                    </p>
                                    <p className="font-medium text-gray-900">{email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                                        Enter OTP
                                    </label>
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        onComplete={setOtpResetFunction}
                                        onAutoSubmit={handleStep2Submit}
                                        loading={loading}
                                    />
                                    {errors.otp && (
                                        <p className="text-red-500 text-sm mt-2 text-center">{errors.otp}</p>
                                    )}
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        Didn't receive the code?{' '}
                                        <button
                                            type="button"
                                            className="font-medium cursor-pointer transition-colors duration-200"
                                            style={{ color: '#0b8395' }}
                                            onClick={() => showNotification('success', 'OTP resent to your email!')}
                                        >
                                            Resend OTP
                                        </button>
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleStep2Submit()}
                                    disabled={loading || otp.length !== 6}
                                    className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={gradientStyle}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Step 3: New Password */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                                        background: 'linear-gradient(135deg, rgba(4, 56, 74, 0.1) 0%, rgba(11, 131, 149, 0.1) 100%)'
                                    }}>
                                        <Lock className="w-8 h-8" style={{ color: '#0b8395' }} />
                                    </div>
                                    <p className="text-gray-600">
                                        Create a strong new password for your account.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${errors.password
                                                ? 'border-red-500'
                                                : 'border-gray-300 focus:border-[#04384a] focus:ring-[#04384a]/20'
                                                }`}
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Password Requirements */}
                                    {newPassword && (
                                        <div className="mt-2 space-y-1">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.minLength ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className={passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}>
                                                    At least 8 characters
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasUpper ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className={passwordValidation.hasUpper ? 'text-green-600' : 'text-gray-500'}>
                                                    One uppercase letter
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasLower ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className={passwordValidation.hasLower ? 'text-green-600' : 'text-gray-500'}>
                                                    One lowercase letter
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasNumber ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className={passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}>
                                                    One number
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasSpecial ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className={passwordValidation.hasSpecial ? 'text-green-600' : 'text-gray-500'}>
                                                    One special character
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, handleStep3Submit)}
                                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${errors.confirmPassword
                                                ? 'border-red-500'
                                                : 'border-gray-300 focus:border-[#04384a] focus:ring-[#04384a]/20'
                                                }`}
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                <button
                                    onClick={handleStep3Submit}
                                    disabled={loading || !passwordValidation.isValid || newPassword !== confirmPassword}
                                    className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={gradientStyle}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Resetting Password...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notification */}
            <Notification
                type={notification.type}
                message={notification.message}
                show={notification.show}
                onClose={hideNotification}
            />

            {/* Custom Scrollbar Styles */}
            <style jsx='true'>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(243, 244, 246, 0.8);
                    border-radius: 3px;
                    margin: 8px 0;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #04384a 0%, #0b8395 100%);
                    border-radius: 3px;
                    transition: all 0.3s ease;
                    border: none;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #032a36 0%, #096b7a 100%);
                    width: 8px;
                    box-shadow: 0 2px 8px rgba(4, 56, 74, 0.3);
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:active {
                    background: linear-gradient(135deg, #021e26 0%, #074f5a 100%);
                }
                
                /* Firefox Scrollbar */
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #0b8395 rgba(243, 244, 246, 0.8);
                }
                
                /* Custom hover effect for the scrollable area */
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #04384a 0%, #0b8395 100%);
                    box-shadow: 0 2px 12px rgba(4, 56, 74, 0.4);
                }

                /* Smooth scrolling */
                .custom-scrollbar {
                    scroll-behavior: smooth;
                }
            `}</style>

        </Portal>
    );
}

export default ForgotPasswordComponent;