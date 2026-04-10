'use client';

import { useState, useEffect } from 'react';

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to hero section smoothly
    const scrollToHero = () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToHero}
                    className="fixed bottom-8 right-8 z-40"
                    aria-label="Scroll to top"
                >
                    <div className="relative w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7 14l5-5 5 5z" />
                        </svg>
                    </div>
                </button>
            )}
        </>
    );
}
