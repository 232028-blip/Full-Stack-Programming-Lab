/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#f47521',
          dark: '#d4621a',
        },
        wood: {
          light: '#d4a96a',
          medium: '#8b5e3c',
          dark: '#4a2c0a',
        },
      },
      fontFamily: {
        sans: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
