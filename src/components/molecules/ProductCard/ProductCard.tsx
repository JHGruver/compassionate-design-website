"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const statusColors: Record<string, string> = {
  available: "bg-accent-green",
  beta: "bg-accent-cyan",
  alpha: "bg-accent-violet",
  concept: "bg-accent-gold",
  "seeking-investment": "bg-accent-magenta",
  "coming-soon": "bg-accent-gold",
  "in-development": "bg-accent-violet",
};

const statusLabels: Record<string, string> = {
  available: "Available Now",
  beta: "Beta",
  alpha: "Alpha",
  concept: "Concept",
  "seeking-investment": "Seeking Investment",
  "coming-soon": "Coming Soon",
  "in-development": "In Development",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-background-secondary border border-glass-border",
          "transition-all duration-500 ease-out",
          "hover:border-accent-cyan hover:shadow-[0_0_40px_rgba(0,245,255,0.15)]"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              isHovered && "scale-110"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent",
              "opacity-60 transition-opacity duration-500",
              isHovered && "opacity-80"
            )}
          />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                "text-xs font-semibold text-background",
                statusColors[product.status]
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {statusLabels[product.status]}
            </span>
          </div>

          {/* Hover CTA */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className={cn(
                "px-6 py-3 rounded-lg",
                "bg-accent-cyan text-background font-semibold",
                "transform transition-transform",
                "hover:scale-105"
              )}
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {product.status === "available" ? "Get It Now" : "Learn More"}
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold text-foreground group-hover:text-accent-cyan transition-colors">
              {product.title}
            </h3>
            <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <p className="text-foreground-muted text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom Glow Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default ProductCard;
