"use client";

import { invitationConfig } from "@/config/invitation";
import { motion } from "framer-motion";
import { BotanicalCorner, TinyHeart, WavyBotanicalRule } from "./Decorations";
import Reveal from "./Reveal";
import { BotanicalDecoration, GlassCard, PaperSection, SparkleEffect } from "./InvitationDesign";

export default function ClosingSection() {
  const { closing } = invitationConfig;

  return (
    <PaperSection variant="closing" className="px-6 py-14 sm:py-16">
      <Reveal className="mx-auto max-w-[420px]">
      <GlassCard className="relative flex flex-col items-center rounded-xl px-6 py-9 text-center sm:px-8">
        <SparkleEffect className="z-0" />
        <BotanicalDecoration className="-left-2 -top-2" />
        <BotanicalDecoration className="-bottom-2 -right-2 rotate-180" />
        <BotanicalCorner />
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />
        <BotanicalCorner position="bottom-right" />
        <p className="mb-1 font-body text-[10px] uppercase tracking-[0.3em] text-gold-500">With heartfelt thanks</p>
        <motion.div
          initial={{ opacity: 0.78, scaleX: 0.82 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full"
        >
          <WavyBotanicalRule className="max-w-[220px] opacity-80" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-4"
        >
          <TinyHeart color="#B08D45" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0.82, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 whitespace-pre-line font-script text-[2.4rem] leading-[1.05] text-wine-700 sm:text-[2.8rem]"
        >
          {closing.message}
        </motion.p>
        <motion.p
          initial={{ opacity: 0.82, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[34ch] font-body text-sm italic leading-relaxed tracking-[0.04em] text-wine-600/85 sm:text-base"
        >
          {closing.signature}
        </motion.p>
        <motion.div
          initial={{ opacity: 0.78, scaleX: 0.82 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.92 }}
          className="mt-6 w-full"
        >
          <WavyBotanicalRule className="max-w-[220px] opacity-80" />
        </motion.div>
      </GlassCard>
      </Reveal>
    </PaperSection>
  );
}
