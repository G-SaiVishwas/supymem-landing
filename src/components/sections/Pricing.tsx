"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";

const features = [
  "Unlimited GitHub repos",
  "Unlimited Slack channels",
  "AI-powered search & alerts",
  "Natural language task management",
  "Productivity dashboard",
  "Priority support",
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div ref={containerRef} className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Simple pricing that scales
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Start small, grow with your team. No hidden fees or surprises.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent)] via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20" />

          <div className="relative glass-card p-8 md:p-12 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 badge mb-8">
              <Sparkles className="w-4 h-4" />
              Early Access
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-6xl font-bold">₹10,000</span>
                <span className="text-xl text-[var(--text-secondary)]">/month base</span>
              </div>
              <div className="mt-2 text-lg text-[var(--text-secondary)]">
                + ₹1,000 per team member
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mb-8" />

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 mb-10 text-left">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[var(--success)]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[var(--success)]" />
                  </div>
                  <span className="text-[var(--text-primary)]">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <MagneticButton className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-button flex items-center gap-2 text-lg px-10 py-4 w-full md:w-auto justify-center"
              >
                Get Early Access
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </MagneticButton>

            {/* Trial note */}
            <p className="mt-6 text-sm text-[var(--text-secondary)]">
              Free 14-day trial. No credit card required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

