<template>
  <div>
    <objective-selector-modal v-if="open" @close="open = false" />
    <teleport to="#objectivePortal">
      <div @click="open = true" class="selected-objectives">
        <div v-for="button in objective_buttons" :key="button.text" :class="button.class">
          {{ button.text }}
        </div>
        <i v-if="objective_buttons.length === 0">None</i>
      </div>
      <input type="hidden" :value="randomizer.state.objective" id="objectiveMultiSelect" />
    </teleport>
  </div>
</template>

<script>
import { computed } from 'vue'

import Randomizer from './Randomizer'
import ObjectiveSelectorModal from './ObjectiveSelectorModal.vue'

const cat_map = {
  Bosses: 'danger',
  Minibosses: 'warning',
  Items: 'primary',
  Map: 'success',
  Memes: 'info',
}
const css = {
  btn: (o, c) => `btn btn-xs btn-${cat_map[c.name]}`,
}

export default {
  name: 'RandomizerView',
  components: { ObjectiveSelectorModal },
  __route: {
    path: '/randomizer',
  },
  provide() {
    return {
      randomizer: computed(() => this.randomizer),
    }
  },
  data() {
    return { open: false, css, randomizer: Randomizer(this) }
  },
  computed: {
    objective_buttons() {
      const _order = Object.keys(cat_map)
      return this.randomizer.state.objective.map((o) => ({
        text: o,
        class: `btn btn-${cat_map[window.objectives_categories[o]]} btn-xs`,
      }))
    },
  },
  mounted() {},
}
</script>
