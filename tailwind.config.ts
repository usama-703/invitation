import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF5E9",
        paper: "#FFFDF7",
        plum: "#261522",
        lavender: {
          100: "#E6D9E7",
          200: "#B9A2CF"
        },
        blush: {
          50: "#F8EFE9",
          100: "#E6D9E7",
          200: "#D5BFCB",
          300: "#C29CAE"
        },
        wine: {
          400: "#98566B",
          500: "#702B43",
          600: "#49263C",
          700: "#261522"
        },
        gold: {
          DEFAULT: "#B28B4D",
          300: "#E2C994",
          400: "#B28B4D",
          500: "#96713B"
        }
      },
      fontFamily: {
        display: ["Bodoni MT", "Didot", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"]
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(107, 31, 42, 0.25)",
        card: "0 4px 24px -4px rgba(107, 31, 42, 0.12)"
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" }
        },
        floatUp: {
          "0%": { transform: "translateY(0px)", opacity: "0.7" },
          "100%": { transform: "translateY(-120px)", opacity: "0" }
        }
      },
      animation: {
        shimmer: "shimmer 2.4s ease-in-out infinite",
        floatUp: "floatUp 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
