import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Users, Building, Heart } from 'lucide-react';

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            category: 'Students',
            icon: GraduationCap,
            headline: 'Learn Smarter. Achieve More.',
            subtext: 'Access courses, live classes, and one-on-one sessions designed for your success.',
            ctaText: 'Start Learning',
            ctaColor: 'bg-green-600 hover:bg-green-700',
            bgGradient: 'from-blue-600/80 to-purple-700/80',
            bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        },
        {
            id: 2,
            category: 'Tutors',
            icon: Users,
            headline: 'Teach with Purpose. Inspire the Future.',
            subtext: 'Share your knowledge, volunteer your time, and make a lasting difference for students.',
            ctaText: 'Become a Tutor',
            ctaColor: 'bg-blue-600 hover:bg-blue-700',
            bgGradient: 'from-teal-600/70 to-blue-700/70',
            bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        },
        {
            id: 3,
            category: 'Institutions',
            icon: Building,
            headline: 'Empower Students. Expand Opportunities.',
            subtext: 'Connect with tutors, manage classes, and track student progress all in one place.',
            ctaText: 'Partner with NEXA',
            ctaColor: 'bg-orange-600 hover:bg-orange-700',
            bgGradient: 'from-orange-600/50 to-red-700/50',
            bgImage: 'https://images.unsplash.com/photo-1603573355706-3f15d98cf100?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 4,
            category: 'Donors',
            icon: Heart,
            headline: 'Your Support Creates Lifelong Impact.',
            subtext: 'See how your contributions transform education with transparent progress dashboards.',
            ctaText: 'Support Education',
            ctaColor: 'bg-red-600 hover:bg-red-700',
            bgGradient: 'from-pink-600/80 to-red-700/80',
            bgImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        }
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 7000);
            return () => clearInterval(interval);
        } else {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div
            className="relative h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Background Images with Overlay */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-85`} />
                </div>
            ))}

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white h-full flex items-center">
                <div className="max-w-4xl mx-auto w-full py-8">
                    {slides.map((slide, index) => {
                        const IconComponent = slide.icon;
                        return (
                            <div
                                key={slide.id}
                                className={`transition-all duration-700 ease-in-out transform ${index === currentSlide
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
                                    }`}
                            >


                                {/* Main Headline */}
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                                    {slide.headline}
                                </h1>

                                {/* Subtext */}
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-3xl mx-auto leading-relaxed opacity-90">
                                    {slide.subtext}
                                </p>

                                {/* CTA Button */}
                                <button className={`inline-flex items-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg font-semibold text-white ${slide.ctaColor} rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 cursor-pointer`}>
                                    <span>{slide.ctaText}</span>
                                    <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 cursor-pointer"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 cursor-pointer"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                    className="h-full bg-white transition-all duration-300 ease-linear"
                    style={{
                        width: `${((currentSlide + 1) / slides.length) * 100}%`
                    }}
                />
            </div>

            {/* Mobile Slide Counter */}
            <div className="absolute top-4 right-4 md:hidden bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                {currentSlide + 1} / {slides.length}
            </div>
        </div>
    );
}