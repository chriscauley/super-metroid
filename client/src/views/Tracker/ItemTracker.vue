<template>
  <div class="item-tracker__wrapper" v-if="config.tagName">
    <div class="item-tracker__toolbar"></div>
    <component
      :is="config.tagName"
      :inventory="inventory"
      @toggle-item="(item) => $emit('toggle-item', item)"
      @add-item="(item, amount) => $emit('add-item', item, amount)"
      :controlled="controlled"
      :compact="config.compact"
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
  inject: ['tool_storage', 'json_data'],
  props: {
    inventory: Object,
  },
  emits: ['add-item', 'toggle-item'],
  computed: {
    controlled() {
      const { json_data } = this
      return !json_data || json_data.seed !== 'seedless'
    },
    config() {
      const { item_tracker } = this.tool_storage.state.tracker_settings
      return {
        compact: item_tracker === 'compact',
        tagName: tagname_lookup[item_tracker],
      }
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