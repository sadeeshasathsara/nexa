/**
 * RegistrationOnboarding Component
 * --------------------------------
 * A multi-role registration entry point for the Nexa platform.
 * 
 * Features:
 * - Displays an onboarding screen with role options (Student, Tutor, Institute, Donor).
 * - Provides animated transitions between role selection and registration forms.
 * - Integrates with role-specific registration components.
 * 
 * Roles:
 *  1. Student   -> Loads <RegisterStudent />
 *  2. Tutor     -> Loads <RegisterTutor />
 *  3. Institute -> Loads <RegisterInstitute />
 *  4. Donor     -> Loads <RegisterDonor />
 *
 * Dependencies:
 * - React (useState, useEffect)
 * - TailwindCSS (for styling & responsive design)
 * - Lucide-react icons
 * 
 * How to Use:
 * -----------
 * 1. Import this component into your registration page:
 *      import RegistrationOnboarding from "path/to/RegistrationOnboarding";
 * 
 * 2. Ensure the role-specific components are implemented:
 *      - RegisterStudent
 *      - RegisterTutor
 *      - RegisterInstitute
 *      - RegisterDonor
 * 
 * 3. Add <RegistrationOnboarding /> inside your page JSX.
 * 
 * Example:
 * --------
 * function RegistrationPage() {
 *   return (
 *     <div className="min-h-screen">
 *       <RegistrationOnboarding />
 *     </div>
 *   );
 * }
 */

import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    GraduationCap,
    BookOpen,
    School,
    Heart,
    Sparkles,
    Users,
    Star,
} from "lucide-react";

import RegisterStudent from "../../student.components/register.components/registerStudent.component";
import RegisterTutor from "../../tutor.components/register.components/registerTutor.component";
import RegisterInstitute from "../../institution.pages/register.components/registerInstitute.component";
import RegisterDonor from "../../donor.components/register.components/registerDonor.component";

const RegistrationOnboarding = () => {
    const [role, setRole] = useState(null); // Selected role
    const [isAnimating, setIsAnimating] = useState(false); // Transition animation state
    const [isLoaded, setIsLoaded] = useState(false); // Initial load animation

    // Trigger entry animation after mount
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    /**
     * Handle role selection
     */
    const handleRoleSelect = (selectedRole) => {
        setIsAnimating(true);
        setTimeout(() => {
            setRole(selectedRole);
            setIsAnimating(false);
        }, 300);
    };

    /**
     * Handle back button (reset to role selection)
     */
    const handleBack = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setRole(null);
            setIsAnimating(false);
        }, 300);
    };

    /**
     * Role card configurations
     */
    const roleOptions = [
        {
            key: "student",
            title: "I want to learn and join classes",
            description:
                "Access courses, connect with tutors, and advance your education journey",
            icon: GraduationCap,
            gradient: "from-blue-500 via-blue-600 to-indigo-700",
            bgGradient: "from-blue-50 to-indigo-50",
            iconBg: "from-blue-100 to-blue-200",
            stats: "50K+ students",
        },
        {
            key: "tutor",
            title: "I want to teach and share my knowledge",
            description:
                "Create courses, mentor students, and build your teaching community",
            icon: BookOpen,
            gradient: "from-emerald-500 via-emerald-600 to-teal-700",
            bgGradient: "from-emerald-50 to-teal-50",
            iconBg: "from-emerald-100 to-emerald-200",
            stats: "10K+ tutors",
        },
        {
            key: "institute",
            title: "I want to offer classes and manage students",
            description:
                "Create educational programs, manage enrollments, and track student progress",
            icon: School,
            gradient: "from-purple-500 via-purple-600 to-violet-700",
            bgGradient: "from-purple-50 to-violet-50",
            iconBg: "from-purple-100 to-purple-200",
            stats: "500+ institutes",
            badge: "Professional",
        },
        {
            key: "donor",
            title: "I want to support students financially or with resources",
            description:
                "Contribute to scholarships, fund educational programs, and make a difference",
            icon: Heart,
            gradient: "from-rose-500 via-rose-600 to-pink-700",
            bgGradient: "from-rose-50 to-pink-50",
            iconBg: "from-rose-100 to-rose-200",
            stats: "1M+ donated",
            badge: "Impact",
        },
    ];

    /**
     * Renders form or onboarding screen
     */
    const renderForm = () => {
        switch (role) {
            case "student":
                return <RegisterStudent />;
            case "tutor":
                return <RegisterTutor />;
            case "institute":
                return <RegisterInstitute />;
            case "donor":
                return <RegisterDonor />;
            default:
                return (
                    <div
                        className={`transition-all duration-500 ease-out ${isAnimating
                                ? "opacity-0 scale-95"
                                : isLoaded
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-90"
                            }`}
                    >
                        {/* Hero Section */}
                        <div
                            className={`text-center mb-8 transition-all duration-700 delay-100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                        >
                            {/* Hero icon */}
                            <div className="relative inline-block mb-4">
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg transition-all duration-700 delay-200 ${isLoaded ? "scale-100 rotate-0" : "scale-0 rotate-45"
                                        }`}
                                >
                                    <Sparkles className="w-7 h-7 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Star
                                        className="w-2.5 h-2.5 text-yellow-800"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>

                            {/* Headline */}
                            <div className="space-y-3 mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold">
                                    <span className="text-[#000]/80">Welcome to</span>
                                    <span className="ml-2 text-[#000]/80">Nexa</span>
                                </h1>
                                <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                                    Transform education with our innovative platform.
                                    <span className="text-black/50 text-sm block mt-1">
                                        Select how you'd like to get started.
                                    </span>
                                </p>
                            </div>

                            {/* Trust indicators */}
                            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-2">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>61K+ members</span>
                                </div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                    <Star
                                        className="w-4 h-4 text-yellow-500"
                                        fill="currentColor"
                                    />
                                    <span>4.9 rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Role selection grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl mx-auto">
                            {roleOptions.map((option, index) => {
                                const IconComponent = option.icon;
                                return (
                                    <div
                                        key={option.key}
                                        className={`transition-all duration-700 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${400 + index * 100}ms` }}
                                    >
                                        <button
                                            className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${option.bgGradient} p-5 text-left transition-all duration-500 hover:scale-105 hover:shadow-xl w-full min-h-44 border border-white/50 backdrop-blur-sm flex flex-col`}
                                            onClick={() => handleRoleSelect(option.key)}
                                        >
                                            {/* Hover background */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700`}
                                            ></div>

                                            {/* Badge */}
                                            {option.badge && (
                                                <div className="absolute top-3 right-3">
                                                    <span
                                                        className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${option.gradient} text-white shadow-md`}
                                                    >
                                                        {option.badge}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Icon */}
                                            <div
                                                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${option.iconBg} mb-3 group-hover:scale-110 transition-all duration-500 shadow-md`}
                                            >
                                                <IconComponent className="w-5 h-5 text-gray-700" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col h-full">
                                                <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-gray-600">
                                                    {option.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm flex-grow group-hover:text-gray-700">
                                                    {option.description}
                                                </p>

                                                {/* Stats */}
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 mt-auto">
                                                    <span className="text-xs font-medium text-gray-500">
                                                        {option.stats}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-gray-400 group-hover:text-gray-600">
                                                        <span className="text-xs font-medium">Start</span>
                                                        <div
                                                            className={`w-6 h-6 rounded-full bg-gradient-to-r ${option.gradient} flex items-center justify-center shadow-md transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500`}
                                                        >
                                                            <svg
                                                                className="w-3 h-3 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Call-to-Action */}
                        <div
                            className={`text-center mt-12 transition-all duration-700 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-600 font-medium">
                                    Join thousands of learners worldwide
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">
                                Questions? Our support team is here 24/7 to help you get started.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-200 via-white to-blue-100 relative overflow-hidden">
            {/* Background gradients */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-300/30 blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-purple-200/30 to-pink-300/30 blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-2xl"></div>
            </div>

            {/* Foreground content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-6xl">
                    {/* Back button */}
                    {role && (
                        <div className="mb-8">
                            <button
                                onClick={handleBack}
                                className="inline-flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                                <span className="font-medium">Back to selection</span>
                            </button>
                        </div>
                    )}

                    {/* Main container */}
                    <div
                        className={`transition-all w-full duration-300 ease-out ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                            }`}
                    >
                        {renderForm()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationOnboarding;
