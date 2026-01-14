"use client";

import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";
import { CaseStudyCard } from "./CaseStudyCard";
import { ServiceTier } from "./ServiceTier";
import { TestimonialSlider } from "./TestimonialSlider";
import {
  caseStudies,
  portfolioSites,
  serviceTiers,
  testimonials,
  metrics,
} from "@/data/services";

export function ServicesShowcase() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-10" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedContainer animation="fadeInUp">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                color: "#F59E0B",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              Services
            </span>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.1}>
            <h2 className="display-lg mb-6">
              <span className="text-foreground">Modernize</span>{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Product
              </span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Transform dated interfaces into modern, engaging experiences.
              We&apos;ve helped enterprise clients refresh their digital products with
              stunning results.
            </p>
          </AnimatedContainer>
        </div>

        {/* Metrics Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 p-6 rounded-2xl"
          style={{
            background: "rgba(245, 158, 11, 0.05)",
            border: "1px solid rgba(245, 158, 11, 0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {metrics.map((metric, i) => (
            <div key={i} className="text-center relative">
              {metric.isPlaceholder && (
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    color: "#F59E0B",
                  }}
                  title="Placeholder - Update with real data"
                >
                  *
                </div>
              )}
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ color: "#F59E0B" }}
              >
                {metric.value}
              </div>
              <div className="text-sm text-foreground-muted">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <div className="mb-24">
          <AnimatedContainer animation="fadeInUp" className="mb-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: "#F59E0B" }}
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Case Studies
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Real transformations for enterprise clients
                  </p>
                </div>
              </div>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(90deg, rgba(245, 158, 11, 0.3) 0%, transparent 100%)",
                }}
              />
            </div>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </div>

        {/* Portfolio Sites */}
        <div className="mb-24">
          <AnimatedContainer animation="fadeInUp" className="mb-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: "#00D4FF" }}
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Portfolio
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Websites I&apos;ve designed and built
                  </p>
                </div>
              </div>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(90deg, rgba(0, 212, 255, 0.3) 0%, transparent 100%)",
                }}
              />
            </div>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioSites.map((site, index) => (
              <CaseStudyCard
                key={site.id}
                study={site}
                index={index}
                accentColor="#00D4FF"
              />
            ))}
          </div>
        </div>

        {/* Service Tiers */}
        <div className="mb-24">
          <AnimatedContainer animation="fadeInUp" className="text-center mb-12">
            <h3 className="display-md mb-4">
              <span className="text-foreground">Choose Your</span>{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Path
              </span>
            </h3>
            <p className="text-foreground-muted max-w-xl mx-auto">
              From a free audit to full transformation, we have a solution for
              every stage of your product&apos;s journey.
            </p>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTiers.map((tier, index) => (
              <ServiceTier
                key={tier.id}
                tier={tier}
                index={index}
                onCtaClick={scrollToContact}
              />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <AnimatedContainer animation="fadeInUp" className="text-center mb-12">
            <h3 className="display-md mb-4">
              <span className="text-foreground">What Clients</span>{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Say
              </span>
            </h3>
          </AnimatedContainer>

          <motion.div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TestimonialSlider testimonials={testimonials} />
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-foreground-muted mb-6">
            Ready to transform your product?
          </p>
          <button
            onClick={scrollToContact}
            className="px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "#0A0A0F",
              boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3)",
            }}
          >
            Get Your Free Audit
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesShowcase;
