/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Clash Display", "DM Sans", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        "surface-hover": "#1A1A1A",
        border: "#222222",
        text: {
          primary: "#F5F5F5",
          secondary: "#CCCCCC",
          tertiary: "#999999",
          disabled: "#666666",
        },
        accent: "#404040",
        "accent-light": "#505050",
        "accent-dark": "#333333",
      },
      animation: {
        "fade-in": "fade-in 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
        "slide-up": "slide-up 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-up": {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: 0, transform: "scale(0.95)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};
