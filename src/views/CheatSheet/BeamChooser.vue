<template>
  <div class="beam-chooser">
    <div class="btn-group">
      <div v-for="beam in beams" :key="beam.slug" :class="beam.class" @click="beam.toggle">
        {{ beam.name }}
      </div>
    </div>
    <div class="result">
      {{ storage.getDamage() }}
    </div>
  </div>
</template>

<script>
import { startCase } from 'lodash'

export default {
  props: {
    storage: Object,
  },
  computed: {
    beams() {
      const { state, beam_slugs } = this.storage
      return beam_slugs.map((slug) => ({
        slug,
        name: startCase(slug),
        class: ['btn', state.selected[slug] ? '-primary' : '-secondary'],
        toggle: () => this.storage.toggleBeam(slug),
      }))
    },
  },
}
</script>
