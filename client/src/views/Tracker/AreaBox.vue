<template>
  <div class="area-box" :style="style">
    <div v-for="door in doors" :key="door.id" v-bind="door" />
    <div v-for="warp in warps" :key="warp.id" v-bind="warp" />
    <location-marker
      v-for="location in locations"
      :key="location.slug"
      :location="location"
      :style="getEntityStyle(location.x, location.y)"
      @click="$emit('click-location', location.slug)"
    />
    <area-svg :area="area" :extra_path="extra_path" />
  </div>
</template>

<script>
import { default_door_colors } from '@/data/old'
import AreaSvg from './AreaSvg.vue'
import LocationMarker from './LocationMarker.vue'

export default {
  components: { AreaSvg, LocationMarker },
  inject: ['json_data', 'tool_storage'],
  props: {
    area: Object,
    size: null,
    extra_path: Array,
  },
  emits: ['click-door', 'click-location', 'click-warp'],
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
      if (this.$store.layout.getWorld().hide_locations) {
        return []
      }
      const { split } = this.tool_storage.state
      let locations = this.area.locations
      if (['major', 'chozo', 'scavenger'].includes(split)) {
        locations = locations.filter((i) => i[split])
      }
      return locations
    },
    doors() {
      if (this.$store.layout.getWorld().hide_locations) {
        return []
      }
      return this.area.doors.map(({ slug, name, x, y, rotated }) => ({
        id: slug,
        title: name,
        class: [`area-door -${this.getDoorColor(slug)}`, rotated && '-rotated'],
        style: this.getEntityStyle(x, y),
        'data-type': 'door',
        'data-id': slug,
        onclick: () => this.$emit('click-door', slug),
      }))
    },
  },
  methods: {
    getEntityStyle(x, y) {
      return {
        left: `${100 * x}%`,
        top: `${100 * y}%`,
      }
    },
    getDoorColor(slug) {
      const json_door = this.json_data?.doors[slug]
      if (json_door) {
        return json_door[0]
      }
      return default_door_colors[slug]
    },
  },
}
</script>
