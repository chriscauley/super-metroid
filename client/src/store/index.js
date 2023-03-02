import axios from 'axios'
import { reactive } from 'vue'

import layout from './layout'
import ui from './ui'

const modules = { layout, ui }

const store = {
  install(app) {
    app.config.globalProperties.$store = store
    store._app = app

    Object.entries(modules).forEach(([name, module]) => {
      store[name] = module({ store })
    })
    store.state = reactive({})
  },
  getDummyData() {
    return axios.get('/dummy_data.json').then((r) => r.data)
  },
}

export default store
