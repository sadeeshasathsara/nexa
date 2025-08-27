/**
 * AccountStep Component
 * ---------------------
 * Step component for user registration that collects personal information.
 *
 * PROPS:
 *   @param {Object} props
 *   @param {Object} props.formData
 *     - Object holding the current values of the form fields.
 *       Keys: firstName, lastName, email, password, confirmPassword
 *   @param {Function} props.setFormData
 *     - Function to update the formData object.
 *   @param {Object} props.errors
 *     - Object holding validation error messages for each field.
 *   @param {Function} props.setErrors
 *     - Function to update the errors object.
 *   @param {Object} props.touched
 *     - Object tracking which fields have been visited/blurred.
 *   @param {Function} props.setTouched
 *     - Function to update the touched object.
 *   @param {Function} props.onNext
 *     - Function to move to the next step in the registration flow.
 *
 * FEATURES:
 *   - Validates first name, last name, email, password, and confirm password.
 *   - Real-time validation on field blur or change if field has been touched.
 *   - Password strength checks: minimum 8 characters, at least one uppercase, one lowercase, one number.
 *   - Password confirmation check.
 *   - Continue button only enabled when all fields are valid.
 *
 * USAGE:
 *   <AccountStep
 *     formData={formData}
 *     setFormData={setFormData}
 *     errors={errors}
 *     setErrors={setErrors}
 *     touched={touched}
 *     setTouched={setTouched}
 *     onNext={handleNextStep}
 *   />
 */

import React, { useState, useEffect } from "react";
import { User, Mail, FileText, GraduationCap, BookOpen, Eye, EyeOff, Check, X, AlertCircle } from "lucide-react";
import InputField from "../tools.compoenents/inputField.component";
import ReCAPTCHA from "react-google-recaptcha"
import { otpApi } from "../../../../apis/global.apis/otp.api";
import { useNotify } from "../../notification.components/notificationProvider.component";

const AccountStep = ({ formData, setFormData, errors, setErrors, touched, setTouched, onNext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState(false);
    const [loading, setLoading] = useState(false);

    const notify = useNotify();

    const handleCaptcha = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = () => {
        if (!captchaToken) {
            alert("Please complete the captcha first!");
            return;
        }
        // send captchaToken to backend with OTP request
        onNext();
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'firstName':
                if (!value.trim()) {
                    newErrors.firstName = "First name is required";
                } else if (value.trim().length < 2) {
                    newErrors.firstName = "First name must be at least 2 characters";
                } else {
                    delete newErrors.firstName;
                }
                break;
            case 'lastName':
                if (!value.trim()) {
                    newErrors.lastName = "Last name is required";
                } else if (value.trim().length < 2) {
                    newErrors.lastName = "Last name must be at least 2 characters";
                } else {
                    delete newErrors.lastName;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    newErrors.email = "Email is required";
                } else if (!emailRegex.test(value)) {
                    newErrors.email = "Please enter a valid email";
                } else {
                    delete newErrors.email;
                }
                break;
            case 'password':
                if (!value) {
                    newErrors.password = "Password is required";
                } else if (value.length < 8) {
                    newErrors.password = "Password must be at least 8 characters";
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    newErrors.password = "Password must contain uppercase, lowercase, and number";
                } else {
                    delete newErrors.password;
                }
                // Revalidate confirm password when password changes
                if (formData.confirmPassword) {
                    if (value !== formData.confirmPassword) {
                        newErrors.confirmPassword = "Passwords do not match";
                    } else {
                        delete newErrors.confirmPassword;
                    }
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    newErrors.confirmPassword = "Please confirm your password";
                } else if (value !== formData.password) {
                    newErrors.confirmPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmPassword;
                }
                break;
        }

        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        validateField(name, value);
    };

    const validateAndNext = async () => {
        setLoading(true);

        const allTouched = {
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            confirmPassword: true
        };
        setTouched(allTouched);

        // Validate all fields
        Object.keys(allTouched).forEach(field => {
            validateField(field, formData[field] || '');
        });

        // Check if there are any errors
        const hasErrors = Object.keys(errors).length > 0;
        const hasEmptyFields = !formData.firstName || !formData.lastName || !formData.email ||
            !formData.password || !formData.confirmPassword;

        if (hasErrors || hasEmptyFields) return;

        if (!captchaToken) {
            setCaptchaError(true)
            return;
        }

        try {
            const res = await otpApi({
                captchaToken: captchaToken,
                email: formData.email
            })

            if (!res || !res.success) {
                notify(res?.message || 'reCAPTCHA failed.', 'error')
                return;
            }
        } catch (e) {
            return;
        } finally {
            setLoading(false);
        }

        onNext();
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        name="firstName"
                        placeholder="First Name"
                        icon={User}
                        formData={formData}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <InputField
                        name="lastName"
                        placeholder="Last Name"
                        icon={User}
                        formData={formData}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                </div>
                <InputField
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    icon={Mail}
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <InputField
                    name="password"
                    placeholder="Password"
                    icon={User}
                    showToggle
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
                <InputField
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    icon={User}
                    showToggle
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                />
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
                onClick={validateAndNext}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending OTP...
                    </>
                ) : (
                    "Continue"
                )}
            </button>
        </div>
    );
};

export default AccountStep