"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";
import { ips, IP, getSDKProducts, getInvestmentIPs } from "@/data/products";
import { IPDossier } from "./IPDossier";
import { OrbitRing } from "./OrbitRing";
import { Satellite } from "./Satellite";

export function MissionControl() {
  const [selectedIP, setSelectedIP] = useState<IP | null>(null);
  const [filter, setFilter] = useState<"all" | "sdk" | "investment">("all");
  const [containerSize, setContainerSize] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive isPaused directly from selectedIP (no need for separate state)
  const isPaused = !!selectedIP;

  const filteredIPs = filter === "all"
    ? ips
    : filter === "sdk"
      ? getSDKProducts()
      : getInvestmentIPs();

  // Track container size for responsive satellites
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize(Math.min(rect.width, rect.height));
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section
      id="portfolio"
      className="relative py-32 px-6 overflow-hidden min-h-screen"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-background opacity-20" />

      {/* Radar sweep effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, rgba(0, 245, 255, 0.08) 20deg, transparent 40deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <AnimatedContainer animation="fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full glass text-accent-cyan text-sm font-medium mb-6 font-mono">
              {"// IP_COMMAND_CENTER"}
            </span>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.1}>
            <h2 className="display-lg mb-6">
              <span className="text-foreground">Mission</span>{" "}
              <span className="gradient-text">Control</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-8">
              12 intellectual properties orbiting the Compassionate Design universe.
              Click any satellite to access its dossier.
            </p>
          </AnimatedContainer>

          {/* Filter Controls */}
          <AnimatedContainer animation="fadeInUp" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { value: "all", label: "All IPs", count: ips.length },
                { value: "sdk", label: "SDK Products", count: getSDKProducts().length },
                { value: "investment", label: "Seeking Investment", count: getInvestmentIPs().length },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as typeof filter)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                    filter === option.value
                      ? "bg-accent-cyan text-background"
                      : "glass text-foreground hover:border-accent-cyan"
                  }`}
                >
                  {option.label}
                  <span className="ml-2 opacity-60">({option.count})</span>
                </button>
              ))}
            </div>
          </AnimatedContainer>
        </div>

        {/* Orbital Visualization */}
        <div
          ref={containerRef}
          className="relative aspect-square max-w-3xl mx-auto"
        >
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-accent-cyan via-accent-magenta to-accent-violet flex items-center justify-center cursor-pointer relative"
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(0, 245, 255, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)",
                  "0 0 50px rgba(0, 245, 255, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)",
                  "0 0 30px rgba(0, 245, 255, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              onClick={() => setSelectedIP(null)}
            >
              {/* Inner ring */}
              <div className="absolute inset-2 rounded-full border border-white/20" />
              <span className="text-xs md:text-sm font-bold text-background text-center leading-tight font-mono">
                CD<br />HQ
              </span>
            </motion.div>
          </div>

          {/* Orbit Rings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Inner SDK ring */}
            <OrbitRing radius={25} color="rgba(0, 245, 255, 0.15)" label="SDK" />
            {/* Middle ring */}
            <OrbitRing radius={32} color="rgba(168, 85, 247, 0.1)" />
            {/* Outer investment ring */}
            <OrbitRing radius={42} color="rgba(255, 0, 110, 0.15)" label="INVEST" />
          </svg>

          {/* Satellites (IPs) */}
          {filteredIPs.map((ip, index) => (
            <Satellite
              key={ip.id}
              ip={ip}
              index={index}
              totalCount={filteredIPs.length}
              isPaused={isPaused}
              isSelected={selectedIP?.id === ip.id}
              onClick={() => setSelectedIP(ip)}
              containerSize={containerSize}
            />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-accent-cyan"
              animate={{ boxShadow: ["0 0 5px #00F5FF", "0 0 15px #00F5FF", "0 0 5px #00F5FF"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-foreground-muted">SDK Available</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-accent-violet"
              animate={{ boxShadow: ["0 0 5px #A855F7", "0 0 15px #A855F7", "0 0 5px #A855F7"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-foreground-muted">In Development</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-accent-magenta"
              animate={{ boxShadow: ["0 0 5px #FF006E", "0 0 15px #FF006E", "0 0 5px #FF006E"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-foreground-muted">Seeking Investment</span>
          </div>
        </motion.div>

        {/* CTA for investors */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-foreground-muted mb-4">
            Interested in our portfolio?
          </p>
          <button className="px-8 py-3 rounded-lg bg-accent-magenta text-white font-bold hover:bg-accent-magenta/80 transition-all hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]">
            Request Investor Package
          </button>
        </motion.div>
      </div>

      {/* Dossier Panel */}
      <AnimatePresence>
        {selectedIP && (
          <IPDossier ip={selectedIP} onClose={() => setSelectedIP(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default MissionControl;
