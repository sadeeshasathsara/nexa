import React from "react";

const useScrollAnimation = () => {
    const [visibleElements, setVisibleElements] = React.useState(new Set());

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleElements(prev => new Set(prev).add(entry.target.dataset.animateId));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        // Observe all elements with data-animate-id
        const elements = document.querySelectorAll('[data-animate-id]');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    return visibleElements;
};

export default useScrollAnimation