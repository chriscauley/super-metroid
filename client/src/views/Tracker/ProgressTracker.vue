<template>
  <div class="progress-tracker" :style="style" v-if="show">
    <div v-for="(difficulty, item) in items" :key="item" class="progress-tracker__item">
      <i :class="`sm-item -${item} smva-difficulty -difficulty-${difficulty}`" />
    </div>
  </div>
</template>

<script>
import { varia } from 'sm-data'

export default {
  inject: ['tool_storage', 'json_data'],
  computed: {
    style() {
      return {
        bottom: 0,
        right: 0,
      }
    },
    show() {
      return this.tool_storage.state.tracker_settings.progress_tracker
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
