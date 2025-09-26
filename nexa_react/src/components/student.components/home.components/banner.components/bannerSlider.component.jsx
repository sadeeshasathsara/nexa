import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ActionBox from './actionBox.component';
import Banner from './banner.component';

// Main Banner Slider Component
const BannerSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample banner data
    const banners = [
        {
            id: 1,
            backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            actionBoxProps: {
                heading: "Master tomorrow's skills today",
                subText: "Power up your AI, career, and life skills with the most up-to-date, expert-led learning.",
                primaryButton: {
                    text: "Try it free",
                    onClick: () => console.log('Try it free clicked')
                },
                secondaryButton: {
                    text: "Learn AI",
                    onClick: () => console.log('Learn AI clicked')
                }
            }
        },
        {
            id: 2,
            backgroundImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            actionBoxProps: {
                heading: "Build Your Future with Code",
                subText: "Join thousands of developers learning cutting-edge programming skills and technologies.",
                primaryButton: {
                    text: "Start Coding",
                    onClick: () => console.log('Start Coding clicked')
                },
                secondaryButton: {
                    text: "View Courses",
                    onClick: () => console.log('View Courses clicked')
                }
            }
        },
        {
            id: 3,
            backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            actionBoxProps: {
                heading: "Data Science Revolution",
                subText: "Transform your career with advanced analytics and machine learning expertise.",
                primaryButton: {
                    text: "Get Started",
                    onClick: () => console.log('Get Started clicked')
                }
            }
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [banners.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto p-4">
            {/* Main Banner */}
            <div className="relative">
                <Banner
                    backgroundImage={banners[currentSlide].backgroundImage}
                    actionBoxProps={banners[currentSlide].actionBoxProps}
                />

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>


        </div>
    );
};

export default BannerSlider;