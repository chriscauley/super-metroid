<template>
  <div class="smv-icon -map-cursor -blink" v-show="style" :style="style" />
</template>

<script>
import { kebabCase } from 'lodash'

const compact_y_offset = {
  9938: -9,
  '962a': -14,
  '95a8': -7,
  '94cc': -7,
}

export default {
  inject: ['json_data', 'tool_storage', 'areas', 'compact_settings'],
  data() {
    return { map_xy: null }
  },
  computed: {
    style() {
      if (!this.map_xy) {
        return null
      }
      const [x, y] = this.map_xy
      const _ = (a) => `${(this.root.scale * (100 * a)) / this.root.width}%`
      return {
        left: _(x),
        top: _(y),
        width: _(1),
        height: _(1),
      }
    },
    root() {
      return this.$store.layout.getWorld().root
    },
  },
  mounted() {
    window.setSamusIcon = this.setSamusIcon
    window._samusIcon = this
  },
  methods: {
    setSamusIcon(roomPointer, x, y) {
      if (!(roomPointer && this.json_data)) {
        this.map_xy = null
        return null
      }
      const { logic } = this.tool_storage.getRandoSettings()
      const room = window.rooms[logic][roomPointer]
      if (!room) {
        console.warn('Unable to find room', room, logic)
        return null
      }
      const { left, top, variaArea } = room
      const area_slug = kebabCase(variaArea)
        .replace('kraid-lair', 'kraids-lair')
        .replace('crateria', 'crater')
      const area = this.areas.find((a) => a.slug === area_slug)
      if (!area) {
        console.warn('Unable to find area', variaArea, area_slug)
        return null
      }
      this.map_xy = [area.x + left + x, area.y + top + y]
      if (this.compact_settings.area) {
        this.map_xy[1] += compact_y_offset[roomPointer] || 0
      }
      const _round = (a) => a.map((n) => n.toFixed(1)).join(',')
      this.$store.ui.state.tracker_debug = {
        area: variaArea,
        room: roomPointer,
        tracker_xy: _round(this.map_xy), // final position
        room_xy: [x, y], // position in room
        room_offset: [left, top], // room position on area
        area_offset: _round([area.x, area.y]), // area position on map
      }
    },
  },
}
</script>
