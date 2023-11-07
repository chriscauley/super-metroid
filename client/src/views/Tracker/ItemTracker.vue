<template>
  <div :class="config.class" :style="style" v-if="config.tagName">
    <div class="hover-buttons">
      <button class="btn -primary" @click="editor_open = true">
        <i class="fa fa-edit" />
      </button>
      <button class="btn -primary" id="helpItemTracker" @click="showHelp">
        <i class="fa fa-question-circle" />
      </button>
    </div>
    <resize-box @update="resizeBox" />
    <component
      :is="config.tagName"
      :inventory="inventory"
      @toggle-item="(item) => $emit('toggle-item', item)"
      @add-item="(item, amount) => $emit('add-item', item, amount)"
      @toggle-objective="toggleObjective"
      :controlled="controlled"
      :mode="config.mode"
      :objectives="objectives"
      :objective_order="$store.seed.state.objective_order"
      :world="world"
      :class="tool_storage.state.tracker_settings.tracker_grid ? '' : '-no-grid'"
    />
  </div>
  <teleport to="body">
    <unrest-modal v-if="editor_open" @close="editor_open = false">
      <p>
        You can override objectives in the tracker by selecting them below. If no objectives are selected, the tracker will default to the seed used to initialize the tracker.
      </p>
      <objective-selector :categories="categories" @toggle-objective="toggleSelectedObjective" />
      <template #actions>
        <button class="btn -danger" @click="resetObjectives">Reset Objectives</button>
        <div class="flex-grow" />
        <button class="btn -secondary" @click="editor_open = false">Close</button>
      </template>
    </unrest-modal>
  </teleport>
</template>

<script>
import varia from '@/varia'

export default {
  inject: ['tool_storage', 'json_data'],
  props: {
    inventory: Object,
  },
  emits: ['add-item', 'toggle-item'],
  data() {
    return { editor_open: false }
  },
  computed: {
    objectives() {
      const { objective_overrides } = this.$store.seed.state
      if (objective_overrides) {
        return objective_overrides
      }
      const objectives = {...this.json_data?.objectives?.goals}
      return objectives
    },
    controlled() {
      const { json_data } = this
      return !json_data || json_data.seed !== 'seedless'
    },
    world() {
      return this.json_data ? 'varia' : undefined
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
    categories() {
      const { objective_overrides = {} } = this.$store.seed.state
      return Object.entries(varia.objective.by_category).map(([id, objectives]) => ({
        id,
        objectives: objectives.map((o) => ({
          ...o,
          selected: objective_overrides?.[o.id] !== undefined,
        })),
      }))
    },
  },
  methods: {
    resetObjectives() {
      this.$store.seed.save({
        objective_overrides: null,
        objective_order: [],
      })
    },
    resizeBox(values) {
      this.$store.config.save({ 'item-tracker': values })
    },
    showHelp() {
      window.startTheTour?.('helpItemTracker')
    },
    toggleObjective(o_id) {
      const { objective_overrides } = this.$store.seed.state
      let { objective_order = [] } = this.$store.seed.state

      if (objective_overrides[o_id]) {
        objective_order = objective_order.filter((o) => o !== o_id)
      } else {
        objective_order.push(o_id)
      }

      if (objective_overrides) {
        objective_overrides[o_id] = !objective_overrides[o_id]
      }
      this.$store.seed.save({ objective_overrides, objective_order })
    },
    toggleSelectedObjective(o_id) {
      let objective_overrides = this.$store.seed.state.objective_overrides || {}
      if (objective_overrides[o_id] !== undefined) {
        delete objective_overrides[o_id]
      } else {
        objective_overrides[o_id] = false
      }
      if (Object.keys(objective_overrides).length === 0) {
        // no objective overrides, use seed objectives instead
        objective_overrides = null
      }
      this.$store.seed.save({ objective_overrides, objective_order: [] })
    },
  },
}
</script>
