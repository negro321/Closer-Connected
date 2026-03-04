/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          900: "#1E3A8A", // primary
          800: "#1e40af",
          700: "#1d4ed8",
          600: "#2563eb",
          500: "#3b82f6",
          400: "#60A5FA", // secondary
          300: "#93c5fd",
          200: "#bfdbfe",
          100: "#dbeafe",
          50: "#eff6ff",
        },
        accent: {
          DEFAULT: "#10B981", // green
          hover: "#059669",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};