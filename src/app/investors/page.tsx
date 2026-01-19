"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PasswordGate } from "@/components/organisms/PasswordGate";
import { Button } from "@/components/atoms/Button";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";

export default function InvestorsPage() {
  return (
    <PasswordGate
      title="Investor Package"
      description="Enter the password to access our confidential investor materials."
    >
      <InvestorContent />
    </PasswordGate>
  );
}

function InvestorContent() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);

    try {
      // Dynamic import of html2pdf to avoid SSR issues
      const html2pdf = (await import("html2pdf.js")).default;

      const element = contentRef.current;
      if (!element) return;

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: "Compassionate-Design-Investor-Package.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#0A0A0F",
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait" as const,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("PDF export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-4">
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            Compassionate Design
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? "Exporting..." : "Download PDF"}
          </Button>
        </nav>
      </header>

      {/* Content */}
      <div ref={contentRef} className="pt-24 pb-20">
        {/* Cover Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 grid-background opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-accent-cyan/10 to-accent-magenta/10 rounded-full blur-3xl" />

          <motion.div
            className="relative z-10 text-center max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-accent-magenta text-sm font-medium mb-6">
              Confidential
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Investor Package</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              A comprehensive overview of Compassionate Design&apos;s vision,
              portfolio, and investment opportunities.
            </p>
            <p className="text-sm text-foreground-muted mt-8">
              January 2026
            </p>
          </motion.div>
        </section>

        {/* Executive Summary */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedContainer animation="fadeInUp">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Executive Summary
              </h2>
            </AnimatedContainer>

            <AnimatedContainer animation="fadeInUp" delay={0.1}>
              <div className="glass rounded-2xl p-8 mb-8">
                <p className="text-foreground-muted leading-relaxed mb-6">
                  Compassionate Design is a product studio focused on creating
                  digital experiences that prioritize user well-being and
                  accessibility. Our portfolio spans SDK products for developers
                  and visionary game concepts seeking investment partnerships.
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  [Placeholder: Add your company&apos;s unique value proposition,
                  market opportunity, and key differentiators here.]
                </p>
              </div>
            </AnimatedContainer>

            {/* Key Metrics */}
            <AnimatedContainer animation="fadeInUp" delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "IPs in Portfolio", value: "10" },
                  { label: "SDK Products", value: "4" },
                  { label: "Investment Opportunities", value: "6" },
                  { label: "Target Market Size", value: "$XXB" },
                ].map((metric, index) => (
                  <div
                    key={index}
                    className="glass rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-foreground-muted">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 px-6 bg-background-secondary">
          <div className="max-w-4xl mx-auto">
            <AnimatedContainer animation="fadeInUp">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Company Overview
              </h2>
            </AnimatedContainer>

            <div className="space-y-8">
              <AnimatedContainer animation="fadeInUp" delay={0.1}>
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Our Mission
                  </h3>
                  <p className="text-foreground-muted leading-relaxed">
                    [Placeholder: Describe your company&apos;s mission and the
                    problem you&apos;re solving in the market.]
                  </p>
                </div>
              </AnimatedContainer>

              <AnimatedContainer animation="fadeInUp" delay={0.2}>
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Our Team
                  </h3>
                  <p className="text-foreground-muted leading-relaxed">
                    [Placeholder: Introduce key team members, their backgrounds,
                    and relevant experience.]
                  </p>
                </div>
              </AnimatedContainer>

              <AnimatedContainer animation="fadeInUp" delay={0.3}>
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Our Approach
                  </h3>
                  <p className="text-foreground-muted leading-relaxed">
                    [Placeholder: Explain your unique approach to product
                    development and what sets you apart from competitors.]
                  </p>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </section>

        {/* Portfolio Overview */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedContainer animation="fadeInUp">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Portfolio Overview
              </h2>
            </AnimatedContainer>

            {/* SDK Products */}
            <AnimatedContainer animation="fadeInUp" delay={0.1}>
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 rounded-full bg-accent-cyan" />
                  <h3 className="text-xl font-bold text-foreground">
                    SDK Products
                  </h3>
                </div>
                <div className="glass rounded-2xl p-8">
                  <p className="text-foreground-muted leading-relaxed mb-6">
                    Production-ready tools and frameworks for developers.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Product 1 - [Brief description]",
                      "Product 2 - [Brief description]",
                      "Product 3 - [Brief description]",
                      "Product 4 - [Brief description]",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground-muted"
                      >
                        <span className="text-accent-cyan">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedContainer>

            {/* Investment Opportunities */}
            <AnimatedContainer animation="fadeInUp" delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 rounded-full bg-accent-magenta" />
                  <h3 className="text-xl font-bold text-foreground">
                    Investment Opportunities
                  </h3>
                </div>
                <div className="glass rounded-2xl p-8">
                  <p className="text-foreground-muted leading-relaxed mb-6">
                    Visionary game concepts and digital experiences seeking
                    investment partnerships.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Project 1 - [Brief description and funding need]",
                      "Project 2 - [Brief description and funding need]",
                      "Project 3 - [Brief description and funding need]",
                      "Project 4 - [Brief description and funding need]",
                      "Project 5 - [Brief description and funding need]",
                      "Project 6 - [Brief description and funding need]",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground-muted"
                      >
                        <span className="text-accent-magenta">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Financial Projections */}
        <section className="py-20 px-6 bg-background-secondary">
          <div className="max-w-4xl mx-auto">
            <AnimatedContainer animation="fadeInUp">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Financial Overview
              </h2>
            </AnimatedContainer>

            <AnimatedContainer animation="fadeInUp" delay={0.1}>
              <div className="glass rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Funding Requirements
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  [Placeholder: Detail your funding requirements, use of funds,
                  and expected milestones.]
                </p>
              </div>
            </AnimatedContainer>

            <AnimatedContainer animation="fadeInUp" delay={0.2}>
              <div className="glass rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Revenue Model
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  [Placeholder: Explain your revenue streams, pricing strategy,
                  and path to profitability.]
                </p>
              </div>
            </AnimatedContainer>

            <AnimatedContainer animation="fadeInUp" delay={0.3}>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Growth Projections
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  [Placeholder: Share your growth projections, key metrics, and
                  timeline for achieving milestones.]
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Contact / Next Steps */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedContainer animation="fadeInUp">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Next Steps
              </h2>
            </AnimatedContainer>

            <AnimatedContainer animation="fadeInUp" delay={0.1}>
              <div className="glass rounded-2xl p-8 md:p-12">
                <p className="text-foreground-muted leading-relaxed mb-8 max-w-2xl mx-auto">
                  Interested in learning more or discussing investment
                  opportunities? We&apos;d love to connect and share our vision
                  in more detail.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:investors@compassionate-design.com"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-magenta to-accent-violet text-white font-bold hover:opacity-90 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Us
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-glass-border text-foreground hover:border-accent-cyan transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </AnimatedContainer>

            <AnimatedContainer animation="fadeInUp" delay={0.2}>
              <p className="text-xs text-foreground-muted mt-8">
                This document is confidential and intended solely for the
                recipient. Please do not distribute without permission.
              </p>
            </AnimatedContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
