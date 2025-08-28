import React, { useState, useEffect } from 'react';
import {
    Shield,
    Zap,
    Lock,
    Eye,
    Smartphone,
    CheckCircle,
    Lightbulb,
    ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginTipsCard = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);
    const tips = [
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Secure Authentication",
            description: "Your account is protected with enterprise-grade security including 2FA and encrypted data storage."
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Lightning Fast Access",
            description: "Sign in once and stay logged in across all your devices with seamless session management."
        },
        {
            icon: <Lock className="w-5 h-5" />,
            title: "Privacy First",
            description: "We never share your personal information. Your data stays private and secure at all times."
        },
        {
            icon: <Eye className="w-5 h-5" />,
            title: "Account Monitoring",
            description: "Get real-time notifications for any suspicious activity on your account instantly."
        },
        {
            icon: <Smartphone className="w-5 h-5" />,
            title: "Mobile Ready",
            description: "Access your account seamlessly across desktop, tablet, and mobile devices anywhere."
        }
    ];

    const quickTips = [
        "Use a strong, unique password",
        "Enable two-factor authentication",
        "Never share your login credentials",
        "Sign out from public computers"
    ];

    return (
        <div className="w-full max-w-md mx-auto h-full">
            <div
                className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden h-full flex flex-col transition-all duration-1000 ease-out ${isLoaded
                    ? 'opacity-100 transform translate-y-0 scale-100'
                    : 'opacity-0 transform translate-y-8 scale-95'
                    }`}
                style={{
                    transitionDelay: '300ms'
                }}
            >
                {/* Header */}
                <div
                    className={`px-6 py-6 text-center flex-shrink-0 transition-all duration-800 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                        }`}
                    style={{
                        background: 'linear-gradient(135deg, #043345 0%, #0D9AAC 100%)',
                        transitionDelay: '500ms'
                    }}
                >

                    <div
                        className={`w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-600 ease-out ${isLoaded ? 'opacity-100 transform rotate-0 scale-100' : 'opacity-0 transform rotate-180 scale-50'
                            }`}
                        style={{ transitionDelay: '700ms' }}
                    >
                        <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h1
                        className={`text-xl font-bold text-white mb-1 transition-all duration-600 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                            }`}
                        style={{ transitionDelay: '800ms' }}
                    >
                        Security Tips
                    </h1>
                    <p
                        className={`text-sm text-white/80 transition-all duration-600 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                            }`}
                        style={{ transitionDelay: '900ms' }}
                    >
                        Stay safe and secure
                    </p>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                    {/* Security Features */}
                    <div className="space-y-4 mb-6">
                        {tips.map((tip, index) => (
                            <div
                                key={index}
                                className={`flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-[#00FF99]/5 to-[#00B6C7]/5 border border-[#00B6C7]/10 hover:border-[#00B6C7]/20 transition-all duration-500 ease-out ${isLoaded
                                    ? 'opacity-100 transform translate-x-0'
                                    : 'opacity-0 transform -translate-x-8'
                                    }`}
                                style={{
                                    transitionDelay: `${1000 + (index * 100)}ms`
                                }}
                            >
                                <div
                                    className="flex-shrink-0 p-2 rounded-lg bg-white/80 shadow-sm transition-all duration-400 ease-out"
                                    style={{
                                        color: '#0D9AAC',
                                        transitionDelay: `${1100 + (index * 100)}ms`
                                    }}
                                >
                                    {tip.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className={`font-semibold text-sm mb-1 transition-all duration-400 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        style={{
                                            color: '#043345',
                                            transitionDelay: `${1200 + (index * 100)}ms`
                                        }}
                                    >
                                        {tip.title}
                                    </h3>
                                    <p
                                        className={`text-xs text-gray-600 leading-relaxed transition-all duration-400 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        style={{
                                            transitionDelay: `${1300 + (index * 100)}ms`
                                        }}
                                    >
                                        {tip.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Security Tips */}
                    <div
                        className={`bg-gradient-to-r from-[#009966]/10 to-[#00FF99]/10 rounded-xl p-4 border border-[#00FF99]/20 transition-all duration-700 ease-out ${isLoaded
                            ? 'opacity-100 transform translate-y-0 scale-100'
                            : 'opacity-0 transform translate-y-4 scale-95'
                            }`}
                        style={{
                            transitionDelay: '1800ms'
                        }}
                    >
                        <div
                            className={`flex items-center mb-3 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
                                }`}
                            style={{
                                transitionDelay: '2000ms'
                            }}
                        >
                            <ShieldAlert className="w-4 h-4 mr-2" style={{ color: '#009966' }} />
                            <h4 className="font-semibold text-sm" style={{ color: '#043345' }}>
                                Quick Security Checklist
                            </h4>
                        </div>
                        <ul className="space-y-2">
                            {quickTips.map((tip, index) => (
                                <li
                                    key={index}
                                    className={`flex items-center text-xs text-gray-600 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
                                        }`}
                                    style={{
                                        transitionDelay: `${2100 + (index * 100)}ms`
                                    }}
                                >
                                    <CheckCircle
                                        className="w-3 h-3 mr-2 flex-shrink-0"
                                        style={{ color: '#00FF99' }}
                                    />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className={`px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex-shrink-0 transition-all duration-600 ease-out ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                        }`}
                    style={{
                        transitionDelay: '2500ms'
                    }}
                >
                    <div className="text-center">
                        <p
                            className={`text-xs text-gray-500 mb-2 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                transitionDelay: '2600ms'
                            }}
                        >
                            Need help? Contact our support team
                        </p>
                        <button
                            onClick={() => navigate('/v1/contact', '_blank')}
                            className={`text-xs cursor-pointer font-medium transition-all duration-500 ease-out hover:underline ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                                }`}
                            style={{
                                color: '#0D9AAC',
                                transitionDelay: '2700ms'
                            }}
                        >
                            Get Support →
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #00B6C7 0%, #00FF99 100%);
                    border-radius: 3px;
                    transition: all 0.3s ease;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #009966 0%, #00B6C7 100%);
                    width: 8px;
                }
                
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #00B6C7 rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
};

export default LoginTipsCard;