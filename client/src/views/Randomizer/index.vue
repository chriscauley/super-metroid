<template>
  <div v-if="randomizer.state.initialized">
    <objective-block />
    <teleport to="#areaLayoutStep .vue-app">
      <patch-toggler patch_group="areaLayout" />
    </teleport>
    <teleport to="#variaTweaksStep .vue-app">
      <patch-toggler patch_group="variaTweaks" />
    </teleport>
    <teleport to="#layoutPatchesStep .vue-app">
      <patch-toggler patch_group="layout" />
    </teleport>
    <tour-portal />
  </div>
</template>

<script>
import { computed } from 'vue'

import ObjectiveBlock from './ObjectiveBlock.vue'
import Randomizer from './Randomizer'

export default {
  name: 'RandomizerView',
  components: { ObjectiveBlock },
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
}
</script>
