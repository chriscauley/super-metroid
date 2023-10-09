<template>
  <div class="vue-app">
    <patch-selector :patch_group="randomizer.state.tour_target" />
  </div>
</template>

<script>
import PatchSelector from './PatchSelector.vue'

export default {
  components: { PatchSelector },
  inject: ['randomizer'],
  mounted() {
    if (this.randomizer.state.tour_target !== 'variaTweaks') {
      const e = document.querySelector('.tour-tour')
      e.style.top = '2.5vh'
    }
  },
}
</script>
