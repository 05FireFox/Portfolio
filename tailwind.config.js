/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable manual dark mode toggle
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0011ff',
        'brand-dark': '#0a0a0a',
        'brand-light': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}