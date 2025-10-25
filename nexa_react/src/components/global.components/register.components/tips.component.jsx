/**
 * TipsCard Component
 * ------------------
 * Displays step-specific tips and optional benefits for a registration flow.
 * 
 * PROPS:
 *   @param {Object} props
 *   @param {Object} props.tips
 *     - A mapping of step index to an array of tip objects.
 *       Each tip object contains:
 *         - type: "info" | "success" | "warning" | "tip"
 *         - icon: React component from lucide-react
 *         - title: string
 *         - description: string
 *   @param {number} props.currentStep
 *     - The index of the current step to display tips for
 *   @param {Object} props.config
 *     - Configuration object for the registration flow
 *       - color: string (Tailwind gradient classes for header)
 *       - benefits: string[] (optional list of benefits to display at the bottom)
 *
 * USAGE:
 *   <TipsCard
 *     tips={registrationConfig.tips}
 *     currentStep={currentStep}
 *     config={registrationConfig}
 *   />
 * 
 * FEATURES:
 *   - Smooth fade-in animation when step changes
 *   - Displays "No tips available" if no tips exist for a step
 *   - Optionally renders a "Why Choose Us?" benefits section
 */

import { CheckCircle, Lightbulb, Star } from 'lucide-react';
import React, { useState, useEffect } from 'react'

const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const TipsCard = ({ tips, currentStep, config }) => {
    const currentTips = tips[currentStep] || [];
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 200);
        return () => clearTimeout(timer);
    }, [currentStep]);

    return (
        <div className="rounded-3xl shadow-lg border border-white/20 overflow-hidden h-full flex flex-col">
            {/* Tips Header */}
            <div className={`bg-gradient-to-r ${config.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg">Helpful Tips</h2>
                            <p className="text-white/80 text-sm">Step {currentStep + 1} guidance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 relative">
                    {/* Loading Animation */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}

                    {/* Tips Content with Fade Animation */}
                    <div className={`transition-all duration-300 ${isLoading ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                        {currentTips.map((tip, index) => (
                            <div
                                key={`${currentStep}-${index}`}
                                className="flex gap-3 group hover:bg-white/50 p-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: !isLoading ? `fadeInUp 0.5s ease-out ${index * 100}ms both` : 'none'
                                }}
                            >
                                <div className={`p-2 rounded-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${tip.type === 'success' ? 'bg-green-100 text-green-600' :
                                    tip.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                        tip.type === 'info' ? 'bg-blue-100 text-blue-600' :
                                            'bg-purple-100 text-purple-600'
                                    }`}>
                                    <tip.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 text-sm mb-1 transition-colors duration-200 group-hover:text-gray-900">{tip.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed transition-colors duration-200 group-hover:text-gray-700">{tip.description}</p>
                                </div>
                            </div>
                        ))}

                        {currentTips.length === 0 && !isLoading && (
                            <div className="text-center py-8 text-gray-400 flex-1 flex flex-col justify-center">
                                <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No tips available for this step</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Benefits Section (if provided) */}
                {config.benefits && (
                    <div className="border-t border-gray-200/30 pt-6 mt-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            Why Choose Us?
                        </h3>
                        <div className="space-y-3">
                            {config.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3 group hover:bg-white/30 p-2 rounded-lg transition-all duration-200">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                                    <span className="text-gray-600 text-sm transition-colors duration-200 group-hover:text-gray-800">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TipsCard