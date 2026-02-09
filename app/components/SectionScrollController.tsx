"use client";

import { useEffect, useState } from "react";

export default function SectionScrollController() {
    const [showButton, setShowButton] = useState(false);
    const [activeSection, setActiveSection] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Find all elements marked as scroll sections
            const sections = document.querySelectorAll<HTMLElement>('.scroll-section');

            let foundActive = false;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const viewportMid = scrollY + (viewportHeight / 2);

            // Iterate to find which section we are "inside"
            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                const sectionTopAbsolute = rect.top + scrollY;
                const sectionBottomAbsolute = sectionTopAbsolute + rect.height;

                // Check if viewport middle point is within this section
                if (viewportMid >= sectionTopAbsolute && viewportMid < sectionBottomAbsolute) {
                    // We are in this section.
                    // Now check if we are past 50% of IT.
                    // Actually, simply checking if we are past the middle point of the section?
                    // "when the user scroll half of a section"
                    const sectionMid = sectionTopAbsolute + (rect.height / 2);

                    if (scrollY > sectionMid) {
                        // User has scrolled past the middle of this section
                        // But we only want to show it if we are still IN the section (which we checked above)
                        // AND we want to effectively scroll to the top of THIS section.
                        setShowButton(true);
                        setActiveSection(section);
                    } else {
                        // In the first half, hide button
                        setShowButton(false);
                        setActiveSection(null);
                    }
                    foundActive = true;
                    break; // Found the active section
                }
            }

            if (!foundActive) {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSectionTop = () => {
        if (activeSection) {
            const headerOffset = 80; // Approximate header height to avoid hiding content
            const elementPosition = activeSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (!showButton) return null;

    return (
        <button
            onClick={scrollToSectionTop}
            className="fixed bottom-8 right-8 z-40 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 animate-fade-in hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            aria-label="Scroll to top of section"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>
        </button>
    );
}
