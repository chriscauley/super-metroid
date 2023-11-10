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
      :width="$store.config.state['item-tracker']?.width"
    />
  </div>
  <teleport to="body">
    <unrest-modal v-if="editor_open" @close="editor_open = false">
      <p>
        You can override objectives in the tracker by selecting them below. If no objectives are
        selected, the tracker will default to the seed used to initialize the tracker.
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
import { remove } from 'lodash'

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
      const { objective_overrides, completed_overrides = [] } = this.$store.seed.state
      if (objective_overrides?.length > 0) {
        return Object.fromEntries(
          objective_overrides.map((o) => [o, completed_overrides.includes(o)]),
        )
      }
      const objectives = { ...this.json_data?.objectives?.goals }
      if (!Object.values(objectives).find(Boolean)) {
        Object.keys(objectives).forEach((o) => (objectives[o] = completed_overrides.includes(o)))
      }
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
      const { x, y } = this.$store.config.state['item-tracker'] || {}
      if (x === undefined) {
        return {}
      }

      return {
        left: `${x}px`,
        top: `${y}px`,
      }
    },
    categories() {
      const { completed_overrides = [] } = this.$store.seed.state
      return Object.entries(varia.objective.by_category).map(([id, objectives]) => ({
        id,
        objectives: objectives.map((o) => ({
          ...o,
          selected: completed_overrides.includes(o.id),
        })),
      }))
    },
  },
  methods: {
    resetObjectives() {
      this.$store.seed.save({
        objective_overrides: [],
        completed_overrides: [],
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
      const { objectives } = this
      const { completed_overrides = [], objective_order = [] } = this.$store.seed.state

      if (objectives[o_id]) {
        const removeIt = (array) => remove(array, (value) => value === o_id)
        removeIt(completed_overrides)
        removeIt(objective_order)
      } else {
        objective_order.push(o_id)
        completed_overrides.push(o_id)
      }

      this.$store.seed.save({ objective_order, completed_overrides })
    },
    toggleSelectedObjective(o_id) {
      const { objective_overrides = [] } = this.$store.seed.state
      if (objective_overrides.includes(o_id)) {
        const removeIt = (array) => remove(array, (value) => value === o_id)
        removeIt(objective_overrides)
      } else {
        // only adds to this one
        objective_overrides.push(o_id)
        this.$store.seed.save({ objective_overrides })
      }
    },
  },
}
</script>
