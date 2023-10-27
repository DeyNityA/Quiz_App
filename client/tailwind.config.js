/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'quiz-pattern': "url('./assets/clint-patterson-dYEuFB8KQJk-unsplash.jpg')",
      },
      screens: {
        'xsm': '100px',
        // => @media (min-width: 100px) { ... }
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

