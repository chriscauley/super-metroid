<template>
  <div>
    <PatchSelector :patch_group="$randomizer.state.tour_target" />
  </div>
</template>

<script>
import PatchSelector from './PatchSelector.vue'

export default {
  components: { PatchSelector },
  provide() {
    return {
      // This is abit hacky because it is a separate app
      randomizer: this.$randomizer,
    }
  },
}
</script>