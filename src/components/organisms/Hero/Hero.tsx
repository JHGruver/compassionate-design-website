"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/atoms/Button";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";

// Dynamic import for 3D scene to avoid SSR issues
const Scene3D = dynamic(
  () => import("@/components/three/scenes/Scene3D").then((mod) => mod.Scene3D),
  { ssr: false }
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D className="w-full h-full" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-background z-[1] pointer-events-none" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-[2]" />

      {/* Content - Left Aligned */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12"
        style={{ y, opacity }}
      >
        <div className="max-w-2xl">
          <AnimatedContainer animation="fadeInUp" delay={0}>
            <span className="inline-block px-3 py-1.5 rounded-full glass text-accent-cyan text-xs font-medium mb-4">
              Design That Gives a Damn
            </span>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="block text-foreground">Crafting</span>
              <span className="block gradient-text">Digital Excellence</span>
            </h1>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <p className="text-base md:text-lg text-foreground-muted max-w-lg mb-8">
              Where obsessive craft meets radical empathy. We build side projects
              that feel illegal to use—in the best way possible.
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button size="md" glowEffect>
                Explore Products
              </Button>
              <Button variant="outline" size="md">
                Learn More
              </Button>
            </div>
          </AnimatedContainer>
        </div>

      </motion.div>
    </section>
  );
}

export default Hero;
