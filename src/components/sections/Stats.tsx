"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/animations/CountUp";

const stats = [
  {
    value: 1.2,
    prefix: "$",
    suffix: "T",
    label: "lost to miscommunication annually",
    description: "Harvard Business Review, 2023",
  },
  {
    value: 23,
    suffix: " min",
    label: "to refocus after each interruption",
    description: "University of California Study",
  },
  {
    value: 86,
    suffix: "%",
    label: "of failures from poor communication",
    description: "Project Management Institute",
  },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/5 rounded-full blur-3xl" />
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
            The cost of{" "}
            <span className="gradient-text">context switching</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Engineering teams lose countless hours every week to preventable
            communication gaps.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="glass-card p-8 text-center hover-lift h-full">
                {/* Number */}
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">
                  <CountUp
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                </div>

                {/* Label */}
                <p className="text-lg text-[var(--text-primary)] font-medium mb-3">
                  {stat.label}
                </p>

                {/* Source */}
                <p className="text-sm text-[var(--text-secondary)]">
                  {stat.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 flex justify-center">
                  <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

