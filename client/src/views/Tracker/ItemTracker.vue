<template>
  <div :class="config.class" :style="style" v-if="config.tagName">
    <div class="hover-buttons" v-if="!$route.path.includes('plando')">
      <button
        class="btn -primary"
        @click="editor_open = true"
        v-if="config.tagName !== 'sm-pause-tracker'"
      >
        <i class="fa fa-edit" />
      </button>
      <button class="btn -primary" id="helpItemTracker" @click="showHelp">
        <i class="fa fa-question-circle" />
      </button>
    </div>
    <resize-box @update="resizeBox" title="Item Tracker" />
    <component
      :is="config.tagName"
      :inventory="inventory"
      @toggle-item="(item) => $emit('toggle-item', item)"
      @add-item="(item, amount) => $emit('add-item', item, amount)"
      @toggle-objective="toggleObjective"
      :controlled="controlled"
      :mode="config.mode"
      :objectives="objectives"
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
      <sm-objective-selector :categories="categories" @toggle-objective="toggleSelectedObjective" />
      <template #actions>
        <button class="btn -danger" @click="resetObjectives">Reset Objectives</button>
        <div class="flex-grow" />
        <button class="btn -secondary" @click="editor_open = false">Close</button>
      </template>
    </unrest-modal>
  </teleport>
</template>

<script>
import { varia } from 'sm-data'
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
      if (this.json_data?.objectivesHidden) {
        // TODO need a better way to signal objectives hidden
        return {}
      }
      const objectives = { ...this.json_data?.objectives?.goals }
      if (!Object.values(objectives).find(Boolean)) {
        Object.keys(objectives).forEach((o) => (objectives[o] = completed_overrides.includes(o)))
      }
      return objectives
    },
    controlled() {
      const { json_data } = this
      return !json_data || json_data.seed !== 'seedless' || window.autoTrackInProgress
    },
    world() {
      return this.json_data ? 'varia' : undefined
    },
    config() {
      const { tracker_mode } = this.tool_storage.state.tracker_settings
      if (!tracker_mode) {
        return {}
      }
      return {
        tagName: tracker_mode === 'pause-menu' ? 'sm-pause-tracker' : 'sm-grid-tracker',
        mode: tracker_mode,
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
      const { objective_overrides = [] } = this.$store.seed.state
      return Object.entries(varia.objective.by_category).map(([id, objectives]) => ({
        id,
        objectives: objectives.map((o) => ({
          ...o,
          selected: objective_overrides.includes(o.id),
        })),
      }))
    },
  },
  methods: {
    resetObjectives() {
      this.$store.seed.save({
        objective_overrides: [],
        completed_overrides: [],
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
      const { completed_overrides = [] } = this.$store.seed.state

      if (objectives[o_id]) {
        const removeIt = (array) => remove(array, (value) => value === o_id)
        removeIt(completed_overrides)
      } else {
        completed_overrides.push(o_id)
      }

      this.$store.seed.save({ completed_overrides })
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
