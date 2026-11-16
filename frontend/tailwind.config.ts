import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F8EFE3",
          50: "#FAF5EE",
          100: "#F8EFE3",
          200: "#F1DFCB",
          300: "#EAD0B4",
        },
        beige: {
          DEFAULT: "#EAD8C4",
          light: "#F4EBE0",
          dark: "#D7BFA5",
        },
        coffee: {
          DEFAULT: "#70452B",
          light: "#8C5838",
          dark: "#4B2D1B",
          darker: "#2E1A0F",
        },
        forest: {
          DEFAULT: "#263B2D",
          light: "#395743",
          dark: "#1A281F",
          darker: "#101913",
        },
        sage: {
          DEFAULT: "#A3A58A",
          light: "#C0C2AA",
          dark: "#7D7F66",
        },
        ink: {
          DEFAULT: "#231812",
          muted: "#5C4638",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(112, 69, 43, 0.08)",
        card: "0 15px 35px -5px rgba(38, 59, 45, 0.08)",
        glow: "0 0 25px rgba(163, 165, 138, 0.35)",
        dock: "0 20px 40px rgba(38, 59, 45, 0.18), 0 0 1px rgba(112, 69, 43, 0.2)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
