<template>
  <div v-if="randomizer.state.initialized">
    <objective-block v-if="!randomizer.state.readonly" />
    <teleport to="#areaLayoutStep .vue-app">
      <patch-toggler patch_group="areaLayout" />
    </teleport>
    <teleport to="#variaTweaksStep .vue-app">
      <patch-toggler patch_group="variaTweaks" />
    </teleport>
    <teleport to="#layoutPatchesStep .vue-app">
      <patch-toggler patch_group="layout" />
    </teleport>
    <div :key="randomizer.state.tour_hash" v-if="tour_visible">
      <teleport to="#tourPortal">
        <tour-app />
      </teleport>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import ObjectiveBlock from './ObjectiveBlock.vue'
import Randomizer from './Randomizer'
import TourApp from '@/components/TourApp'

export default {
  name: 'RandomizerView',
  components: { ObjectiveBlock, TourApp },
  __route: {
    path: '/randomizer',
  },
  provide() {
    return {
      randomizer: computed(() => this.randomizer),
    }
  },
  data() {
    return { randomizer: Randomizer(this) }
  },
  computed: {
    tour_visible() {
      // this hash provides a computed so this rerenders every time it mountHelp is run
      this.randomizer.state.tour_hash // eslint-disable-line
      return !!document.querySelector('#tourPortal')
    },
  },
}
</script>
