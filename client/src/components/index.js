import DoorPicker from './DoorPicker.vue'
import ItemPicker from './ItemPicker.vue'
import ItemTracker from './ItemTracker'

export default {
  DoorPicker,
  ItemPicker,
  ...ItemTracker.components,
}
