/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#18202f",
        mint: "#2f9e7e",
        amber: "#f4a261"
      }
    }
  },
  plugins: []
};
