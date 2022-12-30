const px = (number) => `calc(${number} * var(--inventory-px))`

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-for': {},
    'postcss-simple-vars': {},
    'postcss-functions': { functions: { px } },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {}
  }
}

