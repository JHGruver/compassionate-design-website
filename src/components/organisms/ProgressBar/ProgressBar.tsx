"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Home", color: "var(--accent-cyan)" },
  { id: "portfolio", label: "Portfolio", color: "var(--accent-cyan)" },
  { id: "services", label: "Services", color: "var(--accent-magenta)" },
  { id: "about", label: "About", color: "var(--accent-violet)" },
  { id: "contact", label: "Contact", color: "var(--accent-gold)" },
];

export function ProgressBar() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section
      const sectionElements = sections.map((s) => {
        if (s.id === "hero") {
          return { id: s.id, top: 0 };
        }
        const el = document.getElementById(s.id);
        return { id: s.id, top: el?.offsetTop ?? Infinity };
      });

      const currentScroll = scrollTop + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (currentScroll >= sectionElements[i].top) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1">
      {/* Progress Track */}
      <div className="relative flex flex-col items-center">
        {/* Background Track */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-glass-border rounded-full" />

        {/* Active Progress Fill */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[2px] rounded-full origin-top"
          style={{
            background: `linear-gradient(180deg, var(--accent-cyan) 0%, var(--accent-magenta) 50%, var(--accent-gold) 100%)`,
            top: 0,
          }}
          animate={{
            height: `${scrollProgress}%`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        {/* Section Markers */}
        <div className="relative flex flex-col gap-8 py-4">
          {sections.map((section, index) => {
            const isActive = index === activeSection;
            const isPast = index < activeSection;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center"
                aria-label={`Scroll to ${section.label}`}
              >
                {/* Dot */}
                <motion.div
                  className="relative z-10 rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 14 : 8,
                    height: isActive ? 14 : 8,
                    backgroundColor: isActive || isPast ? section.color : "var(--glass-border)",
                    boxShadow: isActive ? `0 0 20px ${section.color}` : "none",
                  }}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Label - appears on hover */}
                <motion.span
                  className="absolute right-8 whitespace-nowrap text-sm font-medium px-3 py-1.5 rounded-lg glass opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{
                    color: isActive ? section.color : "var(--foreground-muted)",
                  }}
                >
                  {section.label}
                </motion.span>

                {/* Active Indicator Ring */}
                {isActive && (
                  <motion.div
                    className="absolute rounded-full border-2"
                    style={{
                      width: 24,
                      height: 24,
                      left: -5,
                      top: -5,
                      borderColor: section.color,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll Percentage */}
      <motion.div
        className="mt-4 text-xs font-mono text-foreground-muted"
        animate={{ opacity: scrollProgress > 5 ? 1 : 0 }}
      >
        {Math.round(scrollProgress)}%
      </motion.div>
    </div>
  );
}

export default ProgressBar;
