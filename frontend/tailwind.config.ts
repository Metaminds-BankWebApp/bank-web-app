import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--primecore-background)",
        foreground: "var(--primecore-foreground)",
        border: "var(--primecore-border)",
        surface: "var(--primecore-surface)",
        "surface-soft": "var(--primecore-surface-soft)",
        primary: {
          DEFAULT: "var(--primecore-primary)",
          foreground: "var(--primecore-foreground)",
        },
        deep: "var(--primecore-deep)",
        navy: "var(--primecore-navy)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
};

export default config;
