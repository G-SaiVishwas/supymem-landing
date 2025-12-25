"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Integrations from "@/components/sections/Integrations";
import Stats from "@/components/sections/Stats";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-purple-500 to-pink-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed w-[600px] h-[600px] rounded-full hidden md:block z-0"
      animate={{
        x: mousePosition.x - 300,
        y: mousePosition.y - 300,
        opacity: isVisible ? 0.15 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 30,
        mass: 0.5,
      }}
      style={{
        background:
          "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
      }}
    />
  );
}

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      onAnimationComplete={() => setIsLoading(false)}
      className="fixed inset-0 z-[100] bg-[var(--background)] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Logo */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(99, 102, 241, 0.4)",
              "0 0 60px rgba(99, 102, 241, 0.6)",
              "0 0 20px rgba(99, 102, 241, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] via-purple-500 to-pink-500 flex items-center justify-center"
        >
          <span className="text-white font-bold text-2xl">S</span>
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-[var(--surface)] rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-r from-[var(--accent)] via-purple-500 to-pink-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CursorGlow />

      <main ref={mainRef} className="relative overflow-hidden">
        <Navigation />

        {/* Page Sections */}
        <Hero />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Problem />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Solution />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Integrations />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Stats />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Pricing />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CTA />
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
