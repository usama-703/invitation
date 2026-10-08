"use client";

/**
 * Small hand-drawn-style heart, used as a mid-point ornament on dividers
 * and as a lone accent under headings.
 */
export function TinyHeart({ className = "", color = "#702B43" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 20.5c-.3 0-.6-.1-.8-.3-3.6-3.2-6-5.4-7.4-7.4C2.5 11 2 9.7 2 8.3 2 5.9 3.9 4 6.3 4c1.4 0 2.7.7 3.7 1.9C11 4.7 12.3 4 13.7 4 16.1 4 18 5.9 18 8.3c0 1.4-.5 2.7-1.8 4.5-1.4 2-3.8 4.2-7.4 7.4-.2.2-.5.3-.8.3z"
        fill={color}
        fillOpacity="0.85"
      />
    </svg>
  );
}

/**
 * A thin horizontal divider with a tiny heart centered on it —
 * used beneath nearly every script heading in the invitation.
 */
export function DividerWithHeart({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/55 sm:w-16" />
      <TinyHeart color="#B08D45" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/55 sm:w-16" />
    </div>
  );
}

export function BotanicalCorner({
  className = "",
  position = "top-left"
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positions = {
    "top-left": "left-0 top-0",
    "top-right": "right-0 top-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 rotate-180"
  };

  return (
    <svg
      viewBox="0 0 84 84"
      className={`pointer-events-none absolute h-16 w-16 text-gold-500/45 sm:h-[4.5rem] sm:w-[4.5rem] ${positions[position]} ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 78C17 57 25 40 45 21 55 11 66 7 79 5" stroke="currentColor" strokeWidth="1" />
      <path d="M22 55c-11-1-16-7-15-17 11 0 16 6 15 17Zm12-14c-2-11 3-17 13-18 2 11-3 17-13 18Zm14-13c0-10 6-15 16-14 0 10-6 15-16 14Zm-28 31c-10-4-13-11-9-20 10 3 14 10 9 20Z" stroke="currentColor" strokeWidth=".9" />
      <path d="M72 10c1 5-1 8-5 9-2-5 0-8 5-9Z" fill="currentColor" opacity=".55" />
      <circle cx="5" cy="78" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Symmetrical flourish used above/below "YOU ARE INVITED" and other
 * ceremonial moments — echoes engraved wedding stationery.
 */
export function Flourish({ className = "", color = "#C9A96A" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 12c20 0 20-8 40-8s20 8 40 8 20-8 40-8 20 8 40 8 18-8 36-8"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="100" cy="12" r="2.5" fill={color} />
    </svg>
  );
}

/**
 * Subtle embossed botanical repeat pattern used on the envelope face.
 * Rendered as a low-opacity SVG data pattern so it reads as debossed
 * paper texture rather than a printed illustration.
 */
export function BotanicalPattern({ className = "", opacity = 0.16 }: { className?: string; opacity?: number }) {
  return (
    <svg className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id="botanical" width="90" height="90" patternUnits="userSpaceOnUse">
          <g opacity={opacity} stroke="#702B43" fill="none" strokeWidth="1">
            <path d="M45 10c8 8 8 18 0 26-8-8-8-18 0-26z" />
            <path d="M45 36v34" />
            <path d="M45 50c10-4 16 2 16 10-10 2-16-4-16-10z" />
            <path d="M45 60c-10-4-16 2-16 10 10 2 16-4 16-10z" />
            <circle cx="45" cy="10" r="2" fill="#702B43" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#botanical)" />
    </svg>
  );
}

/**
 * Simple architectural line-art arch, echoing the venue's colonnade —
 * sits quietly beneath the venue address.
 */
export function ArchLineArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 120" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 110V60c0-38 24-50 100-50s100 12 100 50v50"
        stroke="#C9A96A"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path d="M40 110V64c0-26 18-36 80-36s80 10 80 36v46" stroke="#702B43" strokeWidth="1" opacity="0.35" />
      <line x1="10" y1="110" x2="230" y2="110" stroke="#C9A96A" strokeWidth="1.2" opacity="0.55" />
    </svg>
  );
}

/**
 * Gentle flowing wavy botanical rule used at the top/bottom of the closing section.
 */
export function WavyBotanicalRule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 28" className={`w-full ${className}`} fill="none" aria-hidden="true">
      <path
        d="M0 14c20-12 40 12 60 0s40-12 60 0 40 12 60 0 40-12 60 0 40 12 60 0"
        stroke="#C9A96A"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="60" cy="14" r="1.6" fill="#702B43" opacity="0.5" />
      <circle cx="160" cy="14" r="1.6" fill="#702B43" opacity="0.5" />
      <circle cx="260" cy="14" r="1.6" fill="#702B43" opacity="0.5" />
    </svg>
  );
}
