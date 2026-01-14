"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CaseStudy } from "@/data/services";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  accentColor?: string;
}

// External link icon
const ExternalLinkIcon = () => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export function CaseStudyCard({ study, index, accentColor = "#F59E0B" }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (study.link) {
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
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {!imageError ? (
            <Image
              src={study.image}
              alt={`${study.client} - ${study.project}`}
              fill
              className="object-cover transition-all duration-700"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={() => setImageError(true)}
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
                  className="text-4xl font-bold mb-2"
                  style={{ color: accentColor }}
                >
                  {study.client.charAt(0)}
                </div>
                <div className="text-xs text-foreground-muted uppercase tracking-wider">
                  {study.client}
                </div>
              </div>
            </div>
          )}

          {/* Shimmer/Transformation Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: isHovered ? "100%" : "-100%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentColor}50 50%, transparent 100%)`,
            }}
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: "linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.3) 50%, transparent 100%)",
              opacity: isHovered ? 1 : 0.7,
            }}
          />

          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {study.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Result Badge - Shows on hover */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {study.results && (
              <span
                className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#10B981",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                }}
              >
                {study.results}
              </span>
            )}
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Client Name */}
            <motion.p
              className="text-xs font-mono uppercase tracking-widest mb-2"
              style={{ color: accentColor }}
              animate={{
                y: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {study.client}
            </motion.p>

            {/* Project Title */}
            <motion.h4
              className="text-xl font-bold text-white mb-2"
              animate={{
                y: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {study.project}
            </motion.h4>

            {/* Description - Reveals on hover */}
            <motion.p
              className="text-sm text-foreground-muted leading-relaxed"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {study.description}
            </motion.p>

            {/* View Link */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <span className="text-sm font-medium" style={{ color: accentColor }}>
                {study.link ? "Visit Site" : "View Details"}
              </span>
              {study.link ? (
                <span style={{ color: accentColor }}>
                  <ExternalLinkIcon />
                </span>
              ) : (
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </motion.div>
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
