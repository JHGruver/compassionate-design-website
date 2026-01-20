"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CaseStudy } from "@/data/services";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  accentColor?: string;
  onSelect?: (study: CaseStudy) => void;
}

export function CaseStudyCard({ study, index, accentColor = "#F59E0B", onSelect }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if image is an external URL (for live screenshots)
  const isExternalImage = study.image.startsWith("http");

  const handleClick = () => {
    if (onSelect) {
      onSelect(study);
    } else if (study.link) {
      window.open(study.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: isHovered ? `1px solid ${accentColor}80` : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isHovered ? `0 0 60px ${accentColor}25` : "none",
        }}
      >
        {/* Image Container - Larger aspect ratio for cleaner look */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {!imageError ? (
            <Image
              src={study.image}
              alt={`${study.client} - ${study.project}`}
              fill
              className="object-cover transition-all duration-700"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
              unoptimized={isExternalImage}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}05 100%)`,
              }}
            >
              <div className="text-center">
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: accentColor }}
                >
                  {study.client.charAt(0)}
                </div>
                <div className="text-sm text-foreground-muted uppercase tracking-wider">
                  {study.client}
                </div>
              </div>
            </div>
          )}

          {/* Shimmer Effect on Hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: isHovered ? "100%" : "-100%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentColor}40 50%, transparent 100%)`,
            }}
          />

          {/* Enhanced Gradient Overlay for better text readability */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: isHovered
                ? "linear-gradient(to top, rgba(5, 5, 10, 0.98) 0%, rgba(5, 5, 10, 0.85) 35%, rgba(5, 5, 10, 0.4) 60%, transparent 100%)"
                : "linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.6) 30%, rgba(10, 10, 15, 0.2) 50%, transparent 100%)",
            }}
          />

          {/* Click Indicator */}
          <motion.div
            className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: `${accentColor}20`,
              border: `1px solid ${accentColor}40`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </motion.div>

          {/* Content - Clean & Minimal */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Client Name */}
            <motion.p
              className="text-xs font-mono uppercase tracking-widest mb-1"
              style={{ color: accentColor }}
              animate={{
                y: isHovered ? -2 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {study.client}
            </motion.p>

            {/* Project Title */}
            <motion.h4
              className="text-xl md:text-2xl font-bold text-white"
              animate={{
                y: isHovered ? -2 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {study.project}
            </motion.h4>

            {/* "View Details" text on hover */}
            <motion.p
              className="text-sm mt-2 flex items-center gap-2"
              style={{ color: accentColor }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {study.link ? "View project" : "View details"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.p>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div
          className="h-[2px] transition-all duration-500"
          style={{
            background: isHovered
              ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}
