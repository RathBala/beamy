const { colors, radii, spacing, shadow } = require('./src/theme/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius: radii,
      boxShadow: shadow,
      fontFamily: {
        'wireframe': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
        'ui': ['Inter', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif']
      },
      borderStyle: {
        'dotted': 'dotted',
        'dashed': 'dashed'
      }
    },
  },
  plugins: [],
} 