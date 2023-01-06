<template>
  <div class="area-box" :style="style">
    <div v-for="warp in warps" :key="warp.id" v-bind="warp" />
    <location-marker
      v-for="location in locations"
      :key="location.slug"
      :location="location"
      :style="getEntityStyle(location.x, location.y)"
      @click="$emit('click-location', location.slug)"
    />
  </div>
</template>

<script>
import LocationMarker from './LocationMarker.vue'

export default {
  components: { LocationMarker },
  inject: ['tool_storage'],
  props: {
    area: Object,
    hide: Array,
    size: null,
  },
  emits: ['click-location', 'click-warp'],
  computed: {
    root() {
      return this.$store.layout.getWorld().root
    },
    style() {
      if (this.size) {
        return { width: this.size, height: this.size }
      }
      const { scale } = this.root
      return {
        height: scale + 'px',
        width: scale + 'px',
      }
    },
    warps() {
      const { selected_warp } = this.tool_storage.state
      return this.area.warps.map(({ slug, name, x, y, type, rotated }) => ({
        id: slug,
        title: name,
        class: [`area-warp -${type}`, rotated && '-rotated', selected_warp === slug && '-selected'],
        style: this.getEntityStyle(x, y),
        'data-type': 'warp',
        'data-id': slug,
        onclick: () => this.$emit('click-warp', slug),
      }))
    },
    locations() {
      if (this.hide?.includes('locations')) {
        return []
      }
      const { split } = this.tool_storage.state
      let locations = this.area.locations
      if (['major', 'chozo', 'scavenger'].includes(split)) {
        locations = locations.filter((i) => i[split])
      }
      return locations
    },
  },
  methods: {
    getEntityStyle(x, y) {
      return {
        left: `${100 * x}%`,
        top: `${100 * y}%`,
      }
    },
  },
}
</script>
