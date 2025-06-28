/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./index.html",
    "./*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'wireframe': ['Comic Sans MS', 'cursive', 'sans-serif']
      },
      borderStyle: {
        'dotted': 'dotted',
        'dashed': 'dashed'
      }
    },
  },
  plugins: [],
} 