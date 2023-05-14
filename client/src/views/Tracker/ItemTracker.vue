<template>
  <div :class="config.class" v-if="config.tagName" :style="style">
    <resize-box @update="resizeBox" v-if="edit_mode" />
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
  computed: {
    controlled() {
      const { json_data } = this
      return !json_data || json_data.seed !== 'seedless'
    },
    edit_mode() {
      return true
    },
    config() {
      const { item_tracker } = this.tool_storage.state.tracker_settings
      return {
        compact: item_tracker === 'compact',
        tagName: tagname_lookup[item_tracker],
        class: 'item-tracker__wrapper',
      }
    },
    style() {
      const { x, y, width } = this.$store.config.state['item-tracker'] || {}
      if (!width) {
        return {}
      }
      const columns = 5 + 2 * 0.2 + 4 * 0.1 // number of columns + padding + gap

      return {
        '--inventory-px': `${width / 256}px`,
        fontSize: `${width / columns}px`,
        left: `${x}px`,
        top: `${y}px`,
      }
    },
  },
  methods: {
    resizeBox(values) {
      this.$store.config.save({ 'item-tracker': values })
    },
  },
}
</script>
