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
        primary: {
          DEFAULT: "#2F9D94",
          foreground: "#F7F6F2",
        },
        deep: "#025F67",
        navy: "#063154",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
};

export default config;
