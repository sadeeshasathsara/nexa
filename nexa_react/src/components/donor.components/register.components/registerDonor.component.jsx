import { Heart, Eye, EyeOff, Calendar, MapPin, Globe, Target } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterDonor = ({ onRegisterSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm();

    const password = watch('password');

    const causes = [
        'education', 'healthcare', 'poverty', 'environment',
        'arts', 'sports', 'technology', 'other'
    ];

    const frequencies = ['one-time', 'monthly', 'quarterly', 'yearly'];
    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'LKR'];
    const genders = ['male', 'female', 'other', 'prefer-not-to-say'];

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            // Simulate processing, then navigate to dashboard
            await new Promise(resolve => setTimeout(resolve, 500));
            if (typeof onRegisterSuccess === 'function') onRegisterSuccess();
            // Fallback: direct redirect if no handler wired
            else window.location.href = '/';
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        {...register('firstName', {
                            required: 'First name is required',
                            minLength: { value: 2, message: 'First name must be at least 2 characters' }
                        })}
                        className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent ${errors.firstName ? 'border-red-300' : 'border-gray-200'
                            }`}
                        placeholder="First Name"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                </div>
                <div>
                    <input
                        {...register('lastName', {
                            required: 'Last name is required',
                            minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                        })}
                        className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent ${errors.lastName ? 'border-red-300' : 'border-gray-200'
                            }`}
                        placeholder="Last Name"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                        }
                    })}
                    className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent ${errors.email ? 'border-red-300' : 'border-gray-200'
                        }`}
                    placeholder="Email Address"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register('phone')}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Phone Number (Optional)"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <select
                        {...register('gender')}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                        <option value="">Select Gender</option>
                        {genders.map(gender => (
                            <option key={gender} value={gender}>
                                {gender.charAt(0).toUpperCase() + gender.slice(1).replace('-', ' ')}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input
                        {...register('dateOfBirth')}
                        type="date"
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Address Information
                </label>
                <input
                    {...register('address.street')}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent mb-3"
                    placeholder="Street Address"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        {...register('address.city')}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="City"
                    />
                    <input
                        {...register('address.state')}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="State/Province"
                    />
                    <input
                        {...register('address.zipCode')}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="ZIP/Postal Code"
                    />
                </div>
                <input
                    {...register('address.country')}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent mt-3"
                    placeholder="Country"
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="inline w-4 h-4 mr-2" />
                    Preferred Causes
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {causes.map(cause => (
                        <label key={cause} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value={cause}
                                {...register('preferredCauses')}
                                className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                            />
                            <span className="text-sm capitalize">{cause}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Donation Frequency
                    </label>
                    <select
                        {...register('donationFrequency')}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                        <option value="">Select Frequency</option>
                        {frequencies.map(freq => (
                            <option key={freq} value={freq}>
                                {freq.charAt(0).toUpperCase() + freq.slice(1).replace('-', ' ')}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe className="inline w-4 h-4 mr-2" />
                        Preferred Currency
                    </label>
                    <select
                        {...register('preferredCurrency')}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <div className="relative">
                    <input
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                message: 'Password must contain uppercase, lowercase, number, and special character'
                            }
                        })}
                        type={showPassword ? 'text' : 'password'}
                        className={`w-full p-4 pr-12 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent ${errors.password ? 'border-red-300' : 'border-gray-200'
                            }`}
                        placeholder="Create Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match'
                        })}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`w-full p-4 pr-12 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                            }`}
                        placeholder="Confirm Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>
        </div>
    );

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-6">
            {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${stepNumber <= step
                            ? 'bg-rose-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                        {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                        <div className={`w-12 h-1 mx-2 ${stepNumber < step ? 'bg-rose-500' : 'bg-gray-200'
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const getStepTitle = () => {
        switch (step) {
            case 1: return 'Personal Information';
            case 2: return 'Address & Contact';
            case 3: return 'Preferences & Security';
            default: return 'Donor Registration';
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 border border-rose-100 max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{getStepTitle()}</h2>
                <p className="text-gray-600">Support education through giving</p>
            </div>

            {renderStepIndicator()}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}

                <div className="flex justify-between pt-4">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            className="ml-auto px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="ml-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Donor Account'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RegisterDonor;

