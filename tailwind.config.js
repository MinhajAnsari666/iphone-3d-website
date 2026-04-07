/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        secondary: '#0A0A0C',
        accent: '#ff0000',
        cyan: '#00D6FF'
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'sans-serif']
      }
    },
  },
  plugins: [],
}
