"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart, Sparkle } from "lucide-react";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

const heroGlints = [
  { left: "12%", top: "22%", delay: 0.2 },
  { left: "84%", top: "19%", delay: 1.3 },
  { left: "18%", top: "68%", delay: 1.8 },
  { left: "88%", top: "72%", delay: 0.8 },
  { left: "73%", top: "37%", delay: 2.2 }
];

const HERO_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Cdefs%3E%3CradialGradient id='a' cx='50%25' cy='18%25' r='60%25'%3E%3Cstop stop-color='%2346323f'/%3E%3Cstop offset='1' stop-color='%2317111e' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='15%25' cy='82%25' r='60%25'%3E%3Cstop stop-color='%234a3441'/%3E%3Cstop offset='1' stop-color='%2317111e' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='g' x2='1' y2='1'%3E%3Cstop stop-color='%2317111e'/%3E%3Cstop offset='.42' stop-color='%23261522'/%3E%3Cstop offset='1' stop-color='%23702b43'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23g)' d='M0 0h1280v720H0z'/%3E%3Cpath fill='url(%23a)' d='M0 0h1280v720H0z'/%3E%3Cpath fill='url(%23b)' d='M0 0h1280v720H0z'/%3E%3C/svg%3E";

export default function HeroInvitation({
  revealed,
  videoStarted
}: {
  revealed: boolean;
  videoStarted: boolean;
}) {
  const { couple, hero } = invitationConfig;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!videoStarted || !video) return;

    void video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "NotAllowedError") return;
      console.error("Unable to play the hero background video.", error);
    });
  }, [videoStarted]);

  const item = (delay: number, duration = 1.7) => ({
    initial: { opacity: 0, y: 16 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration, delay: revealed ? delay : 0, ease: [0.22, 1, 0.36, 1] as const }
  });

  return (
    <section
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-wine-700"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 18%, rgba(201,169,106,.25), transparent 44%), radial-gradient(ellipse at 15% 82%, rgba(194,156,174,.22), transparent 46%), linear-gradient(155deg, #17111e 0%, #261522 42%, #702b43 100%)"
          }}
        />

        {hero.backgroundImage && (
          <Image src={hero.backgroundImage} alt="" fill priority className="object-cover" sizes="100vw" />
        )}

        {hero.backgroundVideo && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${videoPlaying ? "opacity-100" : "opacity-0"}`}
            muted
            loop
            playsInline
            preload="none"
            poster={hero.backgroundImage || HERO_POSTER}
            aria-hidden="true"
            onPlaying={() => setVideoPlaying(true)}
          >
            <source src={hero.backgroundVideo} />
          </video>
        )}

        <svg className="absolute inset-x-0 bottom-0 h-2/3 w-full opacity-35" viewBox="0 0 400 260" preserveAspectRatio="none" aria-hidden="true">
          {[0, 1, 2, 3].map((index) => (
            <path
              key={index}
              d={`M${index * 100} 260V${120 - index * 4}c0-30 20-40 50-40s50 10 50 40V260`}
              fill="none"
              stroke="#E4CE9A"
              strokeOpacity=".34"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,28,.42),rgba(36,24,47,.18)_42%,rgba(20,14,28,.64))]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 34%, rgba(194,156,174,.15), transparent 43%), radial-gradient(ellipse at center, transparent 36%, rgba(18,12,24,.55) 100%)"
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {heroGlints.map((glint, index) => (
          <motion.span
            key={index}
            className="absolute text-gold-300/80"
            style={{ left: glint.left, top: glint.top }}
            animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.7, 1.1, 0.7], y: [0, -5, 0] }}
            transition={{ duration: 3.8, delay: glint.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkle size={index % 2 ? 8 : 11} strokeWidth={1} />
          </motion.span>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 pb-5 text-center text-ivory"
      >
        <motion.div {...item(0)} className="relative" aria-hidden="true">
          <Heart className="h-5 w-5 fill-[#B9A2CF] text-[#B9A2CF]" strokeWidth={1} />
          <Sparkle className="absolute -right-2 -top-1 h-2.5 w-2.5 text-[#E6D9E7]" strokeWidth={1} />
        </motion.div>

        <motion.p {...item(0.18)} className="mt-5 font-body text-base italic leading-relaxed text-ivory/90 sm:text-lg">
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          {...item(0.48, 1.95)}
          className="mt-5 font-script text-[4.1rem] leading-[0.9] text-[#E6D5AE] drop-shadow-[0_4px_22px_rgba(0,0,0,0.62)] sm:text-7xl"
        >
          {couple.groom.name}
        </motion.h1>

        <motion.p {...item(1.12)} className="mt-3 font-display text-lg text-ivory sm:text-xl">
          {couple.groom.details[0]}
        </motion.p>

        <motion.p {...item(1.48)} className="mt-5 font-body text-lg italic text-ivory/90 sm:text-xl">
          with the daughter of
        </motion.p>

        <motion.p {...item(1.82)} className="mt-1 font-display text-xl text-[#E6D5AE] sm:text-2xl">
          {couple.bride.details[0].replace("Daughter of ", "")}
        </motion.p>

        <motion.div {...item(2.1)} className="mt-5">
          <svg viewBox="0 0 200 24" className="h-5 w-36" fill="none" aria-hidden="true">
            <path d="M2 12c20 0 20-8 40-8s20 8 40 8 20-8 40-8 20 8 40 8 18-8 36-8" stroke="#E4CE9A" strokeWidth="1" strokeLinecap="round" opacity=".75" />
            <circle cx="100" cy="12" r="2.5" fill="#E4CE9A" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-7 z-10 flex flex-col items-center gap-1.5 text-ivory/75"
        initial={{ opacity: 0, y: 8 }}
        animate={revealed ? { opacity: 1, y: [0, 5, 0] } : { opacity: 0, y: 8 }}
        transition={{ opacity: { delay: revealed ? 2.3 : 0, duration: 0.6 }, y: { delay: 2.3, duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{hero.scrollLabel}</span>
        <ChevronDown className="h-4 w-4" strokeWidth={1.25} />
      </motion.div>
    </section>
  );
}