"use client";

import Image from "next/image";
import { invitationConfig } from "@/config/invitation";
import { BotanicalCorner, DividerWithHeart } from "./Decorations";
import Reveal from "./Reveal";
import { DecorativeFrame, PaperSection, ScriptHeading } from "./InvitationDesign";

export default function WeddingPhoto() {
  const { photo } = invitationConfig;

  return (
    <PaperSection variant="warm" className="px-7 py-14 sm:py-16">
      <Reveal className="mx-auto max-w-sm">
        <DecorativeFrame className="photo-glass-frame relative rounded-[1.5rem] p-3">
          <BotanicalCorner className="z-10" />
          <BotanicalCorner position="bottom-right" className="z-10" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1rem] border border-white/70 shadow-[0_12px_28px_-16px_rgba(36,24,47,0.6)]">
            <Image
              src={photo.image || "/couple.jpg"}
              alt="Wedding couple"
              fill
              priority
              className="album-zoom object-cover"
              sizes="(max-width: 640px) 90vw, 380px"
            />
          </div>
          <div className="pointer-events-none absolute inset-2 rounded-[1.15rem] border border-gold-400/30" />
          <div className="pointer-events-none absolute -left-1 -top-1 h-8 w-8 rounded-tl-[1.5rem] border-l border-t border-gold-500/70" />
          <div className="pointer-events-none absolute -bottom-1 -right-1 h-8 w-8 rounded-br-[1.5rem] border-b border-r border-gold-500/70" />
        </DecorativeFrame>
        <p className="mt-5 text-center font-script text-3xl text-wine-600">{photo.caption}</p>
        <div className="mt-2 flex justify-center"><DividerWithHeart /></div>
      </Reveal>
    </PaperSection>
  );
}
