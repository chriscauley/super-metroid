import { createApp } from 'vue'
import osd from '@unrest/vue-openseadragon'
import toolbar from '@unrest/vue-toolbar'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import components from '@/components'
import unrest from '@unrest/vue'

import '@/css/index.css'
import '@unrest/tailwind/dist.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(osd)
app.use(toolbar)
app.use(unrest.plugin)

Object.entries(components).forEach(([name, component]) => app.component(name, component))

app.mount('#app')
