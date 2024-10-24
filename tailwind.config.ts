import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
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
        'primary': {
          DEFAULT: '#FE7E00',
          50: '#FFDBB7',
          100: '#FFD0A2',
          200: '#FFBC79',
          300: '#FFA751',
          400: '#FF9328',
          500: '#FE7E00',
          600: '#C66200',
          700: '#8E4600',
          800: '#562B00',
          900: '#1E0F00',
          950: '#020100'
        },
        'secondary': {
          DEFAULT: '#FB6100',
          50: '#FFD1B4',
          100: '#FFC49F',
          200: '#FFAB76',
          300: '#FF924E',
          400: '#FF7925',
          500: '#FB6100',
          600: '#C34B00',
          700: '#8B3600',
          800: '#532000',
          900: '#1B0A00',
          950: '#000000'
        },
        'light-black': {
          DEFAULT: '#263238',
          50: '#7592A1',
          100: '#688999',
          200: '#577381',
          300: '#475D69',
          400: '#364850',
          500: '#263238',
          600: '#0F1417',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config