"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ServiceTier as ServiceTierType } from "@/data/services";

interface ServiceTierProps {
  tier: ServiceTierType;
  index: number;
  onCtaClick: () => void;
}

// Checkmark icon
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function ServiceTier({ tier, index, onCtaClick }: ServiceTierProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isHighlighted = tier.highlighted;
  const accentColor = isHighlighted ? "#F59E0B" : "#00F5FF";

  return (
    <motion.div
      className="relative h-full"
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
    >
      {/* Popular Badge */}
      {isHighlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10"
          style={{
            backgroundColor: "#F59E0B",
            color: "#0A0A0F",
          }}
        >
          Most Popular
        </div>
      )}

      <div
        className="relative h-full rounded-2xl p-6 transition-all duration-500 flex flex-col"
        style={{
          background: isHighlighted
            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%)"
            : "rgba(255, 255, 255, 0.02)",
          border: isHovered
            ? `2px solid ${accentColor}`
            : isHighlighted
              ? "2px solid rgba(245, 158, 11, 0.3)"
              : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isHovered
            ? `0 0 40px ${accentColor}20`
            : isHighlighted
              ? "0 0 30px rgba(245, 158, 11, 0.1)"
              : "none",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        }}
      >
        {/* Tier Name */}
        <h4
          className="text-lg font-bold uppercase tracking-wider mb-2"
          style={{ color: accentColor }}
        >
          {tier.name}
        </h4>

        {/* Price */}
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">{tier.price}</span>
          {tier.priceNote && (
            <span className="text-sm text-foreground-muted ml-2">
              {tier.priceNote}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted mb-6 leading-relaxed">
          {tier.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {tier.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <span
                className="mt-0.5 flex-shrink-0"
                style={{ color: accentColor }}
              >
                <CheckIcon />
              </span>
              <span className="text-foreground-muted">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300"
          style={{
            background: isHighlighted
              ? "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
              : isHovered
                ? `${accentColor}20`
                : "transparent",
            color: isHighlighted ? "#0A0A0F" : accentColor,
            border: isHighlighted ? "none" : `1px solid ${accentColor}50`,
            boxShadow: isHighlighted && isHovered ? "0 10px 30px rgba(245, 158, 11, 0.3)" : "none",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCtaClick}
        >
          {tier.ctaText}
        </motion.button>
      </div>
    </motion.div>
  );
}
