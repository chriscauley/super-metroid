import DoorPicker from './DoorPicker.vue'
import ItemPopup from './ItemPopup.vue'
import ItemTracker from './ItemTracker'

export default {
  DoorPicker,
  ItemPopup,
  ...ItemTracker.components,
}
