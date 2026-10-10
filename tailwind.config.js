/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0C',
        paper: '#FFFFFF',
        accent: '#D70000',
      },
      fontFamily: {
        // Full Manrope — spec upgrade: tidak ada font lain
        sans: ['Manrope', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
