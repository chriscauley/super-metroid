<template>
  <div class="area-box" :style="style">
    <div v-for="door in doors" :key="door.id" v-bind="door">
      <door-picker v-if="door.active" :current_color="getDoorColor(door.id)" :door_id="door.id" />
    </div>
    <div
      v-for="warp in warps"
      :key="warp.id"
      v-bind="warp"
      @mouseover="hover(warp)"
      @mouseout="blur"
    />
    <location-marker
      v-for="location in locations"
      :key="location.slug"
      :location="location"
      :style="getEntityStyle(location.x, location.y)"
      @click="$emit('click-location', location.slug)"
    />
    <area-svg :area="area" :extra_path="extra_path" />
    <div v-for="item in misc_items" :key="item.id" v-bind="item" />
  </div>
</template>

<script>
import AreaSvg from './AreaSvg.vue'
import LocationMarker from './LocationMarker.vue'
import { getWarpColor } from './WarpConnections.vue'

export default {
  components: { AreaSvg, LocationMarker },
  inject: ['json_data', 'tool_storage', 'game_state', 'compact_settings'],
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
    misc_items() {
      if (!this.json_data) {
        return []
      }
      const out = []
      const { lastAP, availableLocations } = this.json_data
      const hover_location = this.$store.ui.state.hover_location
      const path = availableLocations[hover_location]?.path
      const getClass = (slug) => {
        const index = path?.indexOf(slug)
        if (index > -1) {
          return `area-box__gps smv-gps-number -number-${index + 1} -visible`
        }
        return [`area-box__gps smv-gps`, lastAP === slug && '-visible']
      }
      this.area.gpss?.forEach(({ slug, x, y, name }) => {
        out.push({
          id: `gps__${slug}`,
          style: this.getEntityStyle(x, y),
          title: name,
          class: getClass(slug),
          'data-id': slug,
          'data-type': 'gps',
        })
      })
      return out
    },
    warps() {
      const { selected_warp } = this.tool_storage.state
      const warp_colors = {}
      this.area.warps.forEach(({ slug }) => {
        const warp2 = this.game_state.warps[slug] || ''
        warp_colors[slug] = getWarpColor(slug, warp2, 0, true)
      })
      return this.area.warps.map(({ slug, name, x, y, type, rotated }) => ({
        id: slug,
        title: name,
        class: [
          `area-warp -${type} -color-${warp_colors[slug].replace('#', '')}`,
          rotated && '-rotated',
          selected_warp === slug && '-selected',
          this.compact_settings[type] && '-compact',
        ],
        style: this.getEntityStyle(x, y),
        'data-type': 'warp',
        'data-id': slug,
        onclick: () => this.$emit('click-warp', slug),
      }))
    },
    locations() {
      return this.tool_storage.filterVisibleLocations(this.area.locations)
    },
    doors() {
      if (this.$store.layout.getWorld().hide_locations) {
        return []
      }
      return this.area.doors.map(({ slug, name, x, y, rotated }) => {
        const active = slug === this.tool_storage.state.active_door
        if (this.compact_settings.area && slug === 'LeCoudeBottom') {
          // in compact mode this needs to be moved up to wrecked ship
          y -= 7
        }
        return {
          id: slug,
          title: name,
          active,
          class: [
            `area-door -${this.getDoorColor(slug)}`,
            rotated && '-rotated',
            active && '-active',
          ],
          style: this.getEntityStyle(x, y),
          'data-type': 'door',
          'data-id': slug,
          onclick: () => this.$emit('click-door', slug),
        }
      })
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
      return this.tool_storage.getDoorColor(slug)
    },
    hover(warp) {
      this.tool_storage.state._hovering_warp = warp.id
    },
    blur() {
      delete this.tool_storage.state._hovering_warp
    },
  },
}
</script>
