import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./context/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm, editorial palette — ivory/charcoal with a clay accent,
        // evoking the same restrained real-estate-brochure feel as the
        // design reference, built from an original color system rather
        // than sampled from it.
        canvas: {
          light: "#f8f4ee",
          dark: "#14120f",
        },
        ink: {
          light: "#211d17",
          dark: "#f2ede3",
        },
        accent: {
          DEFAULT: "#a15c3e",
          soft: "#d9a679",
        },
        moss: "#6b7259",
      },
      fontFamily: {
        // Curated system-font stacks rather than next/font/google —
        // deliberate: zero external font fetch means the build is
        // fully reproducible offline and in network-restricted CI,
        // and this stack still reaches a genuine high-contrast serif
        // (Iowan Old Style / Baskerville / Georgia) on most platforms.
        // Swap for next/font/google's Fraunces + Inter later for even
        // closer fidelity if a network-connected build is guaranteed.
        serif: [
          "ui-serif",
          "Iowan Old Style",
          "Apple Garamond",
          "Baskerville",
          "Georgia",
          "Times New Roman",
          "Droid Serif",
          "Source Serif Pro",
          "serif",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
