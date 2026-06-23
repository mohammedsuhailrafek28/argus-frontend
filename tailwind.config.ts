import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        marble: { DEFAULT: "#F2F8FC", 50: "#FBFDFF", 100: "#F2F8FC", 200: "#E6F0F8" },
        ink: {
          DEFAULT: "#0B1220", 900: "#0B1220", 800: "#1A2233", 700: "#334155",
          600: "#475569", 500: "#64748B", 400: "#94A3B8", 300: "#CBD5E1",
          200: "#E2E8F0", 100: "#F1F5F9",
        },
        indigo: {
          DEFAULT: "#3730A3", 50: "#EEF0FB", 100: "#E0E3F7", 200: "#C3C9EF",
          300: "#9BA3E3", 400: "#6E78D2", 500: "#3730A3", 600: "#312B8F",
          700: "#272372",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: { tightest: "-0.04em", tighter: "-0.02em" },
      boxShadow: {
        research: "0 1px 2px rgba(11,18,32,0.04), 0 8px 24px -12px rgba(11,18,32,0.08)",
        lift: "0 2px 6px rgba(11,18,32,0.06), 0 18px 40px -18px rgba(11,18,32,0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
