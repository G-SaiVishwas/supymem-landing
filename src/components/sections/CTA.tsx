"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Loader2, Check } from "lucide-react";

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      />

      <div
        ref={containerRef}
        className="max-w-4xl mx-auto px-6 relative z-10 text-center"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Ready to give your team{" "}
          <span className="gradient-text">superpowers</span>?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[var(--text-secondary)] mb-12"
        >
          Join the waitlist for early access.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-8"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            required
            disabled={status === "loading" || status === "success"}
            className="input-field flex-grow"
          />
          <motion.button
            whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
            whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
            disabled={status === "loading" || status === "success"}
            className={`glow-button flex items-center gap-2 whitespace-nowrap min-w-[160px] justify-center ${
              status !== "idle" ? "cursor-not-allowed opacity-90" : ""
            }`}
          >
            {status === "idle" && (
              <>
                Get Access
                <ArrowRight className="w-4 h-4" />
              </>
            )}
            {status === "loading" && (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            )}
            {status === "success" && (
              <>
                <Check className="w-4 h-4" />
                You&apos;re in!
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-[var(--text-secondary)]"
        >
          {status === "success"
            ? "We'll reach out within 24 hours. Check your inbox!"
            : "We'll reach out within 24 hours."}
        </motion.p>
      </div>
    </section>
  );
}

