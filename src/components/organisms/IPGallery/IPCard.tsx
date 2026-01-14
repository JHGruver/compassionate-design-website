"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IP } from "@/data/products";
import { getIPTheme, getTransitionTiming, IPTheme } from "@/data/ipThemes";

interface IPCardProps {
  ip: IP;
  onClick: () => void;
}

// Pre-generated stable random values for particle effects
const PARTICLE_POSITIONS = [15, 42, 68, 25, 83, 51]; // x positions (%)
const PARTICLE_DURATIONS = [2.3, 3.1, 2.7, 3.8, 2.5, 3.4]; // duration offsets
const PARTICLE_DELAYS = [0.2, 1.1, 0.7, 1.8, 0.4, 1.5]; // animation delays

// Special effect overlays
const SpecialEffects = ({ effect, isHovered, theme }: { effect?: string; isHovered: boolean; theme: IPTheme }) => {
  if (!effect || effect === "none" || !isHovered) return null;

  switch (effect) {
    case "scanlines":
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          }}
        />
      );
    case "noise":
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      );
    case "vignette":
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      );
    case "spotlight":
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at 30% 20%, ${theme.glowColor}40 0%, transparent 50%)`,
          }}
        />
      );
    case "particles":
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: theme.glowColor }}
              initial={{
                x: PARTICLE_POSITIONS[i] + "%",
                y: "100%",
                opacity: 0
              }}
              animate={{
                y: "-20%",
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: PARTICLE_DURATIONS[i],
                repeat: Infinity,
                delay: PARTICLE_DELAYS[i],
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      );
    default:
      return null;
  }
};

export function IPCard({ ip, onClick }: IPCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useMemo(() => getIPTheme(ip.id), [ip.id]);
  const transitionTiming = useMemo(() => getTransitionTiming(theme.transitionStyle), [theme.transitionStyle]);

  // Status display config
  const statusConfig: Record<string, { label: string; color: string }> = {
    available: { label: "Available", color: "#00F5FF" },
    beta: { label: "Beta", color: "#A855F7" },
    alpha: { label: "Alpha", color: "#10B981" },
    "seeking-investment": { label: "Seeking Investment", color: "#FF006E" },
    concept: { label: "Concept", color: "#F59E0B" },
  };

  const status = statusConfig[ip.status] || statusConfig.concept;
  const isInvestment = ip.category === "investment";

  // Calculate dynamic styles based on hover state
  const cardStyles = useMemo(() => {
    if (!isHovered) {
      return {
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
      };
    }

    return {
      background: theme.background,
      border: `${theme.borderWidth} ${theme.borderStyle} ${theme.primary}`,
      borderRadius: theme.borderRadius,
      boxShadow: `0 20px 60px ${theme.glowColor}${Math.round(theme.glowIntensity * 60).toString(16).padStart(2, '0')}`,
    };
  }, [isHovered, theme]);

  return (
    <motion.article
      className="group relative overflow-hidden cursor-pointer"
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      animate={{
        scale: isHovered ? theme.hoverScale : 1,
        rotate: isHovered ? theme.hoverRotate : 0,
      }}
      transition={{
        duration: 0.4,
        ease: transitionTiming,
      }}
    >
      {/* Pattern overlay */}
      <AnimatePresence>
        {isHovered && theme.patternOverlay && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: theme.textureOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: theme.patternOverlay }}
          />
        )}
      </AnimatePresence>

      {/* Special effects */}
      <AnimatePresence>
        <SpecialEffects effect={theme.specialEffect} isHovered={isHovered} theme={theme} />
      </AnimatePresence>

      {/* Gradient accent line - top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-30"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: isHovered ? 1 : 0,
          background: theme.gradient,
        }}
        transition={{ duration: 0.4, ease: transitionTiming }}
      />

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={ip.image}
          alt={ip.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? `scale(1.08)` : "scale(1)",
            filter: isHovered ? `saturate(1.2)` : "saturate(1)",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay - transitions to IP theme colors */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? `linear-gradient(to top, ${theme.background} 0%, ${theme.background}99 30%, transparent 100%)`
              : "linear-gradient(to top, rgb(10, 10, 15) 0%, rgba(10, 10, 15, 0.4) 50%, transparent 100%)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Status Badge - transforms to IP style */}
        <motion.div
          className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold tracking-wider backdrop-blur-sm z-20"
          animate={{
            backgroundColor: isHovered ? `${theme.primary}30` : `${status.color}20`,
            color: isHovered ? theme.text : status.color,
            borderColor: isHovered ? theme.primary : `${status.color}50`,
            borderRadius: isHovered ? theme.borderRadius : "9999px",
            letterSpacing: isHovered ? theme.letterSpacing : "0.05em",
            textTransform: isHovered ? (theme.textTransform || "uppercase") : "uppercase",
          }}
          style={{
            border: "1px solid",
          }}
          transition={{ duration: 0.3 }}
        >
          {status.label}
        </motion.div>

        {/* Category indicator - transforms to IP style */}
        <motion.div
          className="absolute top-4 left-4 px-2 py-1 text-[10px] font-mono tracking-widest backdrop-blur-sm z-20"
          animate={{
            backgroundColor: isHovered
              ? `${theme.secondary}25`
              : isInvestment ? "rgba(255, 0, 110, 0.15)" : "rgba(0, 245, 255, 0.15)",
            color: isHovered ? theme.accent : (isInvestment ? "#FF006E" : "#00F5FF"),
            borderColor: isHovered ? theme.secondary : (isInvestment ? "rgba(255, 0, 110, 0.3)" : "rgba(0, 245, 255, 0.3)"),
            borderRadius: isHovered ? theme.borderRadius : "4px",
          }}
          style={{
            border: "1px solid",
            textTransform: "uppercase",
          }}
          transition={{ duration: 0.3 }}
        >
          {isInvestment ? "Invest" : "SDK"}
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        className="p-5 relative z-10"
        animate={{
          backgroundColor: isHovered ? "transparent" : "transparent",
        }}
      >
        {/* Title - transforms to IP typography */}
        <motion.h3
          className="text-xl mb-1 transition-all duration-300"
          animate={{
            color: isHovered ? theme.text : "rgb(245, 245, 245)",
            fontWeight: isHovered ? theme.fontWeight : 700,
            letterSpacing: isHovered ? theme.letterSpacing : "0",
          }}
          style={{
            fontFamily: isHovered ? theme.fontFamily : "inherit",
          }}
        >
          {ip.title}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          className="text-sm mb-4 line-clamp-2"
          animate={{
            color: isHovered ? `${theme.text}CC` : "rgb(160, 160, 160)",
          }}
        >
          {ip.tagline}
        </motion.p>

        {/* Key Metric */}
        <motion.div
          className="text-xs"
          animate={{
            color: isHovered ? theme.accent : (isInvestment ? "#FF006E" : "rgb(160, 160, 160)"),
          }}
        >
          {isInvestment ? (
            <span>{ip.investorData.fundingNeeded}</span>
          ) : (
            <span>{ip.investorData.marketSize.split(" ")[0]} Market</span>
          )}
        </motion.div>

        {/* Hover Reveal Section */}
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.div
            className="pt-4 mt-4"
            style={{
              borderTop: isHovered ? `1px solid ${theme.primary}40` : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Features */}
            {ip.features && ip.features.length > 0 && (
              <ul className="space-y-1.5 mb-4">
                {ip.features.slice(0, 3).map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-xs"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ color: `${theme.text}BB` }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Development Stage */}
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{ color: `${theme.text}88` }}
              >
                Stage:
              </span>
              <div className="flex gap-1">
                {["concept", "prototype", "alpha", "beta", "production"].map((stage, i) => {
                  const stageIndex = ["concept", "prototype", "alpha", "beta", "production"].indexOf(ip.developmentStage);
                  return (
                    <motion.div
                      key={stage}
                      className="w-2 h-2 rounded-full"
                      animate={{
                        backgroundColor: i <= stageIndex ? theme.primary : `${theme.text}20`,
                        scale: i <= stageIndex ? 1 : 0.8,
                      }}
                      transition={{ delay: i * 0.05 }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] z-30"
        animate={{
          background: isHovered ? theme.gradient : `linear-gradient(90deg, transparent, ${ip.color}, transparent)`,
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}
