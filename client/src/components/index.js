import DoorPopup from './DoorPopup.vue'
import ItemPopup from './ItemPopup.vue'
import ItemTracker from './ItemTracker'

export default {
  DoorPopup,
  ItemPopup,
  ...ItemTracker.components,
}
