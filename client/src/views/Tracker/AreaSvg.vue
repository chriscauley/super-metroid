<template>
  <svg v-bind="svg_attrs" class="area-box__svg">
    <path v-for="path in paths" :key="path.id" v-bind="path" />
    <text dominant-baseline="middle" text-anchor="middle" v-bind="text_attrs">
      {{ area.name }}
    </text>
  </svg>
</template>

<script>
export default {
  inject: ['json_data'],
  props: {
    area: Object,
    extra_path: Array,
  },
  computed: {
    svg_attrs() {
      const width = this.area.width
      const height = this.area.height
      return {
        viewBox: [-1, -1, width + 2, height + 2].join(' '),
        style: {
          height: `${100 * (height + 2)}%`,
          width: `${100 * (width + 2)}%`,
        },
      }
    },
    text_attrs() {
      const [x, y] = this.area.title_dxy
      return { x, y }
    },
    paths() {
      const svg_rooms = this.json_data?.svg_rooms || {}
      const entries = Object.entries(this.area.svg_coords || {})
      if (this.extra_path) {
        entries.push(['unknownSvg', this.extra_path])
      }
      const prep = ([id, coords]) => {
        if (!coords?.length || !svg_rooms[id]) {
          return null
        }
        coords = coords.map((a) => a.join(' '))
        if (coords[0] !== coords[coords.length - 1]) {
          coords.push(coords[0])
        }
        return { id, d: `M ${coords.join(' L ')} z` }
      }
      return entries.map(prep).filter(Boolean)
    },
  },
}
</script>
