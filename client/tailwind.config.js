module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    font: {
      // roboto is such a trash font
      display: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}