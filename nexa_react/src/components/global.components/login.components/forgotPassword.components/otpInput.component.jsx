import React, { useState, useEffect } from 'react';

// OTP Input component
const OTPInput = ({ value, onChange, onComplete, onAutoSubmit, loading }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    useEffect(() => {
        if (value) {
            const otpArray = value.split('').slice(0, 6);
            while (otpArray.length < 6) otpArray.push('');
            setOtp(otpArray);
        }
    }, [value]);

    const handleChange = (index, val) => {
        if (!/^\d*$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[index] = val.slice(-1);
        setOtp(newOtp);

        const otpString = newOtp.join('');
        onChange(otpString);

        if (val && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }

        // Auto-submit when all 6 digits are filled
        if (otpString.length === 6 && !loading) {
            setTimeout(() => {
                onAutoSubmit(otpString);
            }, 100);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    // Reset OTP digits
    const resetOTP = () => {
        const emptyOtp = ['', '', '', '', '', ''];
        setOtp(emptyOtp);
        onChange('');
        document.getElementById('otp-0')?.focus();
    };

    // Expose reset function through useEffect
    useEffect(() => {
        if (onComplete) {
            onComplete(resetOTP);
        }
    }, [onComplete]);

    return (
        <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                        borderColor: digit ? '#0b8395' : '#d1d5db',
                        focusBorderColor: '#04384a',
                        boxShadow: digit ? '0 0 0 2px rgba(11, 131, 149, 0.2)' : 'none'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#04384a';
                        e.target.style.boxShadow = '0 0 0 2px rgba(4, 56, 74, 0.2)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = digit ? '#0b8395' : '#d1d5db';
                        e.target.style.boxShadow = digit ? '0 0 0 2px rgba(11, 131, 149, 0.2)' : 'none';
                    }}
                    maxLength={1}
                    disabled={loading}
                />
            ))}
        </div>
    );
};

export default OTPInput;