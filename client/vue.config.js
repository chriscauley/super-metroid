const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8079,
    allowedHosts: ['.localhost'],
    host: 'vclient.localhost',
    proxy: 'http://varia.localhost:8000/'
  },
})

if (process.env.NODE_ENV === 'production') {
  module.exports.publicPath = '/super-metroid'
}