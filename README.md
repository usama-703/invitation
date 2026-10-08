# Muhammad Adil — Wedding Invitation

A mobile-first, interactive wedding invitation built with Next.js 14 (App Router), React, TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. On first load, next/font downloads Playfair Display, Cormorant Garamond and Great Vibes from Google Fonts, so an internet connection is needed the first time you run `npm run dev` or `npm run build`.

## Re-skinning for a different couple

Every piece of copy, the wedding date/time, venue, accommodation, gifts, colors, music track and language list live in one place:

```
config/invitation.ts
```

Change the values there and the whole site updates — no need to touch any component.

- `hero.backgroundImage` / `photo.image` — leave blank to use the generated gradient placeholders, or point at a real photo URL to swap them in (served through `next/image`).
- `countdown.weddingDateTimeISO` — must include a UTC offset (e.g. `2026-12-24T18:00:00+05:30`) so the countdown resolves to the same real moment for every guest, regardless of their device timezone.
- `guestMessage.endpoint` — left empty, the RSVP form simulates a network round trip so the interaction can be reviewed end to end. Point it at your own API route (e.g. `/api/rsvp`) to persist real submissions; the form already POSTs `{ name, email, attendance, message }` as JSON.
- `music.src` — optional URL to a background audio track. Playback only starts after the guest taps the envelope (and only if they leave the toggle "on"), in line with browser autoplay rules.

## Structure

```
app/
  layout.tsx        fonts, metadata, safe-area-aware viewport
  page.tsx           assembles the section sequence + floating controls
  globals.css
components/
  InvitationEnvelope.tsx   tap-to-open envelope with flap animation
  MusicToggle.tsx          floating music control
  LanguageToggle.tsx       floating language pill
  HeroInvitation.tsx       full-bleed cinematic hero, scroll parallax
  WelcomeMessage.tsx
  ScratchReveal.tsx        canvas-based heart scratch card
  WeddingPhoto.tsx
  Countdown.tsx            live, timezone-safe countdown
  VenueSection.tsx
  TransportationSection.tsx
  AccommodationSection.tsx
  GiftsSection.tsx
  GuestMessageForm.tsx     validated RSVP form
  ClosingSection.tsx
  Footer.tsx
  Decorations.tsx          shared SVG ornaments (flourishes, hearts, dividers, line art)
  Reveal.tsx                shared fade-up scroll reveal wrapper
config/
  invitation.ts             all wedding content and settings
```

## Notes

- Layout is capped at `max-w-[480px]` and centered, so desktop still reads as a phone-sized invitation rather than a stretched website.
- The scratch card is real canvas erasing (pointer events, `destination-out` compositing) with a sampled scratch-percentage that auto-completes the reveal past the configured threshold — not a CSS trick.
- Decorative elements (botanical pattern, flourishes, dividers, architectural line art) are hand-drawn SVG/CSS, so the invitation looks finished with zero external image assets; photos are fully optional and configurable.
- Respects `prefers-reduced-motion`.
