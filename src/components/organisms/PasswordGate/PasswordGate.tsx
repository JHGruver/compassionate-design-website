"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms/Button";

// Password can be set via environment variable or defaults to a placeholder
const INVESTOR_PASSWORD = process.env.NEXT_PUBLIC_INVESTOR_PASSWORD || "investor2026";

interface PasswordGateProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PasswordGate({
  children,
  title = "Investor Access",
  description = "Please enter the password to view this content.",
}: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (password === INVESTOR_PASSWORD) {
        setIsAuthenticated(true);
        // Store in session so they don't need to re-enter
        sessionStorage.setItem("investor-authenticated", "true");
      } else {
        setError("Incorrect password. Please try again.");
      }
      setIsLoading(false);
    }, 500);
  };

  // Check session on mount
  useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("investor-authenticated");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
    }
  });

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent-magenta/20 to-accent-violet/20 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass rounded-2xl p-8 md:p-12">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-magenta to-accent-violet flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2">
            {title}
          </h1>
          <p className="text-foreground-muted text-center mb-8">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-6 py-4 rounded-lg bg-background border border-glass-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent-magenta transition-colors"
                autoFocus
              />
              {error && (
                <motion.p
                  className="text-red-400 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading || !password}
            >
              {isLoading ? "Verifying..." : "Access Content"}
            </Button>
          </form>

          <p className="text-xs text-foreground-muted text-center mt-6">
            Contact us at{" "}
            <a
              href="mailto:investors@compassionate-design.com"
              className="text-accent-cyan hover:underline"
            >
              investors@compassionate-design.com
            </a>{" "}
            to request access.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default PasswordGate;
