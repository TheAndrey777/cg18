import customColors from "./src/config/colors.ts";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "data-theme",
  theme: {
    extend: {
      colors: {
        ...customColors,
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};