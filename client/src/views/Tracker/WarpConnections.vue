<template>
  <svg class="warp-connections" viewBox="0 0 1 1" v-show="zshow">
    <line v-for="line in shapes.lines" :key="line.id" v-bind="line" />
    <circle v-for="circle in shapes.circles" :key="circle.id" v-bind="circle" />
    <template v-for="text in texts" :key="text.attrs.id">
      <text v-bind="text.attrs">
        {{ text.content }}
      </text>
      <text v-if="text.subtext" class="warp-connections__subtext" v-bind="text.subtext_attrs">
        {{ text.subtext }}
      </text>
    </template>
    <!--   x="110" -->
    <!--   y="110" -->
    <!--   text-anchor="middle" -->
    <!--   stroke="red" -->
    <!--   stroke-width="1px" -->
    <!--   alignment-baseline="middle" -->
    <!--   > -->
    <!-- </text> -->
  </svg>
</template>

<script>
const w = 0.002 // also used in css file
const colors = [
  'grey',
  'lime',
  'pink',
  'fuchsia',
  'orange',
  'yellow',
  'purple',
  'aqua',
  'red',
  '#bfef45',
  'white',
  'cyan',
  'magenta',
  'olive',
  'green',
  'blue',
  'maroon',
  'teal',
]

export default {
  props: {
    areas: Array,
    code_map: Object,
    game_state: Object,
    tool_storage: Object,
  },
  computed: {
    texts() {
      const code_map = this.tool_storage.getCodeMap()
      const out = []
      this.areas.forEach((area) => {
        area.warps.forEach((warp) => {
          if (['escape', 'sand'].includes(warp.type)) {
            return
          }
          const [_, x, y] = this.warp_area_xys[warp.slug]
          let content = code_map[warp.slug]
          let title = warp.slug
          let subtext, subtext_attrs
          const target_slug = this.game_state.warps[warp.slug]
          if (target_slug) {
            subtext = content
            content = code_map[target_slug]
            title += ' -> ' + target_slug
            subtext_attrs = {
              x: this.scale(x),
              y: this.scale(y + 30),
            }
          }
          out.push({
            content,
            subtext,
            subtext_attrs,
            attrs: {
              title,
              id: `warp-text_code-map[warp.slug]`,
              x: this.scale(x),
              y: this.scale(y),
              class: `warp-connections__text`,
            },
          })
        })
      })
      return out
    },
    zshow() {
      const { tool } = this.tool_storage.state.selected
      return tool !== 'admin_move_item'
    },
    warp_area_xys() {
      return this.tool_storage.getWarpAreaXys()
    },
    shapes() {
      const used = {}
      const { warp_lines } = this.tool_storage.state
      const pairs = Object.entries(this.game_state.warps).filter(([a, b]) => {
        if (used[a] || used[b]) {
          return false
        }
        used[a] = used[b] = true
        return true
      })
      const lines = []
      const circles = []
      const s = this.scale
      pairs.forEach(([warp1, warp2], index) => {
        const [area1, x1, y1] = this.warp_area_xys[warp1]
        const [area2, x2, y2] = this.warp_area_xys[warp2]
        const r = w * 7.5
        if (warp_lines === 'area') {
          lines.push({
            id: `${warp1}-${warp2}`,
            x1: s(x1),
            y1: s(y1) + w / 2,
            x2: s(x2),
            y2: s(y2) + w / 2,
            'stroke-width': w,
            class: `warp-connections__line -area-${area1}`,
          })
          lines.push({
            id: `${warp1}-${warp2}`,
            x1: s(x1),
            y1: s(y1) - w / 2,
            x2: s(x2),
            y2: s(y2) - w / 2,
            'stroke-width': w,
            class: `warp-connections__line -area-${area2}`,
          })
          circles.push({
            id: `warp-anchor-${warp1}`,
            cx: s(x1),
            cy: s(y1),
            r,
            class: `warp-connections__circle -area-${area2}`,
          })
          circles.push({
            id: `warp-anchor-${warp2}`,
            cx: s(x2),
            cy: s(y2),
            r,
            class: `warp-connections__circle -area-${area1}`,
          })
        } else {
          const color = colors[index % colors.length]
          // warp_lines === 'legacy'
          lines.push({
            id: `${warp1}-${warp2}`,
            x1: s(x1),
            y1: s(y1),
            x2: s(x2),
            y2: s(y2),
            'stroke-width': w,
            stroke: color,
            class: `warp-connections__line`,
          })
          circles.push({
            id: `warp-anchor-${warp1}`,
            cx: s(x1),
            cy: s(y1),
            r,
            fill: color,
            class: 'warp-connections__circle',
          })
          circles.push({
            id: `warp-anchor-${warp2}`,
            cx: s(x2),
            cy: s(y2),
            r,
            fill: color,
            class: 'warp-connections__circle',
          })
        }
      })
      return { lines, circles }
    },
  },
  methods: {
    scale(number) {
      return (1 * number) / 1500
    },
  },
}
</script>
