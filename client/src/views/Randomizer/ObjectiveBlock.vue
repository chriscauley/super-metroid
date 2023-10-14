<template>
  <teleport to="#objectivePortal">
    <bootstrap-modal v-if="open" title="Select Objectives" @close="open = false">
      <objective-selector />
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
      <i v-if="objective_buttons.length === 0">None</i>
      <div v-if="!randomizer.state.readonly" class="faux-link">edit</div>
    </div>
    <input type="hidden" :value="randomizer.state.objective" id="objectiveMultiSelect" />
  </teleport>
</template>

<script>
const cat_map = {
  Bosses: 'danger',
  Minibosses: 'warning',
  Items: 'primary',
  Map: 'success',
  Memes: 'info',
}

export default {
  inject: ['randomizer'],
  data() {
    return { open: false }
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
}
</script>
