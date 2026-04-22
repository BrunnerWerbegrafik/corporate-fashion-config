/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brunner: {
          cyan: "#009FE3",
          cyanDark: "#0086C0",
          cyanSoft: "#7FCFF1",
          dark: "#0A1A2F",
          darkSoft: "#13253D",
          darkLine: "#1F3552",
          light: "#F4F5F7",
          lightSoft: "#FAFAFB",
        },
      },
      fontFamily: {
        sans: ['"Avenir LT"', "system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
        italic: ['"Avenir Next LT Pro Italic"', '"Avenir LT"', "italic", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        badgePulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "slide-in-right": "slideInRight 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-in": "fadeIn 220ms ease-out",
        "badge-pulse": "badgePulse 480ms ease-out",
      },
    },
  },
  plugins: [],
};
