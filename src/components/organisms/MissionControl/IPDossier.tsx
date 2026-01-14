"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IP } from "@/data/products";
import { Button } from "@/components/atoms/Button";

interface IPDossierProps {
  ip: IP;
  onClose: () => void;
}

export function IPDossier({ ip, onClose }: IPDossierProps) {
  const statusLabels: Record<string, { label: string; color: string }> = {
    available: { label: "SDK AVAILABLE", color: "#00F5FF" },
    beta: { label: "BETA ACCESS", color: "#A855F7" },
    alpha: { label: "ALPHA ACCESS", color: "#10B981" },
    "seeking-investment": { label: "SEEKING INVESTMENT", color: "#FF006E" },
    concept: { label: "CONCEPT PHASE", color: "#F59E0B" },
  };

  const status = statusLabels[ip.status] || statusLabels.concept;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Dossier Panel */}
      <motion.div
        className="fixed top-0 right-0 h-full w-full max-w-xl bg-background-secondary border-l border-glass-border z-50 overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Header with image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={ip.image}
            alt={ip.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-background-secondary/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-accent-cyan transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Status Badge */}
          <div
            className="absolute bottom-4 left-6 px-4 py-2 rounded-full font-mono text-sm font-bold"
            style={{
              backgroundColor: `${status.color}20`,
              color: status.color,
              border: `1px solid ${status.color}`,
            }}
          >
            {status.label}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title & Tagline */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-2">{ip.title}</h3>
            <p className="text-lg text-foreground-muted">{ip.tagline}</p>
          </div>

          {/* Description */}
          <div className="glass rounded-xl p-4">
            <p className="text-foreground-muted leading-relaxed">{ip.description}</p>
          </div>

          {/* Development Stage */}
          <div>
            <h4 className="text-sm font-mono text-foreground-muted mb-3 uppercase tracking-wider">
              Development Stage
            </h4>
            <div className="flex items-center gap-2">
              {["concept", "prototype", "alpha", "beta", "production"].map((stage, i) => (
                <div key={stage} className="flex-1">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      ["concept", "prototype", "alpha", "beta", "production"].indexOf(ip.developmentStage) >= i
                        ? "bg-accent-cyan"
                        : "bg-glass-border"
                    }`}
                  />
                  <span className="text-xs text-foreground-muted mt-1 block capitalize">
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {ip.features && ip.features.length > 0 && (
            <div>
              <h4 className="text-sm font-mono text-foreground-muted mb-3 uppercase tracking-wider">
                Key Features
              </h4>
              <div className="space-y-2">
                {ip.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ip.color }}
                    />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investor Data */}
          <div className="glass rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-mono text-accent-cyan mb-4 uppercase tracking-wider flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M2 12h20" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Investor Intelligence
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-foreground-muted uppercase mb-1">Market Size</div>
                <div className="text-sm font-bold text-foreground">{ip.investorData.marketSize}</div>
              </div>
              <div>
                <div className="text-xs text-foreground-muted uppercase mb-1">Revenue Model</div>
                <div className="text-sm font-bold text-foreground">{ip.investorData.revenueModel}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-foreground-muted uppercase mb-1">Target Audience</div>
              <div className="text-sm text-foreground">{ip.investorData.targetAudience}</div>
            </div>

            <div>
              <div className="text-xs text-foreground-muted uppercase mb-1">Competitive Advantage</div>
              <div className="text-sm text-foreground">{ip.investorData.competitiveAdvantage}</div>
            </div>

            {/* Investment-specific data */}
            {ip.category === "investment" && (
              <div className="pt-4 border-t border-glass-border grid grid-cols-2 gap-4">
                {ip.investorData.fundingNeeded && (
                  <div>
                    <div className="text-xs text-foreground-muted uppercase mb-1">Funding Needed</div>
                    <div className="text-lg font-bold text-accent-magenta">{ip.investorData.fundingNeeded}</div>
                  </div>
                )}
                {ip.investorData.projectedROI && (
                  <div>
                    <div className="text-xs text-foreground-muted uppercase mb-1">Projected ROI</div>
                    <div className="text-lg font-bold text-accent-cyan">{ip.investorData.projectedROI}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {ip.category === "sdk" ? (
              <>
                <Button className="flex-1">
                  Access SDK
                </Button>
                <Button variant="secondary" className="flex-1">
                  View Docs
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1">
                  Request Pitch Deck
                </Button>
                <Button variant="secondary" className="flex-1">
                  Schedule Call
                </Button>
              </>
            )}
          </div>

          {/* Confidentiality Notice */}
          <p className="text-xs text-foreground-muted text-center pt-4 border-t border-glass-border">
            This information is confidential. By accessing this dossier, you agree to Compassionate Design&apos;s NDA terms.
          </p>
        </div>
      </motion.div>
    </>
  );
}
