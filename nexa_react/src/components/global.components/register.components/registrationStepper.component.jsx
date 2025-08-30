/**
 * RegistrationStepper Component
 * ------------------------------
 * A configurable multi-step registration form container.
 *
 * Features:
 * - Dynamic step configuration with progress bar & step indicators.
 * - Left-hand side tips panel (using <TipsCard />).
 * - Right-hand side step content with progress header.
 * - Navigation between steps (Next/Prev).
 * - Built-in progress visualization (bar + icons + completion checkmarks).
 *
 * Props:
 * ------
 * @param {Object} config - The configuration object for the stepper.
 *   {
 *     name: string,            // Name of the registration (e.g., "Student Registration")
 *     color: string,           // Tailwind gradient color class (e.g., "from-indigo-500 to-purple-600")
 *     icon: React.Component,   // Icon component for the header (Lucide icon, etc.)
 *     tips: Object,            // Tips for <TipsCard /> (optional)
 *     steps: Array<{           // Step definitions
 *       title: string,         // Step title (shown under indicator icon)
 *       slogan: string,        // Short text displayed in header
 *       icon: React.Component, // Step icon (Lucide icon, etc.)
 *       component: React.FC    // React component for this step content
 *     }>
 *   }
 *
 * Usage:
 * ------
 * Import and use it inside a registration page with your own step components.
 *
 * Example:
 * --------
 * import { User, Mail, FileText } from "lucide-react";
 * import AccountStep from "./steps/AccountStep";
 * import DetailsStep from "./steps/DetailsStep";
 * import ReviewStep from "./steps/ReviewStep";
 * 
 * const studentConfig = {
 *   name: "Student Registration",
 *   color: "from-indigo-500 to-purple-600",
 *   icon: User,
 *   tips: {
 *     0: "Use a valid email address.",
 *     1: "Fill out your academic details accurately.",
 *     2: "Double-check your details before submitting."
 *   },
 *   steps: [
 *     { title: "Account", slogan: "Create your account", icon: Mail, component: AccountStep },
 *     { title: "Details", slogan: "Tell us about yourself", icon: FileText, component: DetailsStep },
 *     { title: "Review", slogan: "Confirm your details", icon: User, component: ReviewStep },
 *   ],
 * };
 * 
 * function StudentRegistrationPage() {
 *   return <RegistrationStepper config={studentConfig} />;
 * }
 */

import React, { useState } from "react";
import { Check } from "lucide-react";
import TipsCard from "./tips.component";

const RegistrationStepper = ({ config }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(config.payload);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const StepConfig = config.steps[currentStep];
    const StepComponent = StepConfig.component;

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
                    {/* Tips Section - Left Side */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="sticky top-4">
                            <TipsCard
                                tips={config.tips || {}}
                                currentStep={currentStep}
                                config={config}
                            />
                        </div>
                    </div>

                    {/* Registration Form - Right Side */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden h-full flex flex-col">
                            {/* Progress Header */}
                            <div className={`bg-gradient-to-r ${config.color} p-6 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/5"></div>
                                <div className="relative z-10">
                                    {/* Header top row */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                                <config.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h1 className="text-white font-bold text-lg">{config.name}</h1>
                                                <p className="text-white/80 text-sm">{StepConfig.slogan}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white/90 text-xs font-medium">STEP</div>
                                            <div className="text-white font-bold">
                                                {currentStep + 1}/{config.steps.length}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative">
                                        <div className="w-full bg-white/20 rounded-full h-2">
                                            <div
                                                className="bg-white h-2 rounded-full transition-all duration-700 ease-out shadow-lg"
                                                style={{
                                                    width: `${((currentStep + 1) / config.steps.length) * 100}%`,
                                                }}
                                            />
                                        </div>

                                        {/* Step Indicators */}
                                        <div className="flex justify-between mt-4">
                                            {config.steps.map((step, index) => (
                                                <div key={index} className="flex flex-col items-center">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${index <= currentStep
                                                            ? "bg-white text-indigo-600 shadow-lg"
                                                            : "bg-white/20 text-white/60"
                                                            }`}
                                                    >
                                                        {index < currentStep ? (
                                                            <Check className="w-4 h-4" />
                                                        ) : (
                                                            <step.icon className="w-4 h-4" />
                                                        )}
                                                    </div>
                                                    <span className="text-white/70 text-xs mt-1 font-medium hidden sm:block">
                                                        {step.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step Content */}
                            <div className="p-6 sm:p-8 flex-1">
                                <StepComponent
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                    setErrors={setErrors}
                                    touched={touched}
                                    setTouched={setTouched}
                                    onNext={() =>
                                        setCurrentStep((s) => Math.min(s + 1, config.steps.length - 1))
                                    }
                                    onPrev={() => setCurrentStep((s) => Math.max(s - 1, 0))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationStepper;
