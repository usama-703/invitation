"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkle } from "lucide-react";
import { invitationConfig } from "@/config/invitation";
import { BotanicalPattern, Flourish, TinyHeart } from "./Decorations";

interface InvitationEnvelopeProps {
  opening: boolean;
  onOpen: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  opacity: number;
  duration: number;
  kind: "star" | "dust";
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 36 + Math.random() * 120;

    return {
      id: Date.now() + id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 3 + Math.random() * 7,
      rotate: Math.random() * 180 - 90,
      opacity: 0.35 + Math.random() * 0.4,
      duration: 1.8 + Math.random() * 1.4,
      kind: Math.random() > 0.5 ? "star" : "dust"
    };
  });
}

export default function InvitationEnvelope({ opening, onOpen }: InvitationEnvelopeProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!opening) return;
    const firstBurst = window.setTimeout(() => setParticles(createParticles(20)), 1100);
    const secondBurst = window.setTimeout(() => setParticles(createParticles(16)), 2300);
    const thirdBurst = window.setTimeout(() => setParticles(createParticles(12)), 3500);
    return () => {
      window.clearTimeout(firstBurst);
      window.clearTimeout(secondBurst);
      window.clearTimeout(thirdBurst);
    };
  }, [opening]);

  const handleOpen = () => {
    setParticles(createParticles(24));
    onOpen();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#fbf5e9_0%,#d9d0e8_58%,#8174a3_100%)] px-4 sm:px-5"
      initial={false}
      animate={opening ? { opacity: [1, 1, 0], scale: [1, 1, 1.025] } : { opacity: 1, scale: 1 }}
      transition={{ duration: 4.8, times: [0, 0.8, 1], ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: opening ? "none" : "auto" }}
    >
      <BotanicalPattern opacity={0.12} />

      <div className="relative z-10 flex w-full max-w-[430px] flex-col items-center text-center">
        <div className="relative w-full" style={{ perspective: "1400px" }}>
          <motion.div
            className="relative aspect-[1.42/1] w-full overflow-visible rounded-[26px] border border-gold-400/70 bg-[linear-gradient(135deg,rgba(255,253,247,0.28),rgba(112,98,145,0.46))] grain backdrop-blur-2xl"
            animate={opening ? { y: [0, -3, -16], scale: [1, 1.015, 1.05], rotateZ: [0, 0, -1] } : { y: 0, scale: 1, rotateZ: 0 }}
            transition={{ duration: 3.9, delay: opening ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 2px 0 rgba(201,169,106,.52) inset, 0 34px 65px -22px rgba(38,21,34,.62), 0 9px 24px -8px rgba(67,54,96,.44), 0 0 38px rgba(129,116,163,.34)"
            }}
          >
            <div className="absolute inset-2 overflow-hidden rounded-[22px] bg-[linear-gradient(140deg,rgba(255,253,247,0.34),rgba(194,181,216,0.58),rgba(112,98,145,0.66))]">
              <div className="absolute -left-10 top-4 h-20 w-20 rounded-full bg-[#FBF5E9]/60 blur-2xl" />
              <div className="absolute -right-8 bottom-1 h-24 w-24 rounded-full bg-[#C9A96A]/25 blur-2xl" />
              <BotanicalPattern opacity={0.18} />
            </div>

            <svg className="absolute inset-0 z-[5] h-full w-full overflow-hidden" viewBox="0 0 360 240" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 2 180 118 358 2" fill="none" stroke="#702B43" strokeOpacity=".34" strokeWidth="1" />
              <path d="M2 238 180 118 358 238" fill="none" stroke="#FBF5E9" strokeOpacity=".82" strokeWidth="1" />
            </svg>

            <motion.div
              className="absolute left-0 right-0 top-[8%] z-[7] mx-auto flex aspect-[0.72/1] w-[58%] max-w-[210px] flex-col items-center justify-center overflow-hidden rounded-[10px] border border-gold-400/70 bg-[linear-gradient(145deg,#fffdf7_0%,#fbf5e9_55%,#e6d9e7_100%)] px-3 text-center shadow-[0_10px_30px_rgba(38,21,34,0.34),inset_0_1px_0_rgba(255,253,247,0.95)]"
              initial={{ y: "62%", opacity: 0, rotate: 0 }}
              animate={opening
                ? { y: ["62%", "8%", "-18%"], opacity: [0, 1, 0], rotate: [0, -2, 1] }
                : { y: "62%", opacity: 0, rotate: 0 }}
              transition={opening
                ? { duration: 2.8, delay: 1, times: [0, 0.45, 1], ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.3 }}
            >
              <span className="font-body text-[8px] uppercase tracking-[0.24em] text-gold-500 sm:text-[9px]">Wedding Invitation</span>
              <span className="mt-3 font-script text-xl leading-tight text-wine-700 sm:text-2xl">{invitationConfig.couple.groom.name}</span>
              <span className="my-1 font-script text-sm text-gold-500">&amp;</span>
              <span className="font-display text-[10px] tracking-[0.08em] text-wine-600 sm:text-xs">
                {invitationConfig.couple.bride.details[0].replace("Daughter of ", "")}
              </span>
              <span className="my-3 h-px w-10 bg-gold-400/70" />
              <span className="font-display text-[9px] tracking-[0.06em] text-wine-600 sm:text-[10px]">
                {invitationConfig.scratchReveal.hiddenSubMessage}
              </span>
              <Heart className="mt-3 h-3 w-3 fill-gold-400/60 text-gold-500" strokeWidth={1} />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 z-[7] overflow-hidden rounded-[5px]" aria-hidden="true">
              <Flourish className="absolute left-3 top-3 h-3 w-20 -rotate-45 opacity-50" />
              <Flourish className="absolute right-3 top-3 h-3 w-20 rotate-45 opacity-50" />
            </div>

            <div
              className="absolute inset-0 z-[8] rounded-[5px] bg-gradient-to-br from-[#d0c4e0] via-[#9788b2] to-[#6d5c8d] shadow-[0_-2px_0_rgba(255,253,247,.42)_inset]"
              style={{ clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)" }}
            >
              <BotanicalPattern opacity={0.16} />
            </div>

            <motion.div
              className="absolute left-0 top-0 z-20 h-[54%] w-full origin-top"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                filter: "drop-shadow(0 5px 5px rgba(61,15,22,.12))"
              }}
              animate={opening ? { rotateX: -176 } : { rotateX: 0 }}
              transition={{ duration: 1.6, delay: opening ? 0.7 : 0, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="relative h-full w-full bg-gradient-to-b from-[#ded5ea] to-[#8a7ba9] shadow-[0_1px_0_rgba(255,253,247,.5)_inset]">
                <BotanicalPattern opacity={0.2} />
              </div>
            </motion.div>

            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <motion.button
                type="button"
                onClick={handleOpen}
                disabled={opening}
                aria-label="Open your wedding invitation"
                className="relative flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full text-[9px] font-medium uppercase tracking-[0.12em] text-ivory sm:h-[86px] sm:w-[86px]"
                style={{
                  background: "radial-gradient(circle at 34% 28%, #E6D5AE, #C9A96A 57%, #80673E 100%)",
                  boxShadow: "0 12px 26px -8px rgba(36,24,47,.55), 0 0 0 3px rgba(250,247,242,.76) inset, 0 0 0 6px rgba(201,169,106,.3)"
                }}
                animate={opening
                  ? { scale: [1, 0.9, 1.08, 0.3], opacity: [1, 1, 1, 0], boxShadow: ["0 0 0 0 rgba(228,206,154,0)", "0 0 28px 10px rgba(228,206,154,.62)", "0 0 0 0 rgba(228,206,154,0)"] }
                  : { scale: [1, 1.035, 1] }}
                transition={opening
                  ? { duration: 1.25, times: [0, 0.22, 0.52, 1], ease: "easeOut" }
                  : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.88 }}
              >
                <Heart className="mb-1 h-4 w-4 fill-ivory/90" strokeWidth={1.4} />
                <span>Tap to open</span>
              </motion.button>
            </div>

            <div className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
              {particles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="absolute left-1/2 top-1/2"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.35, rotate: 0 }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    opacity: [0, particle.opacity, 0],
                    scale: [0.35, 1, 0.2],
                    rotate: particle.rotate
                  }}
                  transition={{ duration: particle.duration, ease: "easeOut" }}
                >
                  {particle.kind === "star" ? (
                    <Sparkle size={particle.size} className="fill-gold-300 text-gold-300 drop-shadow-[0_0_5px_rgba(255,250,242,.9)]" />
                  ) : (
                    <span
                      className="block rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,245,214,.9)]"
                      style={{ width: particle.size / 2, height: particle.size / 2 }}
                    />
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex flex-col items-center"
          animate={opening ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: opening ? 0.3 : 0 }}
        >
          <Flourish className="mb-3 h-4 w-40" />
          <h1 className="font-display text-sm tracking-[0.25em] text-wine-600">YOU ARE INVITED</h1>
          <TinyHeart className="mt-3" />
        </motion.div>
      </div>
    </motion.div>
  );
}