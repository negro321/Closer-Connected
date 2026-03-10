/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          900: "var(--cc-text)", // Was #1E3A8A
          800: "var(--cc-primary-dark)", // Was #1e40af
          700: "var(--cc-primary-dark)", // Was #1d4ed8
          600: "var(--cc-primary)", // Was #2563eb
          500: "#3b82f6", // Keeping intermediate shades for gradients/charts if needed
          400: "#60A5FA",
          300: "#93c5fd",
          200: "#bfdbfe",
          100: "#dbeafe",
          50: "#eff6ff",
        },
        accent: {
          DEFAULT: "var(--cc-accent)", // Was #10B981
          hover: "#059669",
          500: "var(--cc-accent)", // Alias for consistency
          600: "#059669", // Darker shade
        },
        // Semantic aliases
        border: "var(--cc-border)",
        background: "var(--cc-bg)",
        "background-soft": "var(--cc-bg-soft)",
        muted: "var(--cc-muted)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
