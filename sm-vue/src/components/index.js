import GridTracker from './GridTracker.vue'
import PauseTracker from './PauseTracker.vue'
import CwispTracker from './CwispTracker.vue'

export default {
  GridTracker,
  PauseTracker,
  CwispTracker,
  install(app) {
    app.component('SmGridTracker', GridTracker)
    app.component('SmPauseTracker', PauseTracker)
    app.component('SmCwispTracker', CwispTracker)
  },
}
