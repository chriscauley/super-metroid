<template>
  <teleport to="#objectivePortal">
    <bootstrap-modal v-if="open" title="Select Objectives" @close="open = false">
      <objective-selector
        :categories="randomizer.objective.getCategories()"
        :is_random="randomizer.isRandom('objective')"
        @toggle-category="randomizer.objective.toggleCategory"
        @toggle-objective="randomizer.objective.toggle"
      />
      <template #footer>
        <div v-if="warning" class="alert alert-warning" role="alert">
          {{ warning }}
        </div>
        <span class="modal-footer__text">{{ count_display }} Selected</span>
      </template>
    </bootstrap-modal>
    <div @click="open = true" class="button-list">
      <div v-for="button in objective_buttons" :key="button.text" :class="button.class">
        {{ button.text }}
      </div>
      <i v-if="objective_buttons.length === 0">{none_text}</i>
      <div v-if="!randomizer.state.readonly" class="faux-link">edit</div>
    </div>
    <input type="hidden" :value="randomizer.state.objective" id="objectiveMultiSelect" />
  </teleport>
</template>

<script>
import { varia } from 'sm-data'

const cat_map = {
  bosses: 'danger',
  minibosses: 'warning',
  items: 'primary',
  map: 'success',
  memes: 'info',
}

export default {
  inject: ['randomizer'],
  data() {
    return { open: false }
  },
  computed: {
    count_display() {
      const max = this.randomizer.objective.getMax()
      const selected = this.randomizer.state.objective.length
      return max === Infinity ? selected : `${selected} / ${max}`
    },
    none_text() {
      const { readonly, hiddenObjectives } = this.randomizer.state
      if (readonly && hiddenObjectives) {
        return 'Objectives are initially hidden. Visit the pause screen for more info.'
      }
      return 'None'
    },
    objective_buttons() {
      const { readonly, hiddenObjectives } = this.randomizer.state
      if (readonly && hiddenObjectives === 'on') {
        return []
      }
      const _order = Object.keys(cat_map)
      return this.randomizer.state.objective.map((o_id) => {
        const objective = varia.objective.by_id[o_id]
        return {
          text: o_id,
          class: `btn btn-${cat_map[objective.category]} btn-xs`,
        }
      })
    },
  },
}
</script>
