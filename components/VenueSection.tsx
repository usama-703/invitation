"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { invitationConfig } from "@/config/invitation";
import { ArchLineArt, BotanicalCorner } from "./Decorations";
import Reveal from "./Reveal";
import { GlassCard, OrnamentalDivider, PaperSection } from "./InvitationDesign";

export default function VenueSection() {
  const { venue, countdown } = invitationConfig;
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata"
  }).format(new Date(countdown.weddingDateTimeISO));

  return (
    <PaperSection variant="warm" className="px-6 py-12 sm:py-14">
      <Reveal className="mx-auto max-w-sm">
      <GlassCard className="relative flex flex-col items-center rounded-xl px-6 py-7 text-center">
        <BotanicalCorner />
        <BotanicalCorner position="bottom-right" />
        <motion.div
          initial={{ opacity: 0.82, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MapPin className="mb-4 h-5 w-5 text-wine-500" strokeWidth={1.25} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.82, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <h2 className="font-script text-5xl text-wine-600 sm:text-6xl">{venue.heading}</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.82, scaleX: 0.85 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.24 }}
        >
          <OrnamentalDivider className="mb-8 mt-5" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0.82, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="font-display text-2xl text-wine-700 sm:text-3xl"
        >
          {venue.name}
        </motion.p>
        <p className="mt-3 font-body text-xs uppercase tracking-[0.18em] text-gold-500">{date}</p>

        <motion.div
          initial={{ opacity: 0.82, y: 6, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.66 }}
          className="w-full"
        >
          <ArchLineArt className="mt-5 h-16 w-full max-w-[190px] opacity-90" />
        </motion.div>

        <motion.a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0.82, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.82 }}
          className="mt-5 rounded-sm border border-gold-400/35 bg-wine-600 px-8 py-3 font-body text-[13px] uppercase tracking-[0.13em] text-ivory shadow-card transition-all hover:-translate-y-0.5 hover:bg-wine-700 active:translate-y-0"
        >
          View on Google Maps
        </motion.a>

        <div className="mt-7 border-t border-gold-400/30 pt-5">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold-500">
            Contact
          </p>
          <a
            href="https://wa.me/923095925791"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp at 03095925791"
            className="mt-2 inline-flex items-center gap-2 font-body text-sm text-wine-700 transition-colors hover:text-wine-500"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-wine-600"
              fill="currentColor"
            >
              <path d="M12.04 2a9.85 9.85 0 0 0-8.49 14.85L2.2 22l5.28-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.18 8.18 0 1 1 6.97 3.86Zm4.5-6.13c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.23-.74-.65-1.24-1.46-1.39-1.71-.14-.25-.02-.39.11-.52.11-.11.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
            </svg>
            <span>03095925791</span>
          </a>
        </div>
      </GlassCard>
      </Reveal>
    </PaperSection>
  );
}
