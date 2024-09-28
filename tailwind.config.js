/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001c1c',
        fontColor: '#e0ffff',
        secondary: '#7f7fff',
        accent: '#ff5c00',
        disabled: '#a9a9a9',
      },
    },
  },
  plugins: [],
}
