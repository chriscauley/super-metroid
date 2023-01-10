<template>
  <svg v-bind="svg_attrs" class="area-box__svg">
    <path v-for="path in paths" :key="path.id" v-bind="path" />
  </svg>
</template>

<script>
const toPath = (array) => {
  const coords = array.map((a) => a.join(' '))
  if (coords[0] !== coords[coords.length - 1]) {
    coords.push(coords[0])
  }
  return array.length ? `M ${coords.join(' L ')} z` : ''
}

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
        viewBox: [0, 0, width, height].join(' '),
        style: {
          height: `${100 * height}%`,
          width: `${100 * width}%`,
        },
      }
    },
    paths() {
      const entries = Object.entries(this.area.svg_coords || {})
      if (this.extra_path) {
        entries.push(['unknownSvg', this.extra_path])
      }
      return entries
        .map(([key, coords]) => ({
          d: toPath(coords),
          id: key,
        }))
        .filter((p) => p.d)
    },
  },
}
</script>
