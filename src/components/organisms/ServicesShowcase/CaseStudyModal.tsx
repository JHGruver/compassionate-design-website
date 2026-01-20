"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudy } from "@/data/services";

interface CaseStudyModalProps {
  study: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
}

const ExternalLinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function CaseStudyModal({
  study,
  isOpen,
  onClose,
  accentColor = "#F59E0B",
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!study) return null;

  const isExternalImage = study.image.startsWith("http");

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Modal Content - Vertical layout */}
          <motion.div
            className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 10, 14, 0.98)",
              border: `1px solid ${accentColor}25`,
              boxShadow: `0 0 100px ${accentColor}10, 0 30px 60px rgba(0, 0, 0, 0.6)`,
            }}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Close button - floating */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(8px)",
                color: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>

            {/* Top - Image section */}
            <div className="relative w-full flex-1 min-h-0">
              <Image
                src={study.image}
                alt={`${study.client} - ${study.project}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 1024px"
                unoptimized={isExternalImage}
                priority
              />
              {/* Gradient fade to content */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 40%, rgba(10, 10, 14, 1) 100%)`,
                }}
              />
            </div>

            {/* Bottom - Content section (bottom aligned) */}
            <div className="relative px-6 md:px-10 pb-6 md:pb-8 pt-4 -mt-24 z-10">
              {/* Results badge */}
              {study.results && (
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-[11px] font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      color: "#10B981",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {study.results}
                  </span>
                </motion.div>
              )}

              {/* Client name */}
              <motion.p
                className="text-[11px] font-medium uppercase tracking-[0.2em] mb-1"
                style={{ color: accentColor }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {study.client}
              </motion.p>

              {/* Project title */}
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                {study.project}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-sm md:text-base text-gray-400 leading-relaxed mb-5 max-w-3xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {study.description}
              </motion.p>

              {/* Tags - moved above CTA */}
              <motion.div
                className="flex flex-wrap items-center gap-2 mb-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[10px] md:text-[11px] font-medium uppercase tracking-wider"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTA - only Visit Live Site button */}
              {study.link && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
                      color: "#000",
                      boxShadow: `0 6px 20px ${accentColor}30`,
                    }}
                  >
                    Visit Live Site
                    <ExternalLinkIcon />
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CaseStudyModal;
