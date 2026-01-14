"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TeamDivision, TeamMember } from "@/data/products";

interface TeamCardProps {
  division: TeamDivision;
  index: number;
}

// Stat bar component
const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] uppercase tracking-wider w-16 text-right opacity-70">{label}</span>
    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: color }}
      />
    </div>
    <span className="text-[10px] font-mono w-6">{value}</span>
  </div>
);

// Member card that appears on hover
const MemberCard = ({
  member,
  index,
  color,
  isVisible
}: {
  member: TeamMember;
  index: number;
  color: string;
  isVisible: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 20,
      scale: isVisible ? 1 : 0.9
    }}
    transition={{
      duration: 0.4,
      delay: isVisible ? index * 0.1 : 0,
      ease: [0.16, 1, 0.3, 1]
    }}
    className="relative p-4 rounded-xl backdrop-blur-xl"
    style={{
      background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)`,
      border: `1px solid ${color}40`,
      boxShadow: `0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${color}20`,
    }}
  >
    {/* Class badge */}
    <div
      className="absolute -top-2 -right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
      style={{
        backgroundColor: color,
        color: "#0A0A0F",
        boxShadow: `0 0 20px ${color}60`
      }}
    >
      {member.class}
    </div>

    {/* Name & Role */}
    <div className="mb-3">
      <h5
        className="text-lg font-bold"
        style={{ color }}
      >
        {member.name}
      </h5>
      <p className="text-xs text-white/60">{member.role}</p>
    </div>

    {/* Stats */}
    <div className="space-y-1.5">
      <StatBar label="CRE" value={member.stats.creativity} color={color} />
      <StatBar label="TECH" value={member.stats.technical} color={color} />
      <StatBar label="LEAD" value={member.stats.leadership} color={color} />
      <StatBar label="CHAOS" value={member.stats.chaos} color="#FF006E" />
    </div>

    {/* Decorative corner */}
    <div
      className="absolute bottom-0 left-0 w-8 h-8 opacity-20"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, transparent 50%)`,
        borderBottomLeftRadius: "0.75rem",
      }}
    />
  </motion.div>
);

export function TeamCard({ division, index }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
    >
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: `1px solid ${isHovered ? division.color : "rgba(255,255,255,0.08)"}`,
          boxShadow: isHovered ? `0 0 60px ${division.color}25` : "none",
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={division.image}
            alt={division.title}
            fill
            className="object-cover transition-all duration-700"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              filter: isHovered ? "brightness(0.4)" : "brightness(1)",
            }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, #0A0A0F 0%, rgba(10,10,15,0.5) 50%, transparent 100%)`,
              opacity: isHovered ? 1 : 0.8,
            }}
          />

          {/* Hover overlay with member cards */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 p-4 flex flex-col justify-center"
              >
                {/* Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                  }}
                />

                {/* Member cards container */}
                <div className="relative z-10 space-y-3 max-h-full overflow-hidden">
                  {division.members.map((member, i) => (
                    <MemberCard
                      key={member.name}
                      member={member}
                      index={i}
                      color={division.color}
                      isVisible={isHovered}
                    />
                  ))}
                </div>

                {/* Corner decorations */}
                <motion.div
                  className="absolute top-3 left-3 w-4 h-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    borderLeft: `2px solid ${division.color}`,
                    borderTop: `2px solid ${division.color}`,
                  }}
                />
                <motion.div
                  className="absolute top-3 right-3 w-4 h-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 }}
                  style={{
                    borderRight: `2px solid ${division.color}`,
                    borderTop: `2px solid ${division.color}`,
                  }}
                />
                <motion.div
                  className="absolute bottom-3 left-3 w-4 h-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    borderLeft: `2px solid ${division.color}`,
                    borderBottom: `2px solid ${division.color}`,
                  }}
                />
                <motion.div
                  className="absolute bottom-3 right-3 w-4 h-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 }}
                  style={{
                    borderRight: `2px solid ${division.color}`,
                    borderBottom: `2px solid ${division.color}`,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Division badge - slides up on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6"
            animate={{
              y: isHovered ? 100 : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <h4
              className="text-xl font-bold mb-2 transition-colors"
              style={{ color: isHovered ? division.color : "#F5F5F5" }}
            >
              {division.title}
            </h4>
            <p className="text-foreground-muted text-sm">
              {division.description}
            </p>
          </motion.div>
        </div>

        {/* Bottom info bar - visible on hover */}
        <motion.div
          className="px-4 py-3 flex items-center justify-between"
          style={{
            background: `linear-gradient(90deg, ${division.color}15, transparent)`,
            borderTop: `1px solid ${division.color}30`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: division.color }}
            />
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: division.color }}>
              {division.members.length} Operatives
            </span>
          </div>
          <span className="text-[10px] text-foreground-muted uppercase tracking-widest">
            Hover for intel
          </span>
        </motion.div>

        {/* Accent line at bottom */}
        <div
          className="h-[2px] transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${division.color}, transparent)`,
            opacity: isHovered ? 1 : 0.3,
          }}
        />
      </div>
    </motion.div>
  );
}

export default TeamCard;
