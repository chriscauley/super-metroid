import { createApp } from 'vue'
import VueClick from 'vue-click'
import osd from '@unrest/vue-openseadragon'
import toolbar from '@unrest/vue-toolbar'
import SmVue from 'sm-vue'

import App from '@/App.vue'
import site from '@/site'
import store from '@/store'
import router from '@/router'
import components from '@/components'
import unrest from '@unrest/vue'
import form from '@unrest/vue-form'

import '@unrest/tailwind/dist.css'
import '@/css/index.css'
import '@/lib/autotracker'

const app = createApp(App)
app.use(site)
app.use(store)
app.use(router)
app.use(osd)
app.use(form)
app.use(toolbar)
app.use(unrest.plugin)
app.use(unrest.ui)
app.use(SmVue)
app.use(VueClick)

app.config.unwrapInjectedRef = true

Object.entries(components).forEach(([name, component]) => app.component(name, component))

app.mount('#app')
