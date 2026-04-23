/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: "#009FE3",
          soft: "rgba(0,159,227,0.12)",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          2: "#333333",
        },
        muted: {
          DEFAULT: "#6B7280",
          2: "#9CA3AF",
        },
        hairline: "#E6E8EB",
        well: "#F4F4F4",
        page: "#EDEEF0",
        dk: {
          0: "#070E1A",
          1: "#0B1523",
          2: "#0F1B2D",
          3: "#152238",
          line: "rgba(255,255,255,0.08)",
          line2: "rgba(255,255,255,0.14)",
          muted: "#9BA7BA",
          muted2: "#6B7A90",
        },
        // Aliase für Backwards-Compat in unseren bisherigen Komponenten
        brunner: {
          cyan: "#009FE3",
          cyanDark: "#0086C0",
          cyanSoft: "#7FCFF1",
          dark: "#0B1523",
          darkSoft: "#0F1B2D",
          darkLine: "#152238",
          light: "#F4F4F4",
          lightSoft: "#FAFAFB",
        },
      },
      fontFamily: {
        sans: ['"Avenir"', '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        s: "4px",
        m: "6px",
      },
      maxWidth: {
        content: "1440px",
        inner: "1296px",
      },
      letterSpacing: {
        tightest: "-0.025em",
        caps: "0.18em",
        capsm: "0.08em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.2, 0.7, 0.2, 1)",
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
        pulseDot: {
          "0%, 100%": { boxShadow: "0 0 0 3px rgba(0,159,227,0.18)" },
          "50%": { boxShadow: "0 0 0 6px rgba(0,159,227,0.0)" },
        },
      },
      animation: {
        "slide-in-right": "slideInRight 450ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        "fade-in": "fadeIn 350ms ease-out",
        "badge-pulse": "badgePulse 480ms ease-out",
        "pulse-dot": "pulseDot 1800ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
