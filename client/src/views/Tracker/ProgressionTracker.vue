<template>
  <div
    class="progression-tracker"
    v-if="show"
    :style="$store.config.getPosition('progression-tracker')"
  >
    <resize-box @update="(values) => $store.config.save({ 'progression-tracker': values })" />
    <div v-for="(difficulty, item) in items" :key="item" class="progression-tracker__item">
      <i :class="`sm-item -${item} smva-difficulty -difficulty-${difficulty}`" />
    </div>
  </div>
</template>

<script>
import { varia } from 'sm-data'

export default {
  inject: ['tool_storage', 'json_data'],
  computed: {
    show() {
      return this.tool_storage.state.tracker_settings.progression_tracker
    },
    items() {
      const out = {}
      Object.values(this.json_data?.visitedLocations || {}).forEach(({ difficulty, item }) => {
        const slug = varia.variaToSm(item)
        if (!out[slug]) {
          out[slug] = difficulty[0]
        }
      })
      return out
    },
  },
}
</script>
