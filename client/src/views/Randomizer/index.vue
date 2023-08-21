<template>
  <div>
    <objective-selector-modal v-if="open" />
  </div>
</template>

<script>
import ObjectiveSelectorModal from './ObjectiveSelectorModal.vue'

export default {
  name: 'RandomizerView',
  components: { ObjectiveSelectorModal },
  __route: {
    path: '/randomizer',
  },
  data() {
    return { open: false }
  },
  mounted() {},
}
</script>
