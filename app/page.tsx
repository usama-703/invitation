"use client";

import { useEffect, useRef, useState } from "react";
import InvitationEnvelope from "@/components/InvitationEnvelope";
import MusicToggle from "@/components/MusicToggle";
import HeroInvitation from "@/components/HeroInvitation";
import WelcomeMessage from "@/components/WelcomeMessage";
import QuranVerse from "@/components/QuranVerse";
import ScratchReveal from "@/components/ScratchReveal";
import WeddingPhoto from "@/components/WeddingPhoto";
import Countdown from "@/components/Countdown";
import ProgramTimeline from "@/components/ProgramTimeline";
import VenueSection from "@/components/VenueSection";
import ClosingSection from "@/components/ClosingSection";
import { invitationConfig } from "@/config/invitation";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);
  const [envelopeMounted, setEnvelopeMounted] = useState(true);
  const playbackRequestRef = useRef<(() => void) | null>(null);

  // Lock background scroll behind the envelope until the guest opens it.
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;

    const contentTimer = window.setTimeout(() => setContentRevealed(true), 4000);
    const envelopeTimer = window.setTimeout(() => setEnvelopeMounted(false), 5000);

    return () => {
      window.clearTimeout(contentTimer);
      window.clearTimeout(envelopeTimer);
    };
  }, [opened]);

  const handleOpen = () => {
    playbackRequestRef.current?.();
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setOpened(true);
    setVideoStarted(true);
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-ivory shadow-[0_0_80px_rgba(36,24,47,0.16)]">
      {/* The invitation itself — always in the DOM so the envelope opening
          reveals it directly, rather than swapping pages. */}
      <HeroInvitation revealed={contentRevealed} videoStarted={videoStarted} />
      <WelcomeMessage />
      <QuranVerse />
      <ScratchReveal />
      <WeddingPhoto />
      <Countdown />
      <ProgramTimeline />
      <VenueSection />
      <ClosingSection />

      {envelopeMounted && <InvitationEnvelope opening={opened} onOpen={handleOpen} />}

      <MusicToggle
        src={invitationConfig.music.src || undefined}
        playbackRequestRef={playbackRequestRef}
      />
    </main>
  );
}
