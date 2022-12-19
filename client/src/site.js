import { reactive } from 'vue'

export default {
  install(app) {
    let name = 'default'
    if (typeof window === 'undefined') {
      name = window.SM_NAME || name
    }
    app.config.globalProperties.$site = reactive({ name })
  },
}
