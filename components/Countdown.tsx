"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import Reveal from "./Reveal";
import { GlassCard, OrnamentalDivider, PaperSection, ScriptHeading } from "./InvitationDesign";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetISO: string): TimeLeft {
  // Date.parse handles the explicit UTC offset in the ISO string correctly,
  // so every guest sees a countdown to the *same* real moment regardless
  // of their own device timezone.
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" }
];

export default function Countdown() {
  const { countdown } = invitationConfig;
  // Start at 0 so server and first client render match, then correct on mount to avoid hydration warnings.
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(countdown.weddingDateTimeISO));
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(countdown.weddingDateTimeISO));
    }, 1000);
    return () => clearInterval(id);
  }, [countdown.weddingDateTimeISO]);

  return (
    <PaperSection variant="lavender" className="px-6 py-14 sm:py-16">
      <Reveal className="mx-auto flex max-w-sm flex-col items-center text-center">
        <p className="mb-1 font-body text-[10px] uppercase tracking-[0.3em] text-gold-500">Until we celebrate</p>
        <ScriptHeading>{countdown.heading}</ScriptHeading>
        <motion.div
          initial={{ opacity: 0.8, scaleX: 0.82 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <OrnamentalDivider className="mb-7 mt-4" />
        </motion.div>

        <div className="grid w-full grid-cols-4 gap-2.5 sm:gap-3">
          {UNITS.map(({ key, label }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.28 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative flex flex-col items-center justify-center rounded-lg py-4 shadow-[0_9px_20px_-15px_rgba(36,24,47,0.5)]"
            >
              <span className="mb-2 h-1 w-1 rounded-full bg-gold-500/70" aria-hidden="true" />
              <span className="relative block h-8 w-full font-display text-2xl text-wine-600 tabular-nums sm:text-3xl">
                <motion.span
                  key={mounted ? timeLeft[key] : "pending"}
                  className="absolute inset-0"
                  initial={{ opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {mounted ? String(timeLeft[key]).padStart(2, "0") : "--"}
                </motion.span>
              </span>
              <span className="mt-1 font-body text-[10px] uppercase tracking-[0.14em] text-wine-500/70">{label}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </PaperSection>
  );
}
