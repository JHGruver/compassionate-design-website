"use client";

import { motion } from "framer-motion";
import { IP } from "@/data/products";

interface SatelliteProps {
  ip: IP;
  index: number;
  totalCount: number;
  isPaused: boolean;
  isSelected: boolean;
  onClick: () => void;
  containerSize: number;
}

export function Satellite({
  ip,
  index,
  totalCount,
  isPaused,
  isSelected,
  onClick,
  containerSize,
}: SatelliteProps) {
  // Calculate initial angle based on index to spread IPs evenly
  const initialAngle = (index / totalCount) * 360;

  // Determine status indicator color
  const statusColor = ip.category === "sdk"
    ? ip.status === "available"
      ? "#00F5FF"
      : ip.status === "beta"
        ? "#A855F7"
        : "#10B981"
    : "#FF006E";

  // Map orbit radius from data (1.2-3.8) to percentage of container (25%-48%)
  const orbitRadiusPercent = ((ip.orbitRadius - 1.2) / (3.8 - 1.2)) * (48 - 25) + 25;

  // Calculate actual pixel radius
  const orbitRadiusPx = (containerSize / 2) * (orbitRadiusPercent / 100) * 2;

  // Animation duration based on orbit speed (faster speed = shorter duration)
  const orbitDuration = 80 / ip.orbitSpeed;

  return (
    <motion.div
      className="absolute"
      style={{
        top: "50%",
        left: "50%",
        width: 0,
        height: 0,
      }}
      animate={{
        rotate: isPaused ? initialAngle : [initialAngle, initialAngle + 360],
      }}
      transition={{
        duration: orbitDuration,
        repeat: isPaused ? 0 : Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
    >
      {/* Satellite positioned at orbit radius */}
      <motion.button
        className="absolute group cursor-pointer"
        style={{
          left: orbitRadiusPx,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        // Counter-rotate to keep satellite upright
        animate={{
          rotate: isPaused ? -initialAngle : [-initialAngle, -(initialAngle + 360)],
        }}
        transition={{
          duration: orbitDuration,
          repeat: isPaused ? 0 : Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {/* Satellite body */}
        <div
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-125"
              : ""
          }`}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${ip.color}60, ${ip.color}20)`,
            border: `2px solid ${ip.color}`,
            boxShadow: isSelected
              ? `0 0 40px ${ip.color}, 0 0 60px ${ip.color}60`
              : `0 0 20px ${ip.color}50, inset 0 0 15px ${ip.color}30`,
          }}
        >
          {/* Status indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background"
            style={{ backgroundColor: statusColor }}
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                `0 0 5px ${statusColor}`,
                `0 0 15px ${statusColor}`,
                `0 0 5px ${statusColor}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* IP Initial */}
          <span
            className="font-bold text-base select-none"
            style={{ color: ip.color, textShadow: `0 0 10px ${ip.color}` }}
          >
            {ip.title.charAt(0)}
          </span>
        </div>

        {/* Tooltip */}
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
        >
          <div className="glass rounded-xl px-4 py-3 text-sm shadow-2xl border border-glass-border">
            <div className="font-bold text-foreground text-base">{ip.title}</div>
            <div className="text-xs text-foreground-muted mb-1">{ip.tagline}</div>
            <div
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: statusColor }}
            >
              {ip.category === "sdk" ? `SDK ${ip.status.toUpperCase()}` : "SEEKING INVESTMENT"}
            </div>
          </div>
          {/* Tooltip arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </motion.button>
    </motion.div>
  );
}
