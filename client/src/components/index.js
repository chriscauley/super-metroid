import BootstrapModal from './BootstrapModal.vue'
import DoorPicker from './DoorPicker.vue'
import ItemPicker from './ItemPicker.vue'
import ItemTracker from './ItemTracker'
import ObjectiveSelector from './ObjectiveSelector'
import ResizeBox from './ResizeBox'

export default {
  BootstrapModal,
  DoorPicker,
  ItemPicker,
  ObjectiveSelector,
  ResizeBox,
  ...ItemTracker.components,
}
