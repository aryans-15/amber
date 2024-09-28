/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001c1c',
        font: '#e0ffff',
        secondary: '#7f7fff',
        accent: '#ff5c00',
        disabled: '#a9a9a9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: 200,
      },
    },
  },
  plugins: [],
}
