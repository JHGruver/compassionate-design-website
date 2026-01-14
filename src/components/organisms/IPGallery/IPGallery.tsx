"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";
import { ips, getSDKProducts, getInvestmentIPs } from "@/data/products";
import { IPCard } from "./IPCard";

export function IPGallery() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "sdk" | "investment">("all");

  const sdkProducts = getSDKProducts();
  const investmentIPs = getInvestmentIPs();

  const showSDK = filter === "all" || filter === "sdk";
  const showInvestment = filter === "all" || filter === "investment";

  return (
    <section
      id="portfolio"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedContainer animation="fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full glass text-accent-cyan text-sm font-medium mb-6">
              Our Portfolio
            </span>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.1}>
            <h2 className="display-lg mb-6">
              <span className="text-foreground">10 IPs.</span>{" "}
              <span className="gradient-text">Infinite Potential.</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              From production-ready SDKs to visionary game concepts seeking investment.
            </p>
          </AnimatedContainer>
        </div>

        {/* Filter Pills */}
        <AnimatedContainer animation="fadeInUp" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              { value: "all", label: "All IPs", count: ips.length },
              { value: "sdk", label: "SDK Products", count: sdkProducts.length },
              { value: "investment", label: "Investment Opportunities", count: investmentIPs.length },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as typeof filter)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm ${
                  filter === option.value
                    ? "bg-accent-cyan text-background"
                    : "glass text-foreground hover:border-accent-cyan/50"
                }`}
              >
                {option.label}
                <span className="ml-2 opacity-60">({option.count})</span>
              </button>
            ))}
          </div>
        </AnimatedContainer>

        {/* SDK Products Section */}
        <AnimatePresence mode="wait">
          {showSDK && (
            <motion.div
              key="sdk-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-20"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full bg-accent-cyan" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">SDK Products</h3>
                    <p className="text-sm text-foreground-muted">Tools & frameworks ready for integration</p>
                  </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-accent-cyan/30 to-transparent" />
              </div>

              {/* Card Grid - 2 per row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sdkProducts.map((ip, index) => (
                  <motion.div
                    key={ip.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <IPCard ip={ip} onClick={() => router.push(`/products/${ip.id}`)} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Investment Opportunities Section */}
        <AnimatePresence mode="wait">
          {showInvestment && (
            <motion.div
              key="investment-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full bg-accent-magenta" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Investment Opportunities</h3>
                    <p className="text-sm text-foreground-muted">Visionary games seeking partners</p>
                  </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-accent-magenta/30 to-transparent" />
              </div>

              {/* Card Grid - 2 per row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {investmentIPs.map((ip, index) => (
                  <motion.div
                    key={ip.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <IPCard ip={ip} onClick={() => router.push(`/products/${ip.id}`)} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Investor CTA */}
        <motion.div
          className="text-center mt-20 pt-12 border-t border-glass-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground-muted mb-6">
            Interested in our full portfolio?
          </p>
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-magenta to-accent-violet text-white font-bold hover:opacity-90 transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            Request Investor Package
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default IPGallery;
