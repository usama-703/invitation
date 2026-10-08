"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { BotanicalCorner } from "./Decorations";
import { BotanicalDecoration, GlassCard, OrnamentalDivider, PaperSection, ScriptHeading, ScrollReveal } from "./InvitationDesign";

export default function WelcomeMessage() {
  return (
    <PaperSection variant="ivory" className="px-7 py-14 sm:py-16">
      <ScrollReveal className="relative mx-auto max-w-sm">
        <GlassCard className="flex flex-col items-center rounded-xl px-7 py-9 text-center sm:px-9">
        <BotanicalDecoration className="-left-2 -top-2" />
        <BotanicalDecoration className="-bottom-3 -right-2 rotate-180" />
        <BotanicalCorner />
        <BotanicalCorner position="bottom-right" />
        <p className="mb-2 font-body text-[10px] uppercase tracking-[0.3em] text-gold-500">
          A day to cherish
        </p>
        <ScriptHeading className="text-4xl sm:text-5xl">With joyful hearts</ScriptHeading>
        <motion.div
          initial={{ opacity: 0.8, scaleX: 0.82, y: 4 }}
          whileInView={{ opacity: 1, scaleX: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <OrnamentalDivider className="mb-6 mt-4" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0.82, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-[19px] leading-[1.75] text-wine-600/90 sm:text-xl"
        >
          {invitationConfig.welcome.message}
        </motion.p>
        <motion.div
          initial={{ opacity: 0.8, scaleX: 0.82, y: 4 }}
          whileInView={{ opacity: 1, scaleX: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <OrnamentalDivider className="mt-7" />
        </motion.div>
        </GlassCard>
      </ScrollReveal>
    </PaperSection>
  );
}
