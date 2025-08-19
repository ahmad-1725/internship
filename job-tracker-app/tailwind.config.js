/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",        // if using Vite
    "./src/**/*.{js,jsx,ts,tsx}", // make sure your components/pages are covered
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
