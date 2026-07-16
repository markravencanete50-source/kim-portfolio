/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0A0C10",
        surface: "#12151C",
        "surface-2": "#191D26",
        line: "#252A34",
        "line-soft": "#1B1F27",
        ink: "#E9ECF1",
        "ink-muted": "#98A0AE",
        "ink-faint": "#5C6470",
        teal: {
          DEFAULT: "#2DD4BF",
          bright: "#5EEAD4",
          dim: "#14B8A6",
        },
        gold: {
          DEFAULT: "#E8B04B",
          bright: "#F5C563",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      maxWidth: {
        content: "1160px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
