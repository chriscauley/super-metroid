const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8079,
    allowedHosts: ['.localhost'],
    host: 'vclient.localhost',
  },
})
