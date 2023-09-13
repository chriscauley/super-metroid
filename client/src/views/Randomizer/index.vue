<template>
  <div>
    <objective-block />
    <teleport to="#areaLayoutPatchesPortal">
      <div @click="open = true" class="button-list">
        <div v-for="button in patch_buttons" :key="button.text" :class="button.class">
          {{ button.text }}
        </div>
        <i v-if="patch_buttons.length === 0">None</i>
      </div>
      <input
        type="hidden"
        :value="randomizer.state.areaLayoutCustom"
        id="areaLayoutCustomMultiSelect"
      />
    </teleport>
  </div>
</template>

<script>
import { computed } from 'vue'

import Randomizer from './Randomizer'
import ObjectiveBlock from './ObjectiveBlock.vue'

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
  computed: {
    patch_buttons() {
      const patches = this.randomizer.getAreaPatches()
      if (!patches.find((p) => p.active)) {
        return []
      }
      return patches.map((patch) => ({
        ...patch,
        text: `${patch.active ? '+' : '-'} ${patch.title}`,
        class: [`btn btn-xs btn-${patch.active ? 'primary' : 'default'}`],
      }))
    },
  },
  mounted() {},
}
</script>
