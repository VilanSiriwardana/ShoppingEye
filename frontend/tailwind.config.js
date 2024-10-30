/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#0370FF',
        'secondary-blue': '#BCDDEF'
      },

      fontFamily: {
        inika: ['Inika', 'serif'],
        mclaren: ['McLaren', 'cursive'],
        lexend: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

