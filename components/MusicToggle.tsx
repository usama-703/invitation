"use client";

import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicToggleProps {
  src?: string;
  playbackRequestRef: MutableRefObject<(() => void) | null>;
}

function logUnexpectedPlaybackError(error: unknown) {
  if (
    error instanceof DOMException &&
    ["AbortError", "NotAllowedError", "NotSupportedError"].includes(error.name)
  ) {
    return;
  }

  console.error("Unable to play the background music.", error);
}

/** Small floating pill, fixed top-right for the entire experience. */
export default function MusicToggle({ src, playbackRequestRef }: MusicToggleProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!src) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.55;

    const startPlayback = () => {
      void audio.play().catch((error: unknown) => {
        logUnexpectedPlaybackError(error);
      });
    };

    playbackRequestRef.current = startPlayback;
    startPlayback();

    return () => {
      playbackRequestRef.current = null;
      audio.pause();
    };
  }, [playbackRequestRef, src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play().catch((error: unknown) => {
        logUnexpectedPlaybackError(error);
      });
    }
  };

  return (
    <>
      {src && (
        <audio
          ref={audioRef}
          src={src}
          autoPlay
          loop
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        aria-pressed={playing}
        data-music-toggle
        className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-wine-600 shadow-card ring-1 ring-wine-600/10 backdrop-blur-sm sm:right-6 sm:top-6"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileTap={{ scale: 0.9 }}
      >
        {playing ? <Volume2 className="h-4 w-4" strokeWidth={1.5} /> : <VolumeX className="h-4 w-4" strokeWidth={1.5} />}
      </motion.button>
    </>
  );
}
