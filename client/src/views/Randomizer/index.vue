<template>
  <div>
    <objective-block />
    <teleport to="#areaLayoutStep .vue-app">
      <patch-toggler patch_group="areaLayout" />
    </teleport>
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
