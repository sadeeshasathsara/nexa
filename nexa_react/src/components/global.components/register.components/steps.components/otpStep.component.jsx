import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { User, Mail, FileText, GraduationCap, BookOpen, Eye, EyeOff, Check, X, AlertCircle } from "lucide-react";
import { useNotify } from "../../notification.components/notificationProvider.component";
import { validateOtpApi, otpApi } from "../../../../apis/global.apis/otp.api";
import ReCAPTCHA from "react-google-recaptcha";

const OtpStep = ({ formData, setFormData, errors, setErrors, touched, setTouched, onNext, onPrev }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [resendLoading, setResendLoading] = useState(false);

    const notify = useNotify();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleCaptcha = (token) => {
        setCaptchaToken(token);
    };

    const handleResend = () => {
        setShowCaptcha(true);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const handleResendOtp = async () => {
        if (!captchaToken) {
            notify('Please complete the reCAPTCHA first', 'error');
            return;
        }

        try {
            setResendLoading(true);
            const res = await otpApi({
                captchaToken: captchaToken,
                email: formData.email
            });

            if (res && res.success) {
                notify('OTP sent successfully!', 'success');
                setTimeLeft(60);
                setCanResend(false);
                setOtp(['', '', '', '', '', '']);
                setShowCaptcha(false);
                setCaptchaToken(null);
                document.body.style.overflow = 'auto';
            } else {
                notify(res?.message || 'Failed to send OTP. Please try again.', 'error');
            }
        } catch (e) {
            notify('Failed to send OTP. Please try again.', 'error');
        } finally {
            setResendLoading(false);
        }
    };

    const handleCancelCaptcha = () => {
        setShowCaptcha(false);
        setCaptchaToken(null);
        document.body.style.overflow = 'auto';
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const otpString = otp.join('');
            const res = await validateOtpApi({
                email: formData.email,
                otp: otpString
            });

            // Check if validation is successful
            if (res.success) {
                notify('OTP verified successfully!', 'success');
                setFormData({ ...formData, otpVerified: true })
                onNext();
            } else {
                notify(res.message || 'Invalid OTP. Please try again.', 'error');
            }

        } catch (e) {
            notify(e.message || 'Invalid OTP. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Clean up body overflow on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Modal Component
    const CaptchaModal = () => {
        if (!showCaptcha) return null;

        return createPortal(
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-out z-[9999] flex items-center justify-center p-4 ${showCaptcha ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleCancelCaptcha}
            >
                <div
                    className={`bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out ${showCaptcha ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 pb-4 text-center border-b border-gray-100">
                        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-3">
                            <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Verify to Resend OTP</h3>
                        <p className="text-sm text-gray-600">Please complete the verification below to continue</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex flex-col items-center space-y-6">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={handleCaptcha}
                            />

                            {/* Buttons */}
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={handleCancelCaptcha}
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleResendOtp}
                                    disabled={!captchaToken || resendLoading}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer
                                    ${(!captchaToken || resendLoading) ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' : ''}`}
                                >
                                    {resendLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="w-4 h-4" />
                                            <span>Send OTP</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    return (
        <>
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform transition-all duration-200 hover:scale-105">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>
                    <p className="text-gray-600">Enter the 6-digit code sent to</p>
                    <p className="font-semibold text-indigo-600">{formData.email}</p>
                </div>

                <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200 transform hover:scale-105 focus:scale-105"
                        />
                    ))}
                </div>

                <div className="text-center space-y-2">
                    {timeLeft > 0 ? (
                        <p className="text-sm text-gray-600">
                            Resend code in <span className="font-semibold text-indigo-600">{timeLeft}s</span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-all duration-200 transform hover:scale-105 cursor-pointer"
                        >
                            Resend Code
                        </button>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onPrev}
                        className="flex-1 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={otp.join('').length !== 6 || loading}
                        className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer
                        ${(otp.join('').length !== 6 || loading) ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' : ''}`}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <>
                                <Check className="w-5 h-5" />
                                <span>Verify</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Portal Modal */}
            <CaptchaModal />
        </>
    );
};

export default OtpStep;