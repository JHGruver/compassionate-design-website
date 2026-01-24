"use client";

import { motion } from "framer-motion";
import { OngoingService } from "@/data/services";

interface OngoingServicesProps {
  services: OngoingService[];
  onCtaClick: () => void;
}

export function OngoingServices({ services, onCtaClick }: OngoingServicesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => {
        const isBundle = service.id === "bundle";

        return (
          <motion.div
            key={service.id}
            className="relative rounded-2xl p-6 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              background: isBundle
                ? "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)"
                : "rgba(255, 255, 255, 0.02)",
              border: isBundle
                ? "1px solid rgba(0, 212, 255, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Best Value Badge for bundle */}
            {isBundle && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)",
                  color: "#0A0A0F",
                }}
              >
                Best Value
              </div>
            )}

            {/* Service Name */}
            <h4
              className="text-lg font-bold mb-1"
              style={{ color: isBundle ? "#00D4FF" : "#F5F5F5" }}
            >
              {service.name}
            </h4>

            {/* Price */}
            <div className="mb-4">
              <span
                className="text-3xl font-bold"
                style={{ color: isBundle ? "#00D4FF" : "#F59E0B" }}
              >
                {service.price}
              </span>
              <span className="text-sm text-foreground-muted ml-1">
                /{service.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground-muted mb-4 flex-grow">
              {service.description}
            </p>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: isBundle ? "#00D4FF" : "#F59E0B" }}
                  />
                  <span className="text-foreground-muted">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={onCtaClick}
              className="w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: isBundle
                  ? "linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)"
                  : "transparent",
                color: isBundle ? "#0A0A0F" : "#F59E0B",
                border: isBundle ? "none" : "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              Get Started
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

export default OngoingServices;
