"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkle } from "lucide-react";
import { invitationConfig } from "@/config/invitation";
import { BotanicalCorner } from "./Decorations";
import Reveal from "./Reveal";
import { GlassCard, OrnamentalDivider, PaperSection, ScriptHeading } from "./InvitationDesign";

const CANVAS_SIZE = 320;
const completionSparkles = [
  { left: "23%", top: "32%" },
  { left: "72%", top: "28%" },
  { left: "32%", top: "68%" },
  { left: "67%", top: "61%" },
  { left: "49%", top: "18%" },
  { left: "52%", top: "78%" },
  { left: "15%", top: "52%" },
  { left: "81%", top: "48%" },
  { left: "37%", top: "23%" },
  { left: "63%", top: "23%" },
  { left: "27%", top: "60%" },
  { left: "74%", top: "68%" }
];

const heartGlitters = [
  { left: "35%", top: "36%", delay: "0s", size: "h-3 w-3" },
  { left: "65%", top: "35%", delay: "0.8s", size: "h-2.5 w-2.5" },
  { left: "29%", top: "49%", delay: "1.4s", size: "h-2.5 w-2.5" },
  { left: "71%", top: "49%", delay: "0.4s", size: "h-3 w-3" },
  { left: "37%", top: "72%", delay: "1.1s", size: "h-2 w-2" },
  { left: "63%", top: "72%", delay: "1.8s", size: "h-2.5 w-2.5" }
];

interface ScratchSparkle {
  id: number;
  left: number;
  top: number;
  x: number;
  y: number;
  size: number;
}

function heartPath(size: number): Path2D {
  const path = new Path2D();
  const scale = size / 300;

  path.moveTo(150 * scale, 270 * scale);
  path.bezierCurveTo(120 * scale, 244 * scale, 35 * scale, 184 * scale, 35 * scale, 112 * scale);
  path.bezierCurveTo(35 * scale, 66 * scale, 63 * scale, 38 * scale, 101 * scale, 38 * scale);
  path.bezierCurveTo(124 * scale, 38 * scale, 143 * scale, 52 * scale, 150 * scale, 73 * scale);
  path.bezierCurveTo(157 * scale, 52 * scale, 176 * scale, 38 * scale, 199 * scale, 38 * scale);
  path.bezierCurveTo(237 * scale, 38 * scale, 265 * scale, 66 * scale, 265 * scale, 112 * scale);
  path.bezierCurveTo(265 * scale, 184 * scale, 180 * scale, 244 * scale, 150 * scale, 270 * scale);
  path.closePath();
  return path;
}

function countPaintedSamples(ctx: CanvasRenderingContext2D): number {
  const { data } = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  let painted = 0;

  for (let y = 0; y < CANVAS_SIZE; y += 4) {
    for (let x = 0; x < CANVAS_SIZE; x += 4) {
      if (data[(y * CANVAS_SIZE + x) * 4 + 3] > 10) painted++;
    }
  }

  return painted || 1;
}

export default function ScratchReveal() {
  const { scratchReveal } = invitationConfig;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const initialPaintedRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [scratchSparkles, setScratchSparkles] = useState<ScratchSparkle[]>([]);

  // Paint the rose/gold scratch coating, clipped to the heart.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const paintHeart = () => {
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctxRef.current = ctx;

      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.save();
      ctx.clip(heartPath(CANVAS_SIZE));

      const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      gradient.addColorStop(0, "#EEE4F4");
      gradient.addColorStop(0.28, "#CBB8E3");
      gradient.addColorStop(0.62, "#B9A2CF");
      gradient.addColorStop(1, "#8174A3");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      for (let i = 0; i < 700; i++) {
        const gx = Math.random() * CANVAS_SIZE;
        const gy = Math.random() * CANVAS_SIZE;
        const lavenderFleck = Math.random() > 0.72;
        ctx.fillStyle = lavenderFleck
          ? `rgba(255,245,255,${Math.random() * 0.3})`
          : `rgba(255,255,255,${Math.random() * 0.2})`;
        const fleckSize = Math.random() > 0.94 ? 2 : 1;
        ctx.fillRect(gx, gy, fleckSize, fleckSize);
      }

      for (let i = 0; i < 16; i++) {
        const sparkleSize = 5 + Math.random() * 8;
        ctx.fillStyle = `rgba(255,255,255,${0.35 + Math.random() * 0.5})`;
        ctx.font = `${sparkleSize}px serif`;
        ctx.fillText("✦", Math.random() * CANVAS_SIZE, Math.random() * CANVAS_SIZE);
      }

      ctx.restore();

      initialPaintedRef.current = countPaintedSamples(ctx);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      paintHeart();
      observer.disconnect();
    }, { rootMargin: "160px" });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const erase = useCallback((x: number, y: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 34;

    const last = lastPointRef.current;
    ctx.beginPath();
    if (last) {
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.arc(x, y, 17, 0, Math.PI * 2);
    ctx.fill();
    lastPointRef.current = { x, y };
  }, []);

  const sampleProgress = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || revealed) return;
    const remaining = countPaintedSamples(ctx);
    const scratchedPct = Math.min(100, Math.round((1 - remaining / initialPaintedRef.current) * 100));
    setProgress(scratchedPct);
    if (scratchedPct >= scratchReveal.completionThreshold) {
      setRevealed(true);
    }
  }, [revealed, scratchReveal.completionThreshold]);

  const pointToCanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE
    };
  };

  const emitScratchSparkles = (x: number, y: number) => {
    setScratchSparkles(
      Array.from({ length: 5 }, (_, id) => ({
        id,
        left: (x / CANVAS_SIZE) * 100,
        top: (y / CANVAS_SIZE) * 100,
        x: Math.random() * 34 - 17,
        y: Math.random() * 34 - 17,
        size: 6 + Math.random() * 6
      }))
    );
    window.setTimeout(() => setScratchSparkles([]), 520);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    drawingRef.current = true;
    lastPointRef.current = null;
    const { x, y } = pointToCanvas(e);
    erase(x, y);
    emitScratchSparkles(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || revealed) return;
    const { x, y } = pointToCanvas(e);
    erase(x, y);
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
    sampleProgress();
  };

  return (
    <PaperSection variant="lavender" className="px-6 py-14 sm:py-16">
      <Reveal className="mx-auto max-w-sm">
      <GlassCard className="relative flex flex-col items-center rounded-xl px-3 py-8 text-center sm:px-5">
        <BotanicalCorner />
        <BotanicalCorner position="bottom-right" />
        <p className="mb-1 font-body text-[10px] uppercase tracking-[0.28em] text-gold-500">A little keepsake</p>
        <ScriptHeading>{scratchReveal.heading}</ScriptHeading>
        <OrnamentalDivider className="mb-5 mt-3" />

        <motion.div
          className="relative aspect-square w-full max-w-[350px] drop-shadow-[0_18px_24px_rgba(36,24,47,0.28)]"
          animate={revealed ? { scale: [1, 1.025, 1], filter: ["drop-shadow(0 0 0 rgba(198,161,91,0))", "drop-shadow(0 0 24px rgba(198,161,91,.5))", "drop-shadow(0 0 6px rgba(198,161,91,.24))"] } : { scale: 1 }}
          transition={{ duration: 1.25, ease: "easeInOut", repeat: revealed ? 1 : 0 }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 300 300"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="revealHeartGradient" x1="5%" x2="95%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#E6D9E7" />
                <stop offset="42%" stopColor="#CBB8E3" />
                <stop offset="78%" stopColor="#A88CCB" />
                <stop offset="100%" stopColor="#8174A3" />
              </linearGradient>
              <radialGradient id="revealHeartGlow" cx="35%" cy="20%" r="75%">
                <stop offset="0%" stopColor="#fffaff" stopOpacity=".5" />
                <stop offset="100%" stopColor="#B9A2CF" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="revealHeartRim" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#F7F0FA" />
                <stop offset="55%" stopColor="#B9A2CF" />
                <stop offset="100%" stopColor="#E6D9E7" />
              </linearGradient>
            </defs>
            <path
              d="M150 270 C120 244 35 184 35 112 C35 66 63 38 101 38 C124 38 143 52 150 73 C157 52 176 38 199 38 C237 38 265 66 265 112 C265 184 180 244 150 270 Z"
              fill="url(#revealHeartGradient)"
            />
            <path
              d="M150 270 C120 244 35 184 35 112 C35 66 63 38 101 38 C124 38 143 52 150 73 C157 52 176 38 199 38 C237 38 265 66 265 112 C265 184 180 244 150 270 Z"
              fill="url(#revealHeartGlow)"
            />
          </svg>

          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
            {heartGlitters.map((glitter, index) => (
              <Sparkle
                key={index}
                className={`heart-twinkle absolute ${glitter.size} fill-[#CBB8E3]/80 text-[#F7F0FA]`}
                style={{ left: glitter.left, top: glitter.top, animationDelay: glitter.delay }}
                strokeWidth={1}
              />
            ))}
          </div>

          <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-2 px-7 py-6 text-center">
            <span className="max-w-[78%] whitespace-pre-line font-script text-[1.8rem] leading-[0.92] text-ivory drop-shadow-[0_2px_8px_rgba(20,10,18,0.42)] sm:text-[2.2rem]">
              {scratchReveal.hiddenMessage}
            </span>
            <div className="relative inline-flex max-w-[74%] flex-col items-center gap-1 overflow-hidden rounded-[10px] border border-white/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.68)_0%,rgba(247,241,250,0.48)_54%,rgba(225,213,241,0.56)_100%)] px-3 py-2.5 shadow-[0_8px_22px_rgba(58,39,76,0.2),0_0_18px_rgba(230,217,245,0.38),inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-1px_0_rgba(185,162,207,0.2)] backdrop-blur-xl sm:px-3.5 sm:py-3">
              <span className="pointer-events-none absolute inset-[4px] rounded-[7px] border border-white/45" aria-hidden="true" />
              <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90" aria-hidden="true" />
              <span className="relative font-body text-[7px] font-semibold uppercase tracking-[0.25em] text-[#8174A3] sm:text-[8px]">
                Save the date
              </span>
              <span className="flex w-full items-center gap-1.5" aria-hidden="true">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B9A2CF]/70" />
                <Heart className="h-2 w-2 fill-[#B9A2CF] text-[#8174A3]" strokeWidth={1} />
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B9A2CF]/70" />
              </span>
              <span className="relative max-w-full whitespace-normal break-words font-display text-[10px] font-semibold leading-tight tracking-[0.04em] text-[#382946] sm:text-[12px]">
                {scratchReveal.hiddenSubMessage}
              </span>
            </div>
          </div>

          {/* Scratchable coating */}
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 z-[5] touch-pan-y"
            style={{ width: "100%", height: "100%" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            animate={revealed ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 300 300"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path
              d="M150 270 C120 244 35 184 35 112 C35 66 63 38 101 38 C124 38 143 52 150 73 C157 52 176 38 199 38 C237 38 265 66 265 112 C265 184 180 244 150 270 Z"
              fill="none"
              stroke="url(#revealHeartRim)"
              strokeOpacity="0.95"
              strokeWidth="2"
            />
          </svg>

          {scratchSparkles.map((sparkle) => (
            <motion.span
              key={sparkle.id}
              className="pointer-events-none absolute z-20 text-gold-400"
              style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
              initial={{ opacity: 0, scale: 0.35, x: 0, y: 0 }}
              animate={{ opacity: [0, 0.95, 0], scale: [0.35, 1, 0.25], x: sparkle.x, y: sparkle.y }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Sparkle size={sparkle.size} className="fill-gold-300/80" strokeWidth={1} />
            </motion.span>
          ))}

          {/* Sparkle burst on completion */}
          <AnimatePresence>
            {revealed &&
              completionSparkles.map((sparkle, i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute text-gold-400"
                  style={{
                    left: sparkle.left,
                    top: sparkle.top
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.6], y: -30 }}
                  transition={{ duration: 1.4, delay: i * 0.08 }}
                >
                  <Sparkle className="h-4 w-4 fill-gold-300" strokeWidth={1} />
                </motion.span>
              ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-4 font-body text-xs uppercase tracking-[0.16em] text-wine-500/70">
          {revealed ? "Revealed with love" : `Scratch the heart to reveal · ${progress}%`}
        </p>
      </GlassCard>
      </Reveal>
    </PaperSection>
  );
}
