<template>
  <div>
    <objective-tracker
      :objectives="objectives"
      :completed="completed"
      @toggle="toggle"
      @add="add"
      @rm="rm"
    />
  </div>
</template>

<script>
import ObjectiveTracker from '@/components/ObjectiveTracker.vue'
export default {
  components: { ObjectiveTracker },
  data() {
    return { objectives: [], completed: {} }
  },
  methods: {
    toggle(i) {
      console.warn('TODO toggling', i)
    },
    add(objective) {
      this.objectives.push(objective)
    },
    rm(objective) {
      console.warn('TODO removing', objective)
    },
  },
}
</script>
