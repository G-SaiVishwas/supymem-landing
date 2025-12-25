"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bell, MessageSquare, Search, BarChart3 } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Breaking change alerts",
    description: "Get notified before your code breaks — not after",
    icon: Bell,
    size: "large",
    visual: "notification",
  },
  {
    id: 2,
    title: "Natural language tasks",
    description: '"Give Priya the dashboard after she finishes the API"',
    icon: MessageSquare,
    size: "small",
    visual: "waveform",
  },
  {
    id: 3,
    title: "Instant answers",
    description: '"Why did we deprecate v1?" → AI response with citations',
    icon: Search,
    size: "small",
    visual: "chat",
  },
  {
    id: 4,
    title: "Auto-tracked progress",
    description: "Your commits, PRs, and tasks — tracked automatically",
    icon: BarChart3,
    size: "full",
    visual: "dashboard",
  },
];

function NotificationVisual() {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-[#1a1a1d] rounded-xl p-4 border border-[var(--border)] max-w-sm"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm">Supymem</span>
            <span className="text-xs text-[var(--text-secondary)]">just now</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            ⚠️ <span className="text-orange-400">Breaking change detected</span> in{" "}
            <code className="text-xs bg-[var(--surface)] px-1.5 py-0.5 rounded">
              user-service
            </code>
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            PR #482 by @alex may affect your <code className="text-xs">AuthProvider.tsx</code>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function WaveformVisual() {
  return (
    <div className="flex items-center justify-center h-20 gap-1">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-[var(--accent)] to-purple-500 rounded-full"
          animate={{
            height: [8, 20 + Math.random() * 30, 8],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-end"
      >
        <div className="bg-[var(--accent)] rounded-xl rounded-br-sm px-4 py-2 max-w-[80%]">
          <p className="text-sm">Why did we deprecate v1?</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-start"
      >
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl rounded-bl-sm px-4 py-2 max-w-[90%]">
          <p className="text-sm text-[var(--text-secondary)]">
            Based on discussion in <span className="text-[var(--accent)]">#backend</span> on Oct 12, the team decided v1 had security vulnerabilities...
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-2 opacity-60">
            📎 3 sources found
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardVisual() {
  const bars = [65, 80, 45, 90, 70, 55, 85, 60, 75, 95, 50, 88];

  return (
    <div className="flex items-end justify-between h-32 gap-2 px-4">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t from-[var(--accent)] to-purple-500 rounded-t-sm"
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function Solution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Meet your team&apos;s new{" "}
            <span className="gradient-text">memory</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Supymem automatically captures, connects, and surfaces everything
            your team needs to know.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                glass-card p-6 hover-lift overflow-hidden group
                ${feature.size === "large" ? "lg:col-span-2" : ""}
                ${feature.size === "full" ? "lg:col-span-3" : ""}
              `}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>

              {/* Visual */}
              <div className="mb-4 min-h-[100px] flex items-center justify-center">
                {feature.visual === "notification" && <NotificationVisual />}
                {feature.visual === "waveform" && <WaveformVisual />}
                {feature.visual === "chat" && <ChatVisual />}
                {feature.visual === "dashboard" && <DashboardVisual />}
              </div>

              {/* Description */}
              <p className="text-[var(--text-secondary)]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

