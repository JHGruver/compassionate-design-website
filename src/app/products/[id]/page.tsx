"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ips } from "@/data/products";
import { getIPTheme, getTransitionTiming } from "@/data/ipThemes";

// Back arrow icon
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// Status badge component
const StatusBadge = ({ status, theme }: { status: string; theme: ReturnType<typeof getIPTheme> }) => {
  const statusLabels: Record<string, string> = {
    available: "Available",
    beta: "Beta",
    alpha: "Alpha",
    "seeking-investment": "Seeking Investment",
    concept: "Concept",
  };

  return (
    <span
      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
      style={{
        backgroundColor: `${theme.primary}25`,
        color: theme.primary,
        border: `2px solid ${theme.primary}50`,
      }}
    >
      {statusLabels[status] || status}
    </span>
  );
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const ip = useMemo(() => ips.find((p) => p.id === id), [id]);
  const theme = useMemo(() => getIPTheme(id), [id]);
  const transitionTiming = useMemo(
    () => getTransitionTiming(theme.transitionStyle),
    [theme.transitionStyle]
  );

  if (!ip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link href="/" className="text-accent-cyan hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isInvestment = ip.category === "investment";

  return (
    <div
      className="min-h-screen"
      style={{
        background: theme.background,
      }}
    >
      {/* Pattern overlay */}
      {theme.patternOverlay && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: theme.patternOverlay,
            opacity: theme.textureOpacity * 2,
          }}
        />
      )}

      {/* Back navigation */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: transitionTiming }}
      >
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: `${theme.background}CC`,
            border: `1px solid ${theme.primary}40`,
            color: theme.text,
          }}
        >
          <ArrowLeftIcon />
          <span className="font-medium" style={{ fontFamily: theme.fontFamily }}>
            Back to Portfolio
          </span>
        </button>
      </motion.div>

      {/* Hero Section with full-width image */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={ip.image}
          alt={ip.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${theme.background} 100%)`,
          }}
        />

        {/* Accent lines */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: transitionTiming }}
          style={{ background: theme.gradient }}
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 -mt-32 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Title Block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: transitionTiming }}
            className="mb-12"
          >
            {/* Category + Status */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span
                className="px-3 py-1 rounded text-xs font-mono uppercase tracking-widest"
                style={{
                  backgroundColor: `${theme.secondary}25`,
                  color: theme.secondary,
                  border: `1px solid ${theme.secondary}40`,
                }}
              >
                {isInvestment ? "Investment Opportunity" : "SDK Product"}
              </span>
              <StatusBadge status={ip.status} theme={theme} />
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl mb-4"
              style={{
                fontFamily: theme.fontFamily,
                fontWeight: theme.fontWeight,
                letterSpacing: theme.letterSpacing,
                color: theme.text,
              }}
            >
              {ip.title}
            </h1>

            {/* Tagline */}
            <p
              className="text-2xl md:text-3xl"
              style={{ color: `${theme.text}BB` }}
            >
              {ip.tagline}
            </p>
          </motion.div>

          {/* Gradient divider */}
          <motion.div
            className="h-px mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: transitionTiming }}
            style={{ background: theme.gradient }}
          />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: transitionTiming }}
            className="mb-16"
          >
            <h2
              className="text-xl uppercase tracking-wider mb-4"
              style={{
                color: theme.primary,
                fontFamily: theme.fontFamily,
                letterSpacing: theme.letterSpacing,
              }}
            >
              About
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: `${theme.text}DD` }}
            >
              {ip.description}
            </p>
          </motion.div>

          {/* Features */}
          {ip.features && ip.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: transitionTiming }}
              className="mb-16"
            >
              <h2
                className="text-xl uppercase tracking-wider mb-6"
                style={{
                  color: theme.primary,
                  fontFamily: theme.fontFamily,
                  letterSpacing: theme.letterSpacing,
                }}
              >
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ip.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="p-6 rounded-lg"
                    style={{
                      backgroundColor: `${theme.primary}10`,
                      border: `1px solid ${theme.primary}30`,
                      borderRadius: theme.borderRadius,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mb-3"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <p style={{ color: theme.text }}>{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Market & Investment Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: transitionTiming }}
            className="mb-16"
          >
            <h2
              className="text-xl uppercase tracking-wider mb-6"
              style={{
                color: theme.primary,
                fontFamily: theme.fontFamily,
                letterSpacing: theme.letterSpacing,
              }}
            >
              {isInvestment ? "Investment Details" : "Market Opportunity"}
            </h2>

            <div
              className="p-8 rounded-lg"
              style={{
                backgroundColor: `${theme.primary}08`,
                border: `${theme.borderWidth} ${theme.borderStyle} ${theme.primary}40`,
                borderRadius: theme.borderRadius,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: `${theme.text}88` }}>
                    Market Size
                  </p>
                  <p className="text-xl font-bold" style={{ color: theme.text }}>
                    {ip.investorData.marketSize}
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: `${theme.text}88` }}>
                    Target Audience
                  </p>
                  <p className="text-xl font-bold" style={{ color: theme.text }}>
                    {ip.investorData.targetAudience}
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: `${theme.text}88` }}>
                    Revenue Model
                  </p>
                  <p className="text-xl font-bold" style={{ color: theme.text }}>
                    {ip.investorData.revenueModel}
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: `${theme.text}88` }}>
                    Competitive Advantage
                  </p>
                  <p className="text-xl font-bold" style={{ color: theme.text }}>
                    {ip.investorData.competitiveAdvantage}
                  </p>
                </div>

                {isInvestment && ip.investorData.fundingNeeded && (
                  <>
                    <div>
                      <p className="text-sm uppercase tracking-wider mb-2" style={{ color: `${theme.text}88` }}>
                        Funding Needed
                      </p>
                      <p className="text-2xl font-bold" style={{ color: theme.primary }}>
                        {ip.investorData.fundingNeeded}
                      </p>
                    </div>

                    {ip.investorData.projectedROI && (
                      <div>
                        <p className="text-sm uppercase tracking-wider mb-2" style={{ color: `${theme.text}88` }}>
                          Projected ROI
                        </p>
                        <p className="text-2xl font-bold" style={{ color: theme.primary }}>
                          {ip.investorData.projectedROI}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Development Stage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: transitionTiming }}
            className="mb-16"
          >
            <h2
              className="text-xl uppercase tracking-wider mb-6"
              style={{
                color: theme.primary,
                fontFamily: theme.fontFamily,
                letterSpacing: theme.letterSpacing,
              }}
            >
              Development Stage
            </h2>

            <div className="flex items-center gap-4">
              {["concept", "prototype", "alpha", "beta", "production"].map((stage, i) => {
                const stageIndex = ["concept", "prototype", "alpha", "beta", "production"].indexOf(ip.developmentStage);
                const isActive = i <= stageIndex;
                const isCurrent = i === stageIndex;

                return (
                  <div key={stage} className="flex-1">
                    <div
                      className="h-3 rounded-full mb-2 transition-all"
                      style={{
                        backgroundColor: isActive ? theme.primary : `${theme.text}20`,
                        boxShadow: isCurrent ? `0 0 20px ${theme.glowColor}60` : "none",
                      }}
                    />
                    <p
                      className="text-xs uppercase tracking-wider text-center"
                      style={{
                        color: isActive ? theme.text : `${theme.text}50`,
                        fontWeight: isCurrent ? 700 : 400,
                      }}
                    >
                      {stage}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: transitionTiming }}
            className="text-center pt-8"
          >
            <button
              className="px-10 py-5 text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: theme.gradient,
                color: theme.text === "#1A1A1A" ? "#FFFFFF" : theme.background.includes("255") ? "#1A1A1A" : "#FFFFFF",
                borderRadius: theme.borderRadius,
                boxShadow: `0 10px 40px ${theme.glowColor}40`,
                fontFamily: theme.fontFamily,
                letterSpacing: theme.letterSpacing,
              }}
            >
              {isInvestment ? "Request Investment Package" : "Get Started with SDK"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-1 w-full"
        style={{ background: theme.gradient }}
      />
    </div>
  );
}
