"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GitBranch,
  MessageSquare,
  LayoutDashboard,
  FileText,
  Zap,
  Code2,
  FileSpreadsheet,
} from "lucide-react";

const integrations = [
  { name: "GitHub", icon: GitBranch, color: "#6e5494" },
  { name: "Slack", icon: MessageSquare, color: "#4A154B" },
  { name: "Jira", icon: LayoutDashboard, color: "#0052CC" },
  { name: "Notion", icon: FileText, color: "#ffffff" },
  { name: "Linear", icon: Zap, color: "#5E6AD2" },
  { name: "VS Code", icon: Code2, color: "#007ACC" },
  { name: "Google Docs", icon: FileSpreadsheet, color: "#4285F4" },
];

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Works where you work
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Connect in 2 minutes. No code changes required.
          </p>
        </motion.div>

        {/* Integration Diagram */}
        <div className="relative flex items-center justify-center min-h-[400px] mb-20">
          {/* Center Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--accent)] via-purple-500 to-pink-500 flex items-center justify-center pulse-glow">
              <span className="text-white font-bold text-3xl">S</span>
            </div>
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[var(--accent)]/30 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute -inset-4 rounded-3xl border border-[var(--accent)]/20 animate-ping" style={{ animationDuration: "3s" }} />
          </motion.div>

          {/* Orbiting integrations */}
          {integrations.slice(0, 6).map((integration, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            const radius = 150;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={integration.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px - 28px)`,
                  top: `calc(50% + ${y}px - 28px)`,
                }}
              >
                {/* Connection line */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    width: Math.abs(x) + 30,
                    height: Math.abs(y) + 30,
                    left: x > 0 ? -Math.abs(x) : 28,
                    top: y > 0 ? -Math.abs(y) : 28,
                  }}
                >
                  <motion.line
                    x1={x > 0 ? "100%" : "0"}
                    y1={y > 0 ? "100%" : "0"}
                    x2={x > 0 ? "0" : "100%"}
                    y2={y > 0 ? "0" : "100%"}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(99, 102, 241, 0.5)" />
                      <stop offset="100%" stopColor="rgba(139, 92, 246, 0.5)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-14 h-14 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center cursor-pointer hover:border-[var(--accent)] transition-colors group"
                >
                  <integration.icon
                    className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors"
                  />
                </motion.div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[var(--text-secondary)] whitespace-nowrap">
                  {integration.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Integration logos row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <integration.icon className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="text-sm text-[var(--text-secondary)]">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

