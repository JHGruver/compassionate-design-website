"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<"button">>,
    HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  glowEffect?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      glowEffect = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Primary button with animated gradient
    if (variant === "primary") {
      return (
        <motion.button
          ref={ref}
          className={cn(
            styles.primaryButton,
            sizeStyles[size],
            "relative inline-flex items-center justify-center rounded-xl font-semibold",
            "focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:ring-offset-2 focus:ring-offset-background",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
            glowEffect && styles.glowPulse,
            className
          )}
          disabled={disabled || isLoading}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          {...props}
        >
          {/* Animated gradient background */}
          <span className={styles.gradientBg} />

          {/* Shine effect on hover */}
          <span className={styles.shineEffect} />

          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              <>{children}</>
            )}
          </span>
        </motion.button>
      );
    }

    // Secondary, ghost, outline variants
    const variantStyles: Record<Exclude<ButtonVariant, "primary">, string> = {
      secondary:
        "bg-background-tertiary/80 text-foreground border-2 border-white/10 hover:border-accent-cyan/50 hover:text-accent-cyan hover:bg-background-tertiary backdrop-blur-sm",
      ghost:
        "bg-transparent text-foreground hover:text-accent-cyan hover:bg-white/5 border-2 border-transparent",
      outline:
        "bg-transparent border-2 border-accent-cyan/60 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl font-medium",
          "transition-all duration-300 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:ring-offset-2 focus:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
