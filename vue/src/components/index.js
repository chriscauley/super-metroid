import ItemTracker from './ItemTracker/index.vue'

export default {
  ItemTracker,
  install(app) {
    app.component('SmItemTracker', ItemTracker)
  },
}
