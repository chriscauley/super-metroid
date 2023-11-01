<template>
  <div class="sm-cwisp">
    <div
      v-for="beam in beams"
      :class="beam.class"
      @click="$emit('toggle-item', beam.id)"
      :key="beam.id"
    />
  </div>
</template>

<script>
const BEAMS = ['charge-beam', 'wave-beam', 'ice-beam', 'spazer-beam', 'plasma-beam']

export default {
  props: {
    inventory: Object,
  },
  emits: ['toggle-item'],
  computed: {
    beams() {
      return BEAMS.map((id) => ({
        id,
        class: [`sm-cwisp__cell -${id}`, this.inventory[id] ? '-active' : '-inactive'],
      }))
    },
  },
}
</script>
