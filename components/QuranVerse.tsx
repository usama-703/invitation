"use client";

import { motion } from "framer-motion";
import { BotanicalCorner } from "./Decorations";
import { GlassCard, OrnamentalDivider, PaperSection } from "./InvitationDesign";

export default function QuranVerse() {
  return (
    <PaperSection variant="ivory" className="px-6 py-8 sm:px-7 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-sm"
      >
        <GlassCard className="quran-glass-card relative overflow-hidden rounded-2xl border border-[#C9A96A]/45 px-6 py-9 text-center sm:px-9 sm:py-11">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,253,247,0.76),transparent_52%),radial-gradient(ellipse_at_85%_15%,rgba(185,162,207,0.34),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-[7px] rounded-[calc(1rem-2px)] border border-[#C9A96A]/30" />
          <BotanicalCorner className="h-12 w-12 opacity-55 sm:h-14 sm:w-14" />
          <BotanicalCorner position="bottom-right" className="h-12 w-12 opacity-55 sm:h-14 sm:w-14" />

          <p
            lang="ar"
            dir="rtl"
            className="relative font-display text-[2rem] leading-[1.8] text-plum sm:text-[2.35rem]"
          >
            وَخَلَقْنَاكُمْ أَزْوَاجًا
          </p>
          <OrnamentalDivider className="my-4" />
          <p className="font-display text-lg italic leading-relaxed text-wine-700 sm:text-xl">
            And We created you in pairs.
          </p>
          <p className="mt-3 font-body text-[10px] uppercase tracking-[0.24em] text-gold-500">
            Qur&apos;an 78:8
          </p>
        </GlassCard>
      </motion.div>
    </PaperSection>
  );
}
