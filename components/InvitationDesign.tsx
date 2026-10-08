"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

export function PaperSection({
  children,
  className = "",
  variant = "ivory"
}: {
  children: ReactNode;
  className?: string;
  variant?: "ivory" | "lavender" | "warm" | "closing";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={`invitation-paper paper-${variant} ${className}`}
      initial={reduceMotion ? false : { opacity: 0.94, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function GlassCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`glass-card ${className}`}
      initial={reduceMotion ? false : { opacity: 0.95, y: 8, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScriptHeading({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={`font-script text-5xl text-plum sm:text-6xl ${className}`}>{children}</h2>;
}

export function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`ornamental-divider ${className}`} aria-hidden="true">
      <span />
      <Heart className="h-3 w-3 fill-gold/70 text-gold" strokeWidth={1} />
      <span />
    </div>
  );
}

export function BotanicalDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical-decoration pointer-events-none absolute h-24 w-24 text-gold/60 ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 92C25 67 37 40 88 9" stroke="currentColor" strokeWidth="1" />
      <path d="M27 65c-15 0-21-8-18-21 14 1 21 8 18 21Zm17-23C39 28 45 19 60 17c3 15-3 24-16 25Zm16-17c1-13 9-19 22-17 0 13-8 20-22 17ZM17 81C4 76 1 66 7 54c13 5 16 15 10 27Zm27-37c-3-13 3-21 16-23" stroke="currentColor" strokeWidth=".8" />
      <circle cx="8" cy="92" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function DecorativeFrame({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`decorative-frame ${className}`}>{children}</div>;
}

export function SparkleEffect({ className = "" }: { className?: string }) {
  return (
    <div className={`sparkle-effect pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {[12, 29, 71, 86].map((left, index) => (
        <motion.span
          key={left}
          className="absolute text-gold/70"
          style={{ left: `${left}%`, top: `${index % 2 === 0 ? 18 : 76}%` }}
          animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -8, 0] }}
          transition={{ duration: 5 + index, delay: index * 0.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={index % 2 ? 9 : 12} strokeWidth={1} />
        </motion.span>
      ))}
    </div>
  );
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <Reveal className={className} delay={delay}>{children}</Reveal>;
}
