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
        'light-black': '#263238'
      },
      screens: {
        'xs': '450px',
        'xsm': '550px',
      },
    },
  },
  plugins: [require("daisyui")],
};