"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";

const footerLinks = {
  products: [
    { label: "All Products", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Investors", href: "/investors" },
  ],
  connect: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/compassionate-design/" },
    { label: "Portfolio", href: "https://www.jacobgruver.com" },
    { label: "GitHub", href: "https://github.com/JHGruver" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background-secondary border-t border-glass-border">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <AnimatedContainer animation="fadeInUp" className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold gradient-text">
                Compassionate Design
              </span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
              Small team. Unreasonable standards. We build products that make
              people&apos;s lives better.
            </p>
            <p className="text-sm text-foreground-muted">
              contact@compassionate-design.com
            </p>
          </AnimatedContainer>

          {/* Products */}
          <AnimatedContainer animation="fadeInUp" delay={0.1}>
            <h4 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          {/* Company */}
          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <h4 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          {/* Connect */}
          <AnimatedContainer animation="fadeInUp" delay={0.3}>
            <h4 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-2"
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-muted">
            © {currentYear} Compassionate Design LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </footer>
  );
}

export default Footer;
