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
      const { room_visibility } = this.tool_storage.state.tracker_settings
      return {
        viewBox: [-1, -1, width + 2, height + 2].join(' '),
        style: {
          height: `${100 * (height + 2)}%`,
          width: `${100 * (width + 2)}%`,
        },
        class: `area-box__svg -${room_visibility}`,
      }
    },
    text_attrs() {
      const [x, y] = this.area.title_dxy
      return { x, y }
    },
    paths() {
      if (!this.json_data) {
        return null
      }
      const svg_rooms = getSvgRooms(this.json_data)
      const entries = Object.entries(this.area.svg_coords || {})
      if (this.extra_path) {
        entries.push(['unknownSvg', this.extra_path])
      }
      const prep = ([id, coords]) => {
        if (!coords?.length) {
          return null
        }
        if (this.json_data.logic === 'mirror') {
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
