import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Sparkles, Waves } from 'lucide-react';
import LoginCard from '../../../components/global.components/login.components/login.component';
import LoginTipsCard from '../../../components/global.components/login.components/tips.component';
import Navbar from '../../../components/global.components/navbar.component';
import Footer from '../../../components/global.components/footer.component';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Navbar />
            <div
                className={`min-h-screen relative overflow-hidden flex items-center justify-center p-4 transition-all duration-1000 ease-out ${isPageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    background: `
                    radial-gradient(ellipse at top left, #00FF99 0%, transparent 50%),
                    radial-gradient(ellipse at top right, #00B6C7 0%, transparent 50%),
                    radial-gradient(ellipse at bottom left, #0D9AAC 0%, transparent 50%),
                    radial-gradient(ellipse at bottom right, #009966 0%, transparent 50%),
                    linear-gradient(135deg, #043345 0%, #0D9AAC 100%)
                `
                }}
            >
                {/* Animated Background Elements */}
                <div className={`absolute inset-0 opacity-30 transition-all duration-1500 ease-out ${isPageLoaded ? 'opacity-30 scale-100' : 'opacity-0 scale-110'
                    }`}>
                    {/* Floating Circles */}
                    <div
                        className="absolute w-72 h-72 rounded-full blur-3xl animate-pulse"
                        style={{
                            background: 'radial-gradient(circle, #00FF99 0%, transparent 70%)',
                            top: '10%',
                            left: '10%',
                            animationDuration: '4s',
                            transitionDelay: '200ms'
                        }}
                    ></div>
                    <div
                        className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
                        style={{
                            background: 'radial-gradient(circle, #00B6C7 0%, transparent 70%)',
                            top: '50%',
                            right: '10%',
                            animationDuration: '6s',
                            animationDelay: '2s',
                            transitionDelay: '400ms'
                        }}
                    ></div>
                    <div
                        className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse"
                        style={{
                            background: 'radial-gradient(circle, #009966 0%, transparent 70%)',
                            bottom: '20%',
                            left: '20%',
                            animationDuration: '5s',
                            animationDelay: '1s',
                            transitionDelay: '600ms'
                        }}
                    ></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div
                    className={`absolute inset-0 opacity-20 transition-all duration-1000 ease-out ${isPageLoaded ? 'opacity-20' : 'opacity-0'
                        }`}
                    style={{
                        backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                        backgroundSize: '50px 50px',
                        transitionDelay: '800ms'
                    }}
                ></div>

                {/* Floating Particles */}
                <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-1200 ease-out ${isPageLoaded ? 'opacity-100' : 'opacity-0'
                    }`} style={{ transitionDelay: '1000ms' }}>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full opacity-40 animate-bounce"
                            style={{
                                backgroundColor: ['#00FF99', '#00B6C7', '#0D9AAC', '#009966'][i % 4],
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Main Content Container */}
                <div className={`relative z-10 w-full max-w-6xl mx-auto transition-all duration-1000 ease-out ${isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                    }`} style={{ transitionDelay: '600ms' }}>
                    {/* Cards Container */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
                        {/* Login Card */}
                        <div
                            className="w-full lg:w-1/2 flex flex-col"
                            style={{ height: '80vh', maxHeight: '800px' }}
                        >
                            <LoginCard />
                        </div>

                        {/* Tips Card */}
                        <div
                            className="w-full lg:w-1/2 flex flex-col"
                            style={{ height: '80vh', maxHeight: '800px' }}
                        >
                            <LoginTipsCard />
                        </div>
                    </div>

                    {/* Security Features - Below Cards */}
                    <div className={`mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-800 ease-out ${isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                        }`} style={{ transitionDelay: '1200ms' }}>
                        <div className="flex items-center justify-center space-x-8 text-xs text-white/90">
                            <div className={`flex items-center transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
                                }`} style={{ transitionDelay: '1400ms' }}>
                                <Shield
                                    className="w-4 h-4 mr-1.5"
                                    style={{ color: '#00FF99' }}
                                />
                                <span>256-bit SSL</span>
                            </div>
                            <div className={`flex items-center transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
                                }`} style={{ transitionDelay: '1500ms' }}>
                                <CheckCircle
                                    className="w-4 h-4 mr-1.5"
                                    style={{ color: '#00FF99' }}
                                />
                                <span>GDPR Compliant</span>
                            </div>
                            <div className={`flex items-center transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
                                }`} style={{ transitionDelay: '1600ms' }}>
                                <Waves
                                    className="w-4 h-4 mr-1.5"
                                    style={{ color: '#00FF99' }}
                                />
                                <span>2FA Ready</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`mt-6 text-center transition-all duration-600 ease-out ${isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                        }`} style={{ transitionDelay: '1700ms' }}>
                        <p className="text-xs text-white/60 leading-relaxed">
                            By continuing, you agree to our{' '}
                            <button
                                onClick={() => window.open('/v1/tnc', '_blank')}
                                className="underline cursor-pointer hover:text-white/80 transition-colors">
                                Terms of Service
                            </button>
                            {' '}and{' '}
                            <button
                                onClick={() => window.open('/v1/privacy', '_blank')}
                                className="underline cursor-pointer hover:text-white/80 transition-colors">
                                Privacy Policy
                            </button>
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 opacity-30 transition-all duration-1000 ease-out ${isPageLoaded ? 'opacity-30 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                    }`} style={{ transitionDelay: '1800ms' }}>
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1200,160,1248,128,1296,112L1344,96L1344,200L1296,200C1248,200,1152,200,1056,200C960,200,864,200,768,200C672,200,576,200,480,200C384,200,288,200,192,200C96,200,48,200,24,200L0,200Z"
                            fill="rgba(0,255,153,0.1)"
                        ></path>
                    </svg>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;