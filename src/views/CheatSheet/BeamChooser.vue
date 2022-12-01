<template>
  <div class="beam-chooser">
    <div class="btn-group">
      <div v-for="beam in beams" :key="beam.slug" :class="beam.class" @click="toggle(beam.slug)">
        {{ beam.name }}
      </div>
    </div>
    <div class="result">
      {{ damage }}
    </div>
  </div>
</template>

<script>
import { startCase } from 'lodash'

import { beams } from '@/data/old'

const damages = {
  '': 20,
  ice: 30,
  spazer: 40,
  wave: 50,
  plasma: 150,
  'ice-spazer': 60,
  'ice-wave': 60,
  'wave-spazer': 70,
  'ice-wave-spazer': 100,
  'ice-plasma': 200,
  'wave-plasma': 250,
  'ice-wave-plasma': 300,
}

Object.keys(damages).forEach((key) => {
  const prefix = key ? 'charge-' : 'charge'
  damages[prefix + key] = damages[key] * 3
})

const slugs = beams.map((b) => b.replace('-beam', ''))

export default {
  data() {
    return { selected: { charge: true } }
  },
  computed: {
    beams() {
      return slugs.map((slug) => ({
        slug,
        name: startCase(slug),
        class: ['btn', this.selected[slug] ? '-primary' : '-secondary'],
      }))
    },
    damage() {
      const key = slugs.filter((slug) => this.selected[slug]).join('-')
      return damages[key]
    },
  },
  methods: {
    toggle(beam) {
      const { selected } = this
      if (beam === 'plasma' && selected.spazer) {
        selected.spazer = false
      } else if (beam === 'spazer' && selected.plasma) {
        selected.plasma = false
      }
      selected[beam] = !selected[beam]
    },
  },
}
</script>
