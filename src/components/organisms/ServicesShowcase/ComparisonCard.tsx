"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CaseStudy } from "@/data/services";

interface ComparisonCardProps {
  study: CaseStudy;
  index: number;
  accentColor?: string;
}

export function ComparisonCard({
  study,
  index,
  accentColor = "#F59E0B",
}: ComparisonCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-1.5 h-6 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <h4 className="text-xl font-bold text-foreground">{study.client}</h4>
        </div>
        <p className="text-foreground-muted text-sm ml-5">{study.project}</p>
      </div>

      {/* Comparison Container */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Images Row */}
        <div className="grid grid-cols-2 gap-0">
          {/* Our Design - Left */}
          <div className="relative">
            <div
              className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: accentColor,
                color: "#0A0A0F",
              }}
            >
              Our Design
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={study.image}
                alt={`${study.client} - Our Design`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 60%, rgba(10, 10, 15, 0.8) 100%)`,
                }}
              />
            </div>
          </div>

          {/* Competitor - Right */}
          <div className="relative">
            <div
              className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Original
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={study.comparisonImage || study.image}
                alt={`${study.client} - Original`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{
                  filter: "saturate(0.7)",
                }}
              />
              {/* Darker overlay for competitor */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, rgba(10, 10, 15, 0.2) 0%, rgba(10, 10, 15, 0.8) 100%)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Divider line between images */}
        <div
          className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 z-20"
          style={{
            background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
          }}
        />

        {/* Info Footer */}
        <div
          className="p-6"
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
            {study.description}
          </p>

          <div className="flex items-center justify-between">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Result */}
            {study.results && (
              <div
                className="text-sm font-semibold"
                style={{ color: accentColor }}
              >
                {study.results}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ComparisonCard;
