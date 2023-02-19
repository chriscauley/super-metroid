<template>
  <div class="golden-four" v-if="json_data">
    <img src="/solver/static/images/tracker/G4/golden_four.png" class="golden-four__bg" />
    <img v-for="statue in statues" :key="statue.class" v-bind="statue" />
  </div>
</template>

<script>
import { startCase } from 'lodash'

export default {
  inject: ['json_data'],
  computed: {
    statues() {
      const names = ['kraid', 'phantoon', 'draygon', 'ridley']
      return names
        .filter((n) => this.json_data.visitedLocations[startCase(n)])
        .map((n) => ({
          class: `golden-four__${n}`,
          src: `/solver/static/images/tracker/G4/${n}.png`,
        }))
    },
  },
}
</script>
