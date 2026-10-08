import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

// Refined serif for body copy and secondary information
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

// Romantic calligraphic script for couple names and section titles
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Muhammad Adil — Wedding Invitation",
  description: "You are invited to the wedding of Muhammad Adil."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8174A3"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable}`}>
      <body className="font-body bg-ivory text-wine-700">{children}</body>
    </html>
  );
}
