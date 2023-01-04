<template>
  <div class="item-tracker__wrapper" v-if="tagName">
    <div class="item-tracker__toolbar"></div>
    <component
      :is="tagName"
      :inventory="inventory"
      @toggle-item="(item) => $emit('toggle-item', item)"
      @add-item="(item, amount) => $emit('add-item', item, amount)"
      :controlled="state.controlled"
      :compact="compact"
    />
  </div>
</template>

<script>
import { clamp } from 'lodash'

import { ReactiveLocalStorage } from '@unrest/vue-storage'

const LS_KEY = 'TRACKER_INVENTORY'
const initial = {
  size: 448, // 64 * 7 (columns + gap + padding of default size)
  x: 0,
  y: 0,
}

const tagname_lookup = {
  compact: 'grid-tracker',
  grid: 'grid-tracker',
  'pause-menu': 'pause-inventory',
}

const storage = ReactiveLocalStorage({ LS_KEY, initial })

export default {
  props: {
    inventory: Object,
    tool_storage: Object,
  },
  emits: ['add-item', 'toggle-item'],
  data() {
    const state = { controlled: false }
    return { state }
  },
  computed: {
    compact() {
      return this.tool_storage.state.item_tracker === 'compact'
    },
    tagName() {
      return tagname_lookup[this.tool_storage.state.item_tracker]
    },
    style() {
      const { size, x, y } = storage.state
      const left = clamp(x, 0, window.innerWidth - size)
      const top = clamp(y, 0, window.innerHeight - size)
      return {
        'font-size': `${size / 7}px`,
        top: `${top}px`,
        left: `${left}px`,
      }
    },
  },
}
</script>
