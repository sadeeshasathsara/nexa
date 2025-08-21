import React, { useEffect, useRef, useState } from 'react';
import {
    GraduationCap,
    Users,
    Building,
    Heart,
    BookOpen,
    Clock,
    TrendingUp,
    MessageCircle,
    Calendar,
    BarChart3,
    Star,
    Trophy,
    Eye,
    Globe,
    CheckCircle,
    Target,
    ArrowRight,
    Lightbulb,
    Shield,
    Zap,
    School
} from 'lucide-react';

import useScrollAnimation from '../../tools/global.tools.js/useScrollAnimation.tool';

export default function NexaSections() {
    const visibleElements = useScrollAnimation();

    const problems = [
        {
            icon: BookOpen,
            title: "Lack of access to quality education",
            description: "Many students struggle to find affordable, high-quality educational resources and personalized support."
        },
        {
            icon: Clock,
            title: "Students need flexible support",
            description: "Traditional learning schedules don't accommodate diverse student needs and learning paces."
        },
        {
            icon: Users,
            title: "Tutors want to contribute meaningfully",
            description: "Passionate educators seek platforms to share knowledge and make a real impact in students' lives."
        }
    ];

    const howItWorksSteps = [
        {
            id: 1,
            icon: GraduationCap,
            title: "Students",
            description: "Learn via courses, live classes, and personalized sessions",
            color: "bg-[#009966]",
            lightBg: "bg-[#009966]/10"
        },
        {
            id: 2,
            icon: Users,
            title: "Tutors",
            description: "Volunteer and share knowledge with passionate learners",
            color: "bg-[#0D9AAC]",
            lightBg: "bg-[#0D9AAC]/10"
        },
        {
            id: 3,
            icon: Building,
            title: "Institutions",
            description: "Track and support student progress comprehensively",
            color: "bg-[#00B6C7]",
            lightBg: "bg-[#00B6C7]/10"
        },
        {
            id: 4,
            icon: Heart,
            title: "Donors",
            description: "Empower learning through transparent impact tracking",
            color: "bg-[#00FF99]",
            lightBg: "bg-[#00FF99]/10"
        }
    ];

    const keyFeatures = [
        {
            icon: MessageCircle,
            title: "Real-time Chat & Discussions",
            description: "Instant communication with class groups and peer collaboration",
            color: "text-[#0D9AAC]",
            bgColor: "bg-[#0D9AAC]/10"
        },
        {
            icon: Calendar,
            title: "Smart Calendar & Scheduling",
            description: "Intelligent scheduling system that adapts to your availability",
            color: "text-[#00B6C7]",
            bgColor: "bg-[#00B6C7]/10"
        },
        {
            icon: BarChart3,
            title: "Progress Tracking & Reports",
            description: "Comprehensive analytics and detailed progress monitoring",
            color: "text-[#009966]",
            bgColor: "bg-[#009966]/10"
        },
        {
            icon: Star,
            title: "Ratings & Feedback",
            description: "Transparent rating system for continuous improvement",
            color: "text-[#00FF99]",
            bgColor: "bg-[#00FF99]/10"
        },
        {
            icon: Trophy,
            title: "Gamification System",
            description: "Badges, leaderboards, and challenges to motivate learning",
            color: "text-[#0D9AAC]",
            bgColor: "bg-[#0D9AAC]/10"
        },
        {
            icon: Eye,
            title: "Donor Transparency",
            description: "Clear impact dashboards showing donation effectiveness",
            color: "text-[#00B6C7]",
            bgColor: "bg-[#00B6C7]/10"
        },
        {
            icon: Globe,
            title: "Multilingual & Accessible",
            description: "Support for multiple languages with full accessibility features",
            color: "text-[#009966]",
            bgColor: "bg-[#009966]/10"
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Enterprise-grade security with 99.9% uptime guarantee",
            color: "text-[#00FF99]",
            bgColor: "bg-[#00FF99]/10"
        }
    ];

    return (
        <div className="bg-white">
            <style jsx='true'>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseSubtle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes pulseArrow {
          0%, 100% {
            opacity: 0.6;
            transform: translateX(0);
          }
          50% {
            opacity: 1;
            transform: translateX(4px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up.visible {
          opacity: 1;
        }
        
        .animate-pulse-subtle {
          animation: pulseSubtle 3s ease-in-out infinite;
        }
        
        .animate-pulse-arrow {
          animation: pulseArrow 2s ease-in-out infinite;
        }
        
        .animation-delay-200.visible {
          animation-delay: 200ms;
        }
        
        .animation-delay-400.visible {
          animation-delay: 400ms;
        }
        
        .animation-delay-600.visible {
          animation-delay: 600ms;
        }
        
        .animation-delay-800.visible {
          animation-delay: 800ms;
        }
        
        .stagger-delay-100.visible {
          animation-delay: 100ms;
        }
        
        .stagger-delay-200.visible {
          animation-delay: 200ms;
        }
        
        .stagger-delay-300.visible {
          animation-delay: 300ms;
        }
        
        .stagger-delay-400.visible {
          animation-delay: 400ms;
        }
      `}</style>

            {/* Problem & Mission Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div
                            className="inline-flex items-center space-x-2 bg-[#0D9AAC]/10 rounded-full px-4 py-2 mb-4"
                            data-animate-id="problem-badge"
                        >
                            <Target className="h-5 w-5 text-[#0D9AAC]" />
                            <span className="text-sm font-medium text-[#0D9AAC]">Why NEXA?</span>
                        </div>
                        <h2
                            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#043345] mb-6 animate-fade-in-up ${visibleElements.has('problem-title') ? 'visible' : ''}`}
                            data-animate-id="problem-title"
                        >
                            Transforming Education Access
                        </h2>
                        <p
                            className={`text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 ${visibleElements.has('problem-desc') ? 'visible' : ''}`}
                            data-animate-id="problem-desc"
                        >
                            We're addressing critical gaps in educational accessibility and creating meaningful connections between learners, educators, and supporters.
                        </p>
                    </div>

                    {/* Problem Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {problems.map((problem, index) => {
                            const IconComponent = problem.icon;
                            const animateId = `problem-card-${index}`;
                            const delayClass = index === 0 ? '' : index === 1 ? 'stagger-delay-200' : 'stagger-delay-400';

                            return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:border-[#0D9AAC]/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up cursor-pointer group ${delayClass} ${visibleElements.has(animateId) ? 'visible' : ''}`}
                                    data-animate-id={animateId}
                                >
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-[#0D9AAC]/10 p-3 rounded-lg group-hover:bg-[#0D9AAC]/20 group-hover:scale-110 transition-all duration-300">
                                            <IconComponent className="h-6 w-6 text-[#0D9AAC] group-hover:text-[#043345] transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#043345] group-hover:text-[#0D9AAC] transition-colors duration-300">{problem.title}</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{problem.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mission Statement */}
                    <div
                        className={`bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-2xl p-8 md:p-12 text-center border border-[#0D9AAC]/20 animate-fade-in-up will-change-transform transition-transform duration-500 hover:scale-[1.006] ${visibleElements.has('mission-statement') ? 'visible' : ''}`}
                        data-animate-id="mission-statement"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 
      bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-full mb-6 
      transition-transform duration-500 hover:rotate-6 border-2 border-white">
                            <Lightbulb className="h-8 w-8 text-white " />
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-lg md:text-xl text-white/80 font-medium italic max-w-4xl mx-auto">
                            "We bridge learners, educators, and supporters to ensure education reaches every student."
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-7">
                            <button className="bg-white flex items-center justify-center gap-2 text-[#0D9AAC] w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer relative z-10 border-2 border-transparent hover:border-white/30">
                                <School size={20} /> Start Teaching
                            </button>
                            <button className="bg-white flex items-center justify-center gap-2 text-[#0D9AAC] w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer relative z-10 border-2 border-transparent hover:border-white/30">
                                <Heart size={20} /> Make a Donation
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 lg:py-24 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div
                            className="inline-flex items-center space-x-2 bg-[#00B6C7]/10 rounded-full px-4 py-2 mb-4"
                            data-animate-id="works-badge"
                        >
                            <Zap className="h-5 w-5 text-[#00B6C7]" />
                            <span className="text-sm font-medium text-[#00B6C7]">Simple Process</span>
                        </div>
                        <h2
                            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#043345] mb-6 animate-fade-in-up ${visibleElements.has('works-title') ? 'visible' : ''}`}
                            data-animate-id="works-title"
                        >
                            How NEXA Works
                        </h2>
                        <p
                            className={`text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 ${visibleElements.has('works-desc') ? 'visible' : ''}`}
                            data-animate-id="works-desc"
                        >
                            Our platform connects all stakeholders in education through a simple, intuitive process that benefits everyone.
                        </p>
                    </div>

                    {/* How It Works Steps */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorksSteps.map((step, index) => {
                            const IconComponent = step.icon;
                            const animateId = `works-step-${index}`;
                            const delayClass = `stagger-delay-${(index + 1) * 100}`;

                            return (
                                <div key={step.id} className="relative group">
                                    <div
                                        className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in-up cursor-pointer border-2 border-transparent hover:border-${step.color.replace('bg-', '').replace('[', '').replace(']', '')}/30 ${delayClass} ${visibleElements.has(animateId) ? 'visible' : ''}`}
                                        data-animate-id={animateId}
                                    >
                                        {/* Step Number */}
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                                                {step.id}
                                            </div>
                                        </div>

                                        {/* Icon */}
                                        <div className={`inline-flex items-center justify-center w-16 h-16 ${step.lightBg} rounded-full mb-4 mt-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                            <IconComponent className={`h-8 w-8 ${step.color.replace('bg-', 'text-')} group-hover:scale-110 transition-transform duration-300`} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-[#043345] mb-3 group-hover:text-[#0D9AAC] transition-colors duration-300">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{step.description}</p>
                                    </div>

                                    {/* Animated Arrow */}
                                    {index < howItWorksSteps.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="h-8 w-8 text-[#0D9AAC]/60 animate-pulse-arrow hover:text-[#0D9AAC] transition-colors duration-300" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div
                            className="inline-flex items-center space-x-2 bg-[#009966]/10 rounded-full px-4 py-2 mb-4"
                            data-animate-id="features-badge"
                        >
                            <CheckCircle className="h-5 w-5 text-[#009966]" />
                            <span className="text-sm font-medium text-[#009966]">Platform Features</span>
                        </div>
                        <h2
                            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#043345] mb-6 animate-fade-in-up ${visibleElements.has('features-title') ? 'visible' : ''}`}
                            data-animate-id="features-title"
                        >
                            Powerful Features for Everyone
                        </h2>
                        <p
                            className={`text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 ${visibleElements.has('features-desc') ? 'visible' : ''}`}
                            data-animate-id="features-desc"
                        >
                            Discover the comprehensive tools and features that make NEXA the ultimate educational platform for all stakeholders.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keyFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            const animateId = `feature-card-${index}`;
                            const delayClass = `stagger-delay-${(index % 4 + 1) * 100}`;

                            return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer animate-fade-in-up hover:border-${feature.color.replace('text-', '').replace('[', '').replace(']', '')}/30 ${delayClass} ${visibleElements.has(animateId) ? 'visible' : ''}`}
                                    data-animate-id={animateId}
                                >
                                    <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg`}>
                                        <IconComponent className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#043345] mb-2 group-hover:text-[#0D9AAC] transition-colors duration-300">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Call to Action */}
                    <div
                        className={`text-center mt-16 animate-fade-in-up animation-delay-800 ${visibleElements.has('cta-section') ? 'visible' : ''}`}
                        data-animate-id="cta-section"
                    >
                        <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-2xl p-8 md:p-12 hover:shadow-2xl transition-all duration-500 transform hover:scale-101 relative overflow-hidden group">
                            {/* Animated Background Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#043345]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                                Ready to Transform Education?
                            </h3>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                                Join thousands of students, tutors, institutions, and donors who are already making a difference through NEXA.
                            </p>
                            <button className="bg-white text-[#0D9AAC] px-8 py-4 rounded-lg font-semibold text-lg  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-103 cursor-pointer relative z-10 border-2 border-transparent hover:border-white/30">
                                Get Started Today
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}