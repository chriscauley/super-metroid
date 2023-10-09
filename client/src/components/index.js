import BootstrapModal from './BootstrapModal.vue'
import DoorPicker from './DoorPicker.vue'
import ItemPicker from './ItemPicker.vue'
import ItemTracker from './ItemTracker'
import ObjectiveSelector from './ObjectiveSelector'
import PatchButton from './PatchButton'
import PatchSelector from './PatchSelector'
import PatchToggler from './PatchToggler'
import ResizeBox from './ResizeBox'

export default {
  BootstrapModal,
  DoorPicker,
  ItemPicker,
  ObjectiveSelector,
  PatchButton,
  PatchSelector,
  PatchToggler,
  ResizeBox,
  ...ItemTracker.components,
}
