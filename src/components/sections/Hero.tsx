"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import TextReveal, { WordReveal } from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";

// Dynamically import Three.js component to avoid SSR issues
const NetworkVisualization = dynamic(
  () => import("@/components/3d/NetworkVisualization"),
  { ssr: false }
);

const floatingBadges = [
  { name: "GitHub", icon: "🔗", position: "top-1/4 left-[10%]", delay: 0.8 },
  { name: "Slack", icon: "💬", position: "top-1/3 right-[12%]", delay: 1 },
  { name: "Jira", icon: "📋", position: "bottom-1/3 left-[8%]", delay: 1.2 },
  { name: "Linear", icon: "⚡", position: "bottom-1/4 right-[10%]", delay: 1.4 },
];

const companyLogos = [
  "Acme Corp",
  "TechStart",
  "DevFlow",
  "CodeLabs",
  "BuildFast",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / width;
      const y = (e.clientY - top - height / 2) / height;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <NetworkVisualization />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0b]/50 to-[#0a0a0b] z-[1]" />
      <div className="absolute inset-0 mesh-gradient opacity-50 z-[1]" />

      {/* Cursor Glow Effect */}
      <motion.div
        className="cursor-glow hidden md:block"
        animate={{
          x: `calc(50vw + ${mousePosition.x * 200}px)`,
          y: `calc(50vh + ${mousePosition.y * 200}px)`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      {/* Floating Badges */}
      {floatingBadges.map((badge, index) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: badge.delay, duration: 0.5 }}
          className={`absolute ${badge.position} z-10 hidden lg:block`}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="glass-card px-4 py-2 flex items-center gap-2"
          >
            <span className="text-lg">{badge.icon}</span>
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              {badge.name}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="hero-content max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
        {/* Badge */}
        <TextReveal delay={0.2}>
          <div className="badge mb-8 inline-flex">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            Now in private beta
          </div>
        </TextReveal>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
          <WordReveal text="Your team never" delay={0.4} />
          <br />
          <span className="gradient-text">
            <WordReveal text="forgets." delay={0.8} />
          </span>
        </h1>

        {/* Subheadline */}
        <TextReveal delay={1.2}>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed">
            Supymem is the AI layer that connects your code, conversations, and
            decisions — so your team stays aligned without endless meetings.
          </p>
        </TextReveal>

        {/* CTA Buttons */}
        <TextReveal delay={1.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-button flex items-center gap-2 text-base px-8 py-4"
              >
                Request Early Access
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </MagneticButton>

            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ghost-button flex items-center gap-2 text-base px-8 py-4"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </MagneticButton>
          </div>
        </TextReveal>

        {/* Social Proof */}
        <TextReveal delay={1.8}>
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm text-[var(--text-secondary)]">
              Trusted by engineers at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {companyLogos.map((logo) => (
                <div
                  key={logo}
                  className="text-[var(--text-secondary)] font-semibold text-lg tracking-tight"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </TextReveal>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[var(--text-secondary)]">Scroll</span>
          <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

