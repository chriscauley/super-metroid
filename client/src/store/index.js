import layout from './layout'
import axios from 'axios'

const modules = { layout }

const store = {
  install(app) {
    app.config.globalProperties.$store = store
    store._app = app

    Object.entries(modules).forEach(([name, module]) => {
      store[name] = module({ store })
    })
  },
  getDummyData() {
    return axios.get('/dummy_data.json').then((r) => r.data)
  },
}

export default store
