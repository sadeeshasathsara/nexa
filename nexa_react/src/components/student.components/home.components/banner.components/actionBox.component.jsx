import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ActionBox Component
const ActionBox = ({
    heading,
    subText,
    primaryButton,
    secondaryButton,
    className = ""
}) => {
    return (
        <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-md w-full ${className}`}>
            {heading && (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {heading}
                </h2>
            )}

            {subText && (
                <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                    {subText}
                </p>
            )}

            {(primaryButton || secondaryButton) && (
                <div className="flex flex-col sm:flex-row gap-3">
                    {primaryButton && (
                        <button
                            onClick={primaryButton.onClick}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            {primaryButton.text}
                        </button>
                    )}

                    {secondaryButton && (
                        <button
                            onClick={secondaryButton.onClick}
                            className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                        >
                            {secondaryButton.text}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionBox;