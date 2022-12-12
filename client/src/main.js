import { createApp } from 'vue'
import osd from '@unrest/vue-openseadragon'
import toolbar from '@unrest/vue-toolbar'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import components from '@/components'
import unrest from '@unrest/vue'
import form from '@unrest/vue-form'

import '@/css/index.css'
import '@unrest/tailwind/dist.css'
import '../../icons/build/super-metroid.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(osd)
app.use(form)
app.use(toolbar)
app.use(unrest.plugin)
app.use(unrest.ui)

Object.entries(components).forEach(([name, component]) => app.component(name, component))

app.mount('#app')
