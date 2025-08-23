/**
 * OtpStep Component
 * -----------------
 * Step component for user registration to verify the user's email using a 6-digit OTP.
 *
 * PROPS:
 *   @param {Object} props
 *   @param {Object} props.formData
 *     - Object holding current values of the form fields. Should include `email` and `otp`.
 *   @param {Function} props.setFormData
 *     - Function to update the formData object.
 *   @param {Object} props.errors
 *     - Object holding validation error messages for fields (not heavily used here).
 *   @param {Function} props.setErrors
 *     - Function to update the errors object.
 *   @param {Object} props.touched
 *     - Object tracking which fields have been visited/blurred (not heavily used here).
 *   @param {Function} props.setTouched
 *     - Function to update the touched object.
 *   @param {Function} props.onNext
 *     - Function to move to the next step in the registration flow.
 *   @param {Function} props.onPrev
 *     - Function to go back to the previous step.
 *
 * FEATURES:
 *   - Displays 6 input boxes for OTP entry.
 *   - Auto-focus next input after entering a digit.
 *   - Auto-focus previous input on backspace if current is empty.
 *   - Countdown timer before user can resend OTP (default 60 seconds).
 *   - Reset OTP inputs when resending code.
 *   - Disable "Verify" button until all 6 digits are entered.
 *
 * USAGE:
 *   <OtpStep
 *     formData={formData}
 *     setFormData={setFormData}
 *     errors={errors}
 *     setErrors={setErrors}
 *     touched={touched}
 *     setTouched={setTouched}
 *     onNext={handleNextStep}
 *     onPrev={handlePrevStep}
 *   />
 */

import React, { useState, useEffect } from "react";
import { User, Mail, FileText, GraduationCap, BookOpen, Eye, EyeOff, Check, X, AlertCircle } from "lucide-react";

const OtpStep = ({ formData, setFormData, errors, setErrors, touched, setTouched, onNext, onPrev }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);

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

        const otpString = newOtp.join('');
        setFormData({ ...formData, otp: otpString });

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

    const handleResend = () => {
        setTimeLeft(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        setFormData({ ...formData, otp: '' });
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
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
                        className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200"
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
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                    >
                        Resend Code
                    </button>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={otp.join('').length !== 6}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default OtpStep