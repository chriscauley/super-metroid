const site = {
  name: process.env.VUE_APP_SITE || 'default',
  root: process.env.NODE_ENV === 'production' ? '.' : '',
  install(app) {
    app.config.globalProperties.$site = site
  },
}

if (site.name === 'varia') {
  site.root = '/solver/static/client'
}

export default site
