const CopyPlugin = require("copy-webpack-plugin");
const { defineConfig } = require('@vue/cli-service')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8079,
    allowedHosts: ['.localhost'],
    host: 'vclient.localhost',
    proxy: 'http://varia.localhost:8000/'
  },
  configureWebpack: {
    plugins: [
      new WebpackManifestPlugin(),
      new CopyPlugin({
        patterns: [
          './layouts/**/*',
        ]
      }),
    ]
  }
})

if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_SITE === 'varia') {
    module.exports.publicPath = '/solver/static/client/'
  } else {
    module.exports.publicPath = '/super-metroid'
  }
}
