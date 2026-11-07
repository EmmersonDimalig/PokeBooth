/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#20231F', cream: '#F5F2E9', paper: '#fffdf7', coral: '#ef6351', mustard: '#F4EB43', teal: '#78a99d', violet: '#6863a6', line: '#cbc8bd' },
      fontFamily: { display: ['"Nunito"', 'sans-serif'], sans: ['"DM Sans"', 'sans-serif'] }
    }
  },
  plugins: []
};
