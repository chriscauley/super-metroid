const site = {
  name: process.env.VUE_APP_SITE || 'default',
  root: process.env.NODE_ENV === 'production' ? '.' : '',
  install(app) {
    app.config.globalProperties.$site = site
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('-site-' + site.name)
    }
  },
}

if (site.name === 'varia') {
  site.root = '/solver/static/client'
}

export default site
