/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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