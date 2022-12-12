/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      bungee: ["Bungee", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#1A303D",
        white: "#FFFFFF",
        cyan: colors.cyan,
        orange: colors.orange,
        slate: colors.slate,
        black: colors.black,
        red: colors.red,
        purple: colors.purple,
        gray: colors.gray,
        pink: colors.pink,
      },
    },
  },
  plugins: [],
};
