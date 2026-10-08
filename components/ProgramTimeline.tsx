"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { invitationConfig } from "@/config/invitation";
import { BotanicalCorner } from "./Decorations";
import Reveal from "./Reveal";
import { GlassCard, PaperSection, ScriptHeading } from "./InvitationDesign";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Kolkata"
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata"
});

export default function ProgramTimeline() {
  const { countdown, programTimeline } = invitationConfig;
  const ceremonyDate = new Date(countdown.weddingDateTimeISO);
  const date = dateFormatter.format(ceremonyDate);

  return (
    <PaperSection variant="ivory" className="px-7 py-14 sm:py-16">
      <Reveal className="mx-auto flex max-w-sm flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0.82, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Clock3 className="mb-4 h-5 w-5 text-wine-500" strokeWidth={1.25} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.82, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <ScriptHeading>{programTimeline.heading}</ScriptHeading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.72, scaleX: 0.82 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-3 h-px w-40 origin-center bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
        />

        <GlassCard className="relative mt-7 w-full rounded-xl py-6 pl-12 pr-5 text-left">
          <BotanicalCorner className="h-12 w-12 opacity-60" />
          <BotanicalCorner position="bottom-right" className="h-12 w-12 opacity-60" />
          <ol className="relative z-10 space-y-6">
            {programTimeline.events.map((event, index) => {
              const eventDate =
                typeof event.timeOffsetMinutes === "number"
                  ? new Date(ceremonyDate.getTime() + event.timeOffsetMinutes * 60_000)
                  : null;
              const time = eventDate
                ? timeFormatter.format(eventDate)
                : "timeLabel" in event && typeof event.timeLabel === "string"
                  ? event.timeLabel
                  : undefined;

              return (
                <motion.li
                  key={event.title}
                  initial={{ opacity: 0.82, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.48 + index * 0.16 }}
                  className="relative"
                >
                  <motion.span
                    className="absolute -left-[31px] top-1.5 h-[9px] w-[9px] rounded-full border border-ivory bg-gold-500 shadow-[0_0_0_2px_rgba(176,141,69,0.2)]"
                    initial={{ opacity: 0.82, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.6 + index * 0.16 }}
                  />
                  <h3 className="font-display text-xl leading-tight text-wine-600">{event.title}</h3>
                  <p className="mt-1 font-body text-sm italic text-gold-500">
                    {date} · {time}
                  </p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-wine-600/80">{event.description}</p>
                </motion.li>
              );
            })}
          </ol>
        </GlassCard>
      </Reveal>
    </PaperSection>
  );
}