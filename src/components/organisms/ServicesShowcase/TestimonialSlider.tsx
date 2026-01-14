"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonial } from "@/data/services";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

// Quote icon
const QuoteIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="currentColor"
    opacity="0.3"
  >
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
);

// Avatar placeholder with initials
const AvatarPlaceholder = ({ name, isPlaceholder }: { name: string; isPlaceholder?: boolean }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
      style={{
        background: isPlaceholder
          ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
          : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        color: isPlaceholder ? "rgba(255,255,255,0.5)" : "#0A0A0F",
        border: isPlaceholder ? "2px dashed rgba(255,255,255,0.2)" : "none",
      }}
    >
      {isPlaceholder ? "?" : initials}
    </div>
  );
};

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Quote Icon */}
      <div className="absolute -top-4 left-0 text-amber-500">
        <QuoteIcon />
      </div>

      {/* Testimonial Content */}
      <div className="relative min-h-[200px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Placeholder Notice */}
            {currentTestimonial.isPlaceholder && (
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4"
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  color: "#F59E0B",
                  border: "1px dashed rgba(245, 158, 11, 0.3)",
                }}
              >
                Placeholder - Real testimonial coming soon
              </div>
            )}

            {/* Quote */}
            <blockquote
              className="text-xl md:text-2xl leading-relaxed mb-8"
              style={{
                color: currentTestimonial.isPlaceholder ? "rgba(255,255,255,0.5)" : "#F5F5F5",
                fontStyle: currentTestimonial.isPlaceholder ? "italic" : "normal",
              }}
            >
              &quot;{currentTestimonial.quote}&quot;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <AvatarPlaceholder
                name={currentTestimonial.author}
                isPlaceholder={currentTestimonial.isPlaceholder}
              />
              <div>
                <p
                  className="font-bold"
                  style={{
                    color: currentTestimonial.isPlaceholder ? "rgba(255,255,255,0.5)" : "#F5F5F5",
                  }}
                >
                  {currentTestimonial.author}
                </p>
                <p className="text-sm text-foreground-muted">
                  {currentTestimonial.title} at {currentTestimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === currentIndex ? "#F59E0B" : "rgba(255,255,255,0.2)",
                transform: i === currentIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
