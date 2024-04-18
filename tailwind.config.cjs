/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#fe7e00',
        'secondary': '#fb6100',
      },
      screens: {
        'xs': '450px',
      },
    },
  },
  plugins: [require("daisyui")],
};