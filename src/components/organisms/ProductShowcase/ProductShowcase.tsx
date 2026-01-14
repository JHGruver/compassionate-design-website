"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/molecules/ProductCard";
import { products } from "@/data/products";
import { AnimatedContainer } from "@/components/atoms/AnimatedContainer";

export function ProductShowcase() {
  return (
    <section
      id="products"
      className="relative py-32 px-6 bg-background-secondary overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-magenta/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <AnimatedContainer animation="fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full glass text-accent-cyan text-sm font-medium mb-6">
              Our Creations
            </span>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.1}>
            <h2 className="display-lg mb-6">
              <span className="text-foreground">Products Built with</span>
              <br />
              <span className="gradient-text">Obsessive Craft</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Each project represents hundreds of hours of meticulous attention
              to detail. We don&apos;t ship until it feels magical.
            </p>
          </AnimatedContainer>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-foreground-muted mb-4">
            Want to see what we&apos;re working on next?
          </p>
          <button className="px-8 py-4 rounded-lg border-2 border-accent-cyan text-accent-cyan font-semibold hover:bg-accent-cyan hover:text-background transition-all duration-300">
            Join the Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductShowcase;
