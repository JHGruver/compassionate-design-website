"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingAnimationProps {
  onComplete: () => void;
}

// Generate stable particle positions (seeded for consistency)
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    // Use deterministic positions based on index
    const angle = (i / count) * Math.PI * 2;
    const radius = 30 + (i % 5) * 10;
    particles.push({
      id: i,
      left: 50 + Math.cos(angle + i * 0.5) * radius,
      top: 50 + Math.sin(angle + i * 0.5) * radius,
      color: i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-magenta)",
      scatterX: Math.cos(angle) * 150,
      scatterY: Math.sin(angle) * 150,
    });
  }
  return particles;
}

export function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [phase, setPhase] = useState<"grid" | "particles" | "reveal" | "done">("grid");
  const particles = useMemo(() => generateParticles(30), []);

  useEffect(() => {
    // Phase timing
    const gridDuration = 1200;
    const particlesDuration = 1000;
    const revealDuration = 800;

    const gridTimer = setTimeout(() => setPhase("particles"), gridDuration);
    const particlesTimer = setTimeout(() => setPhase("reveal"), gridDuration + particlesDuration);
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, gridDuration + particlesDuration + revealDuration);

    return () => {
      clearTimeout(gridTimer);
      clearTimeout(particlesTimer);
      clearTimeout(revealTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Grid Background */}
          <div className="absolute inset-0">
            {/* Animated grid lines */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="loading-grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <motion.path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="var(--accent-cyan)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: phase === "grid" || phase === "particles" ? 1 : 1,
                      opacity: phase === "reveal" ? 0 : 0.3,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </pattern>
              </defs>
              <motion.rect
                width="100%"
                height="100%"
                fill="url(#loading-grid)"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "reveal" ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
          </div>

          {/* Particles */}
          <AnimatePresence>
            {(phase === "particles" || phase === "reveal") && (
              <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                      background: particle.color,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: phase === "reveal" ? [1, 1.5, 0] : [0, 1, 1],
                      opacity: phase === "reveal" ? [1, 0.5, 0] : [0, 1, 0.8],
                      x: phase === "reveal" ? particle.scatterX : 0,
                      y: phase === "reveal" ? particle.scatterY : 0,
                    }}
                    transition={{
                      duration: phase === "reveal" ? 0.6 : 0.8,
                      delay: particle.id * 0.02,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Center Logo/Text */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase === "reveal" ? 0 : 1,
              scale: phase === "reveal" ? 1.1 : 1,
              y: phase === "reveal" ? -20 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Compassionate Design
            </motion.h1>
            <motion.div
              className="mt-4 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "particles" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-foreground-muted text-sm">Loading</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Radial gradient overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, transparent 0%, var(--background) 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingAnimation;
