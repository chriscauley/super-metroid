import { createApp } from 'vue'
import osd from '@unrest/vue-openseadragon'

import App from '@/App.vue'
import router from '@/router'
import components from '@/components'
import unrest from '@unrest/vue'

import '@/css/index.css'

const app = createApp(App)
app.use(router)
app.use(osd)
app.use(unrest.plugin)

Object.entries(components).forEach(([name, component]) => app.component(name, component))

app.mount('#app')
