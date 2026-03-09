/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4A853",
        "gold-light": "#E8C472",
        "gold-dark": "#B8922E",
        black: "#080808",
        surface: "#0F0F0F",
        surface2: "#141414",
        surface3: "#1C1C1C",
        surface4: "#242424",
        cream: "#F5F0E8",
        "cream-dark": "#D4C9B8",
        "red-deep": "#8B0000",
        "text-main": "#F5F0E8",
        "text-sub": "#8A7E6E",
        "text-mid": "#C4B8A8",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        flicker: "flicker 3s infinite",
        marquee: "marquee 15s linear infinite",
        "glow-gold": "glow-gold 2s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
          "70%": { opacity: 0.9 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-gold": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,168,83,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(212,168,83,0.3)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      boxShadow: {
        "glow-gold": "0 0 40px rgba(212,168,83,0.25)",
        "glow-gold-sm": "0 0 20px rgba(212,168,83,0.15)",
        "glow-red": "0 0 40px rgba(139,0,0,0.2)",
        luxury: "0 32px 64px rgba(0,0,0,0.8)",
        card: "0 16px 48px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
