"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, AlertTriangle, ClipboardList } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "Where did we decide this?",
    description:
      "You spend 30 minutes searching Slack for a conversation from 3 months ago. Nobody remembers.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: AlertTriangle,
    title: "Who changed this?",
    description:
      "Production breaks. Turns out someone merged a PR that affected your code. You had no idea.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: ClipboardList,
    title: "Jira is always outdated",
    description:
      "Your task board is a graveyard of stale tickets. Nobody updates it because nobody has time.",
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Sound familiar?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            These problems cost engineering teams thousands of hours every year.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="gradient-border-card hover-lift h-full group">
                <div className="gradient-border-card-inner flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.gradient} p-3 flex items-center justify-center`}
                    >
                      <problem.icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
                    {problem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                    {problem.description}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-6 pt-6 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-500 group-hover:w-16 transition-all duration-300" />
                      <div className="w-2 h-1 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

