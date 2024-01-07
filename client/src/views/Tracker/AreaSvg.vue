<template>
  <svg v-bind="svg_attrs">
    <path v-for="path in paths" :key="path.id" v-bind="path" />
    <text dominant-baseline="middle" text-anchor="middle" v-bind="text_attrs">
      {{ area.name }}
    </text>
  </svg>
</template>

<script>
const getSvgRooms = (json_data) => {
  if (!json_data) {
    return {}
  }
  // these aren't in varia's data so I added them manually
  const svg_rooms = { ...(json_data.svg_rooms || {}) }
  const collected = {}
  json_data.collectedItems.forEach((i) => (collected[i] = true))
  svg_rooms.escapeSvg = collected.MotherBrain
  svg_rooms.DachoraRoomBottomSvg = collected.SpeedBooster && svg_rooms.bigPinkSvg
  const canBombBlocks = collected.Morph && (collected.Bombs || collected.PowerBombs)
  const hasScrewOrSpeed = collected.ScrewAttack || collected.SpeedBooster
  const canBreakTallBlocks = hasScrewOrSpeed || canBombBlocks
  svg_rooms.climbEscapeSvg = canBreakTallBlocks && svg_rooms.landingSiteSvg
  return svg_rooms
}

export default {
  inject: ['json_data', 'tool_storage'],
  props: {
    area: Object,
    extra_path: Array,
  },
  computed: {
    svg_attrs() {
      const width = this.area.width
      const height = this.area.height
      const rv = this.tool_storage.state.tracker_settings.room_visibility
      return {
        viewBox: [-1, -1, width + 2, height + 2].join(' '),
        style: {
          height: `${100 * (height + 2)}%`,
          width: `${100 * (width + 2)}%`,
        },
        class: ['area-box__svg', rv === 'both' ? '-highlight-open -hide-closed' : `-${rv}`],
      }
    },
    text_attrs() {
      const { logic } = this.tool_storage.getRandoSettings()
      const [x, y] = this.area[`${logic}_title_dxy`] || this.area.title_dxy
      return { x, y }
    },
    paths() {
      const { debug } = this.$route.query
      if (!this.json_data && !debug) {
        return null
      }
      const svg_rooms = getSvgRooms(this.json_data)
      const entries = Object.entries(this.area.svg_coords || {})
      if (this.extra_path) {
        entries.push(['unknownSvg', this.extra_path])
      }
      const { logic } = this.tool_storage.getRandoSettings()
      const prep = ([id, coords]) => {
        if (!coords?.length) {
          return null
        }
        if (logic === 'mirror') {
          const { width } = this.area
          coords = coords.map(([x, y]) => [width - x, y])
        }
        coords = coords.map((a) => a.join(' '))
        if (coords[0] !== coords[coords.length - 1]) {
          coords.push(coords[0])
        }
        const cls = svg_rooms[id] ? '-open' : '-closed'
        return { id, d: `M ${coords.join(' L ')} z`, class: cls }
      }
      return entries.map(prep).filter(Boolean)
    },
  },
}
</script>
