"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";
import { Button } from "@/components/atoms/Button";
import { MailIcon, LinkedInIcon } from "@/components/atoms/Icon";

export function Contact() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail("");
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-6 bg-background-secondary overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-accent-cyan/10 to-accent-magenta/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedContainer animation="fadeInUp">
          <span className="inline-block px-4 py-2 rounded-full glass text-accent-gold text-sm font-medium mb-6">
            Let&apos;s Create Something
          </span>
        </AnimatedContainer>

        <AnimatedContainer animation="fadeInUp" delay={0.1}>
          <h2 className="display-lg mb-6">
            <span className="text-foreground">Ready to Build</span>
            <br />
            <span className="gradient-text">Something Magical?</span>
          </h2>
        </AnimatedContainer>

        <AnimatedContainer animation="fadeInUp" delay={0.2}>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-12">
            Whether you have a project in mind or just want to say hello, we&apos;d
            love to hear from you. Let&apos;s start a conversation.
          </p>
        </AnimatedContainer>

        {/* Contact Options */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Email */}
          <a
            href="mailto:contact@compassionate-design.com"
            className="group glass rounded-2xl p-8 text-left hover:border-accent-cyan transition-all duration-300"
          >
            <div className="text-accent-cyan mb-4">
              <MailIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent-cyan transition-colors">
              Email Us
            </h3>
            <p className="text-foreground-muted text-sm">
              contact@compassionate-design.com
            </p>
          </a>

          {/* Social */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-2xl p-8 text-left hover:border-accent-violet transition-all duration-300"
          >
            <div className="text-accent-violet mb-4">
              <LinkedInIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent-violet transition-colors">
              Connect on LinkedIn
            </h3>
            <p className="text-foreground-muted text-sm">
              Follow our journey and updates
            </p>
          </a>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="glass rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Join the Inner Circle
          </h3>
          <p className="text-foreground-muted mb-8 max-w-md mx-auto">
            Get early access to new products, behind-the-scenes content, and
            updates on what we&apos;re building next.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 rounded-lg bg-background border border-glass-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent-cyan transition-colors"
            />
            <Button type="submit" size="lg" disabled={isSubmitted}>
              {isSubmitted ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-foreground-muted mt-4">
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
