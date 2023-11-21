import CwispTracker from './CwispTracker.vue'
import GridTracker from './GridTracker.vue'
import PauseTracker from './PauseTracker.vue'
import ObjectiveSelector from './ObjectiveSelector.vue'

export default {
  CwispTracker,
  GridTracker,
  PauseTracker,
  ObjectiveSelector,
  install(app) {
    app.component('SmCwispTracker', CwispTracker)
    app.component('SmGridTracker', GridTracker)
    app.component('SmPauseTracker', PauseTracker)
    app.component('SmObjectiveSelector', ObjectiveSelector)
  },
}
