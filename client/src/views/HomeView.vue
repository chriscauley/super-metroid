<template>
  <div>
    <objective-tracker
      :objectives="objectives"
      :completed="completed"
      @check="check"
      @set-objectives="(o) => (objectives = o)"
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
    check(objective) {
      this.completed[objective] = !this.completed[objective]
    },
  },
}
</script>
