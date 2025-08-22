import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const InputField = ({
    name,
    type = "text",
    placeholder,
    icon: Icon,
    showToggle = false,
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword
}) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && formData[name];

    return (
        <div className="space-y-1">
            <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <Icon className={`w-4 h-4 transition-colors ${hasError ? 'text-red-400' :
                        isValid ? 'text-green-400' :
                            'text-gray-400 group-focus-within:text-indigo-500'
                        }`} />
                </div>
                <input
                    name={name}
                    type={showToggle ? (name === 'password' ? (showPassword ? 'text' : 'password') :
                        (showConfirmPassword ? 'text' : 'password')) : type}
                    placeholder={placeholder}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-4 border-2 rounded-xl transition-all duration-200 text-sm bg-gray-50/50 focus:bg-white ${hasError
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : isValid
                            ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
                            : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                        } focus:ring-4 focus:outline-none placeholder-gray-400`}
                />
                {showToggle && (
                    <button
                        type="button"
                        onClick={() => name === 'password' ? setShowPassword(!showPassword) :
                            setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {(name === 'password' ? showPassword : showConfirmPassword) ?
                            <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
                {isValid && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="w-4 h-4 text-green-500" />
                    </div>
                )}
            </div>
            {hasError && (
                <div className="flex items-center gap-1 text-red-600 text-xs px-2">
                    <AlertCircle className="w-3 h-3" />
                    {errors[name]}
                </div>
            )}
        </div>
    );
};

export default InputField