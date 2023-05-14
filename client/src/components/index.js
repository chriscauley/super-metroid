import DoorPicker from './DoorPicker.vue'
import ItemPicker from './ItemPicker.vue'
import ItemTracker from './ItemTracker'
import ResizeBox from './ResizeBox'

export default {
  DoorPicker,
  ItemPicker,
  ResizeBox,
  ...ItemTracker.components,
}
