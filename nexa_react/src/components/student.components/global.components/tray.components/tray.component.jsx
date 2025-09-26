import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

// Main Tray Component
const Tray = ({
    title,
    subTitle,
    children,
    shareSpace = false,
    className = "",
    showScrollIndicator = true,
    seeMoreLink = null,
    seeMoreText = "See More"
}) => {
    const scrollContainerRef = useRef(null);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    // Check scroll position and update scroll indicators
    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, [children]);

    // Handle scroll functionality
    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    // Handle see more click
    const handleSeeMoreClick = () => {
        if (seeMoreLink) {
            window.open(seeMoreLink, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Header Section */}
            {(title || subTitle) && (
                <div className="flex items-center justify-between mb-6">
                    <div>
                        {title && (
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                {title}
                            </h2>
                        )}
                        {subTitle && (
                            <p className="text-gray-600 text-sm md:text-base">
                                {subTitle}
                            </p>
                        )}
                    </div>

                    {/* See More Button */}
                    {seeMoreLink && (
                        <button
                            onClick={handleSeeMoreClick}
                            className="flex cursor-pointer items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base transition-colors duration-200 hover:underline"
                        >
                            {seeMoreText}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}

            {/* Scrollable Content Container */}
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className={`
            overflow-x-auto p-3  overflow-y-hidden scrollbar-hide
            ${shareSpace ? 'flex justify-evenly items-center' : 'flex gap-4'}
          `}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {shareSpace ? (
                        // When shareSpace is true, distribute children evenly
                        React.Children.map(children, (child, index) => (
                            <div key={index} className="flex-1 min-w-0 px-2 first:pl-0 last:pr-0">
                                {child}
                            </div>
                        ))
                    ) : (
                        // Normal horizontal scroll behavior
                        children
                    )}
                </div>

                {/* Left Scroll Indicator */}
                {showScrollIndicator && canScrollLeft && (
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent flex items-center justify-start pl-2 pointer-events-none z-10">
                        <button
                            onClick={scrollLeft}
                            className="p-2 rounded-full cursor-pointer bg-white/90 hover:bg-white shadow-lg border border-gray-200 transition-all duration-300 text-gray-700 hover:text-gray-900 pointer-events-auto"
                            aria-label="Scroll left"
                        >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                        </button>
                    </div>
                )}

                {/* Right Scroll Indicator */}
                {showScrollIndicator && canScrollRight && (
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent flex items-center justify-end pr-2 pointer-events-none z-10">
                        <button
                            onClick={scrollRight}
                            className="p-2 rounded-full  cursor-pointer bg-white/90 hover:bg-white shadow-lg border border-gray-200 transition-all duration-300 text-gray-700 hover:text-gray-900 pointer-events-auto"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 " />
                        </button>
                    </div>
                )}

                {/* Mobile Scroll Indicator (fallback) */}
                {showScrollIndicator && canScrollRight && (
                    <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent flex items-center justify-end pr-2 pointer-events-none">
                        <ChevronRight className="w-5 h-5 text-gray-400 animate-pulse" />
                    </div>
                )}
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default Tray;