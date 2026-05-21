import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EFE6",
        olive: "#3D4A2A",
        terracotta: "#C97B5C",
        charcoal: "#1C1A17",
        blush: "#E8D5C4",
        "cream-dark": "#EDE4D7",
        "olive-light": "#5A6B3A",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 12vw, 10rem)", { lineHeight: "0.9" }],
        "display-lg": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.1" }],
      },
      spacing: {
        "section": "clamp(5rem, 12vw, 10rem)",
      },
      animation: {
        "grain": "grain 8s steps(10) infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(4%, -2%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(2%, -4%)" },
          "70%": { transform: "translate(-4%, 1%)" },
          "80%": { transform: "translate(3%, -3%)" },
          "90%": { transform: "translate(-2%, 4%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
