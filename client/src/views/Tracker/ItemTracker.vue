<template>
  <div :class="config.class" v-if="config.tagName">
    <unrest-toolbar :storage="storage" class="item-tracker__toolbar" />
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
import toolbar from '@unrest/vue-toolbar'

const LS_KEY = 'TRACKER_INVENTORY_v2'
const initial = {
  size: 'medium',
  position: 'auto',
}

const POSITIONS = ['auto', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
const SIZES = ['smallest', 'small', 'medium', 'large', 'larger', 'largest']

const tagname_lookup = {
  compact: 'grid-tracker',
  grid: 'grid-tracker',
  'pause-menu': 'pause-inventory',
}

export default {
  inject: ['tool_storage', 'json_data'],
  props: {
    inventory: Object,
  },
  emits: ['add-item', 'toggle-item'],
  data() {
    const { getTools } = this
    const storage = toolbar.ToolStorage(LS_KEY, { tools: getTools, initial })
    return { storage }
  },
  computed: {
    controlled() {
      const { json_data } = this
      return !json_data || json_data.seed !== 'seedless'
    },
    config() {
      const { item_tracker } = this.tool_storage.state.tracker_settings
      let { size, position } = this.storage.state
      if (position === 'auto') {
        if (this.tool_storage.getRandoSettings().logic === 'mirror') {
          position = 'top-right'
        } else {
          position = 'top-left'
        }
      }
      const [a, b] = position.split('-')
      document.body.dataset.itemTrackerPosition = position
      return {
        compact: item_tracker === 'compact',
        tagName: tagname_lookup[item_tracker],
        class: `item-tracker__wrapper -${size} -${a} -${b}`,
      }
    },
  },
  methods: {
    getTools() {
      return [
        {
          slug: 'position',
          icon: 'fa fa-th-large',
          items: POSITIONS.map((item) => ({
            text: item,
            click: () => this.storage.save({ position: item }),
          })),
        },
        {
          slug: 'size',
          icon: 'fa fa-arrows',
          items: SIZES.map((item) => ({
            text: item,
            click: () => this.storage.save({ size: item }),
          })),
        },
      ]
    },
  },
}
</script>
