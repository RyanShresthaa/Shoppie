export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // legacy names (used in a few components) — map to brand
        "primary-dark": "#047857",
        "primary-light": "#10b981",
        "secondary-dark": "#0f766e",
        "secondary-light": "#5eead4",
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"DM Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -4px rgba(15, 23, 42, 0.04)",
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px -2px rgba(15, 23, 42, 0.06)",
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
      },
      backgroundImage: {
        "mesh-slate":
          "radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.08) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(15, 118, 110, 0.06) 0, transparent 45%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
      },
    },
  },
  plugins: [],
};
