"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getIPTheme } from "@/data/ipThemes";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  ipId: string;
  ipTitle: string;
  isInvestment: boolean;
}

// Close icon
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Success check icon
const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function InterestModal({ isOpen, onClose, ipId, ipTitle, isInvestment }: InterestModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const theme = getIPTheme(ipId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Formspree form for email notifications
      const response = await fetch("https://formspree.io/f/mkoboblv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          ip: ipTitle,
          ipId,
          type: isInvestment ? "Investment Inquiry" : "SDK Interest",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        setName("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError("");
    setEmail("");
    setName("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                background: theme.background,
                border: `2px solid ${theme.primary}40`,
                boxShadow: `0 0 60px ${theme.glowColor}30`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient accent line */}
              <div
                className="h-1 w-full"
                style={{ background: theme.gradient }}
              />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: `${theme.primary}20`,
                  color: theme.text,
                }}
              >
                <CloseIcon />
              </button>

              <div className="p-8">
                {isSuccess ? (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div
                      className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${theme.primary}20`,
                        color: theme.primary,
                      }}
                    >
                      <CheckIcon />
                    </div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: theme.text }}
                    >
                      Thank You!
                    </h3>
                    <p
                      className="mb-6"
                      style={{ color: `${theme.text}BB` }}
                    >
                      We&apos;ll be in touch soon about <strong>{ipTitle}</strong>.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                      style={{
                        background: theme.gradient,
                        color: "#FFFFFF",
                      }}
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  /* Form State */
                  <>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{
                          color: theme.text,
                          fontFamily: theme.fontFamily,
                        }}
                      >
                        {isInvestment ? "Request Investment Package" : "Get SDK Access"}
                      </h3>
                      <p style={{ color: `${theme.text}BB` }}>
                        {isInvestment
                          ? `Learn more about investing in ${ipTitle}`
                          : `Get started with the ${ipTitle} SDK`}
                      </p>
                    </div>

                    {/* IP Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 w-full justify-center"
                      style={{
                        backgroundColor: `${theme.primary}15`,
                        border: `1px solid ${theme.primary}30`,
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: theme.primary }}
                      >
                        {ipTitle}
                      </span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: `${theme.text}DD` }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
                          style={{
                            backgroundColor: `${theme.primary}10`,
                            border: `1px solid ${theme.primary}30`,
                            color: theme.text,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = theme.primary;
                            e.target.style.boxShadow = `0 0 20px ${theme.glowColor}30`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = `${theme.primary}30`;
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: `${theme.text}DD` }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
                          style={{
                            backgroundColor: `${theme.primary}10`,
                            border: `1px solid ${theme.primary}30`,
                            color: theme.text,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = theme.primary;
                            e.target.style.boxShadow = `0 0 20px ${theme.glowColor}30`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = `${theme.primary}30`;
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: theme.gradient,
                          color: "#FFFFFF",
                          boxShadow: `0 10px 30px ${theme.glowColor}30`,
                        }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Submitting...
                          </span>
                        ) : isInvestment ? (
                          "Send Me the Details"
                        ) : (
                          "Request Access"
                        )}
                      </button>
                    </form>

                    {/* Privacy note */}
                    <p
                      className="text-xs text-center mt-4"
                      style={{ color: `${theme.text}66` }}
                    >
                      We respect your privacy. No spam, ever.
                    </p>
                  </>
                )}
              </div>

              {/* Bottom gradient accent */}
              <div
                className="h-1 w-full"
                style={{ background: theme.gradient }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default InterestModal;
