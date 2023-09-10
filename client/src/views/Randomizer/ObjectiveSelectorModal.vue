<template>
  <div>
    <div class="modal-backdrop fade in" />
    <div class="modal fade in -objective-selector" @click="$emit('close')">
      <div class="modal-dialog">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Select Objectives</h3>
            <div class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
              <span aria-hidden="true">×</span>
            </div>
          </div>
          <div class="modal-body">
            <objective-selector />
          </div>
          <div class="modal-footer">
            <div v-if="warning" class="alert alert-warning" role="alert">
              {{ warning }}
            </div>
            <span> {{ count_display }} Selected</span>
            <button type="button" class="btn btn-primary" @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObjectiveSelector from '@/components/ObjectiveSelector.vue'

export default {
  components: { ObjectiveSelector },
  inject: ['randomizer'],
  emits: ['close'],
  computed: {
    count_display() {
      const max_objectives = this.randomizer.objective.getMax()
      const count = this.randomizer.state.objective.length
      if (max_objectives === Infinity) {
        return count
      }
      return `${count} / ${max_objectives}`
    },
    warning() {
      const max_objectives = this.randomizer.objective.getMax()
      if (max_objectives > this.randomizer.state.objective.length) {
        return ''
      }
      return 'You cannot add any more objectives for this splits mode'
    },
  },
}
</script>
