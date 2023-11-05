<template>
  <div :class="config.class" :style="style" v-if="config.tagName">
    <button class="btn -primary help-anchor" id="helpItemTracker" @click="showHelp">
      <i class="fa fa-question-circle" />
    </button>
    <resize-box @update="resizeBox" v-if="edit_mode" />
    <component
      :is="config.tagName"
      :inventory="inventory"
      @toggle-item="(item) => $emit('toggle-item', item)"
      @add-item="(item, amount) => $emit('add-item', item, amount)"
      :controlled="controlled"
      :mode="config.mode"
      :objectives="json_data?.objectives?.goals"
      :objective_order="$store.seed.state.objective_order"
      :world="world"
    />
  </div>
</template>

<script>
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
    world() {
      return this.controlled ? 'varia' : undefined
    },
    edit_mode() {
      return true
    },
    config() {
      const { item_tracker } = this.tool_storage.state.tracker_settings
      if (!item_tracker) {
        return {}
      }
      return {
        tagName: item_tracker === 'pause-menu' ? 'sm-pause-tracker' : 'sm-grid-tracker',
        mode: item_tracker,
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
    showHelp() {
      window.startTheTour?.('helpItemTracker')
    },
  },
}
</script>
