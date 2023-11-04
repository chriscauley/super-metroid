<template>
  <div v-if="tagName" :key="hash">
    <teleport to="#tourPortal">
      <div class="vue-app">
        <component :is="attrs.tagName" v-bind="attrs" />
      </div>
    </teleport>
  </div>
</template>

<script>
import PatchSelector from './PatchSelector.vue'

export default {
  components: { PatchSelector },
  inject: ['randomizer'],
  data() {
    return { hash: Math.random(), attrs: null, tagName: null }
  },
  mounted() {
    window.updateTourPortal = this.updateTourPortal
  },
  methods: {
    updateTourPortal() {
      const e = document.querySelector('#tourPortal')
      // resetting the hash casuses the whole element to re-render
      // this is necessary because the tour often clears it's html
      this.hash = Math.random()
      if (e === null) {
        return null
      }
      const { tagName, patch_group } = e.dataset
      this.tagName = tagName
      this.attrs = { tagName, patch_group }
      if (['areaLayout', 'layout'].includes(patch_group)) {
        const e = document.querySelector('.tour-tour')
        // these two are very tall and don't line up properly after content is injected
        e.style.top = '2.5vh'
      }
    },
  },
}
</script>
