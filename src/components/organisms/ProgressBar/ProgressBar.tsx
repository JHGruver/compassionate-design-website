"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "portfolio", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function ProgressBar() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;

    // Show after scrolling past hero
    setIsVisible(scrollTop > 200);

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
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Page navigation"
        >
          <div className="relative flex flex-col items-end gap-6">
            {/* Vertical line connector */}
            <div
              className="absolute right-[5px] top-3 bottom-3 w-px"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            />

            {/* Progress fill */}
            <motion.div
              className="absolute right-[5px] top-3 w-px origin-top"
              style={{
                backgroundColor: "rgba(0, 212, 255, 0.6)",
              }}
              animate={{
                height: `${(activeSection / (sections.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {sections.map((section, index) => {
              const isActive = index === activeSection;
              const isPast = index < activeSection;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="group relative flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
                  aria-label={`Navigate to ${section.label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Label */}
                  <motion.span
                    className="text-xs font-medium tracking-wide uppercase"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : 8,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      color: isActive
                        ? "rgba(0, 212, 255, 1)"
                        : isPast
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    {section.label}
                  </motion.span>

                  {/* Dot indicator */}
                  <div className="relative">
                    <motion.div
                      className="rounded-full transition-colors duration-300"
                      style={{
                        width: 11,
                        height: 11,
                        backgroundColor: isActive
                          ? "rgba(0, 212, 255, 1)"
                          : isPast
                            ? "rgba(0, 212, 255, 0.5)"
                            : "rgba(255, 255, 255, 0.15)",
                        boxShadow: isActive
                          ? "0 0 12px rgba(0, 212, 255, 0.6)"
                          : "none",
                      }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.15 }}
                    />

                    {/* Active pulse ring */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: "1px solid rgba(0, 212, 255, 0.4)",
                        }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{
                          scale: [1, 1.8, 1.8],
                          opacity: [0.8, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default ProgressBar;
