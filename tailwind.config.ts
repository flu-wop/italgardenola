import type { Config } from "tailwindcss";

// Palette is taken from the client's own stylesheet (italgardennola.com/css/custom.css).
// See PALETTE.md for where each value comes from.
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f0efdd",
        sand: "#e8e8d0",
        ink: "#3f413e",
        bark: "#653b00",
        espresso: "#332927",
        leaf: "#1e7741",
        "leaf-deep": "#0b5226",
        sun: "#f4be20",
        sage: "#b1c89a",
        // Derived, not on the client's site: errors and destructive actions only.
        danger: "#9b2c1a",
      },
      fontFamily: {
        // Both are the client's own fonts (custom.css).
        display: ['"Sulphur Point"', "ui-sans-serif", "system-ui", "sans-serif"],
        body: ['"Sulphur Point"', "ui-sans-serif", "system-ui", "sans-serif"],
        script: ['"Square Peg"', "cursive"],
      },
      boxShadow: {
        lift: "0 24px 48px -24px rgba(51, 41, 39, 0.35)",
        soft: "0 8px 24px -12px rgba(51, 41, 39, 0.25)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
        bob: "bob 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
