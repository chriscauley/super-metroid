<template>
  <component
    :is="tagName"
    :inventory="inventory"
    :controlled="controlled"
    :compact="compact || format === 'compact'"
    :style="style"
    @add-item="(item, amount) => !controlled && $emit('add-item', item, amount)"
    @toggle-item="(item) => !controlled && $emit('toggle-item', item)"
  />
</template>

<script>
import GridTracker from './GridTracker.vue'
import PauseInventory from './PauseInventory.vue'

const tagname_lookup = {
  grid: GridTracker,
  compact: GridTracker,
  pause: PauseInventory,
}

export default {
  name: 'ItemTracker',
  props: {
    inventory: Object,
    controlled: Boolean,
    compact: Boolean,
    format: String,
    width: Number,
  },
  emits: ['add-item', 'toggle-item'],
  computed: {
    tagName() {
      return tagname_lookup[this.format]
    },
    style() {
      const { width } = this
      if (!width) {
        return {}
      }
      const columns = 5 + 2 * 0.2 + 4 * 0.1 // number of columns + padding + gap

      return {
        '--inventory-px': `${width / 256}px`,
        fontSize: `${width / columns}px`,
      }
    },
  },
}
</script>
