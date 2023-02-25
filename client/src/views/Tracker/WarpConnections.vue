<template>
  <svg class="warp-connections" viewBox="0 0 1 1" v-show="zshow">
    <line v-for="line in shapes.lines" :key="line.id" v-bind="line" />
    <circle v-for="circle in shapes.circles" :key="circle.id" v-bind="circle" />
    <rect v-for="rect in shapes.rects" :key="rect.id" v-bind="rect" />
    <template v-for="text in shapes.texts" :key="text.attrs.id">
      <text v-bind="text.attrs">
        {{ text.content }}
      </text>
      <text v-if="text.subtext" class="warp-connections__subtext" v-bind="text.subtext_attrs">
        {{ text.subtext }}
      </text>
    </template>
  </svg>
</template>

<script>
import { warp_type_map, vanilla_warps } from '@/data/old'

const w = 0.002 // also used in css file
const r = w * 2
const w_rect = w * 9.8
const h_rect = w * 11.8

const colors = [
  'pink',
  'fuchsia',
  'orange',
  'yellow',
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

const sand_text = {
  belowBotwoonEnergyTankRight: 'A',
  westSandHallTunnelRight: 'V',
}

const getColor = (warp1, warp2, index) => {
  const types = [warp_type_map[warp1], warp_type_map[warp2]]
  if (vanilla_warps.map[warp1] === warp2) {
    return '#808080'
  }
  if (types.includes('escape')) {
    return '#00FF00'
  }
  if (types.includes('boss')) {
    return '#FF0000'
  }
  return colors[index % colors.length]
}

export default {
  inject: ['game_state', 'tool_storage'],
  props: {
    areas: Array,
    code_map: Object,
  },
  computed: {
    texts() {
      const out = []
      const code_map = this.tool_storage.getCodeMap()
      const { root } = this.$store.layout.getWorld()
      const { text_gap_scale = 1 } = root
      this.areas.forEach((area) => {
        area.warps.forEach((warp) => {
          const [_, x, y] = this.entity_xys[warp.slug]
          const attrs = {
            title: warp.slug,
            id: `warp-text_${warp.slug}`,
            x: this.scale(x),
            y: this.scale(y),
            class: `warp-connections__text -${warp.type}`,
          }
          if (warp.type === 'sand') {
            const content = sand_text[warp.slug]
            content && out.push({ content, attrs })
            return
          }
          if ('escape' === warp.type) {
            return
          }
          if (this.tool_storage.state.tracker_settings.warp_display !== 'codes') {
            return
          }
          if (this.game_state.locked_warps[warp.slug]) {
            // locked warps get dots
            return
          }
          let subtext, subtext_attrs
          const target_slug = this.game_state.warps[warp.slug]
          if (target_slug) {
            subtext = code_map[target_slug]
            attrs.title += ' -> ' + target_slug
            attrs.class += ' -linked'
            attrs.y -= this.scale(0.5 * text_gap_scale)
            subtext_attrs = {
              x: this.scale(x),
              y: this.scale(y + 0.7 * text_gap_scale),
            }
          }
          out.push({
            content: code_map[warp.slug],
            subtext,
            subtext_attrs,
            attrs,
          })
        })
      })
      return out
    },
    zshow() {
      const { tool } = this.tool_storage.state.selected
      return tool !== 'admin_move_location'
    },
    entity_xys() {
      return this.tool_storage.getEntityXys()
    },
    shapes() {
      const used = {}
      const { warp_display } = this.tool_storage.state.tracker_settings
      const pairs = Object.entries(this.game_state.warps).filter(([a, b]) => {
        if (used[a] || used[b]) {
          return false
        }
        used[a] = used[b] = true
        return true
      })
      const lines = []
      const circles = []
      const rects = []
      const s = this.scale
      const texts = this.texts.slice()
      const { locked_warps } = this.game_state
      const hover_target = this.tool_storage.state._hovering_warp
      pairs.forEach(([warp1, warp2], index) => {
        const types = [warp_type_map[warp1], warp_type_map[warp2]]
        const is_escape = types.includes('escape')
        const [_area1, x1, y1] = this.entity_xys[warp1]
        const [_area2, x2, y2] = this.entity_xys[warp2]
        const locked = locked_warps[warp1] || locked_warps[warp2]
        const color = getColor(warp1, warp2, index)
        const hovering = warp1 === hover_target || warp2 === hover_target
        lines.push({
          id: `${warp1}-${warp2}`,
          x1: s(x1),
          y1: s(y1),
          x2: s(x2),
          y2: s(y2),
          'stroke-width': w,
          stroke: color,
          class: `warp-connections__line ${hovering ? '-hovering' : ''}`,
        })
        if (warp_display === 'dot' || locked || is_escape) {
          circles.push({
            id: `warp-anchor-${warp1}`,
            cx: s(x1),
            cy: s(y1),
            r,
            class: 'warp-connections__circle',
            fill: color,
          })
          circles.push({
            id: `warp-anchor-${warp2}`,
            cx: s(x2),
            cy: s(y2),
            r,
            class: 'warp-connections__circle',
            fill: color,
          })
        } else {
          // warp_display === 'codes' and warp is editable
          rects.push(this.getRect(warp1, x1, y1, color))
          rects.push(this.getRect(warp2, x2, y2, color))
        }
      })
      return { lines, circles, rects, texts }
    },
  },
  methods: {
    scale(number) {
      const { root } = this.$store.layout.getWorld()
      const { svg_scale = 1 } = root
      return (svg_scale * (root.scale * number)) / root.width
    },
    getRect(id, x, y, stroke) {
      return {
        id: `warp-rect-${id}`,
        class: 'warp-connections__rect',
        stroke,
        x: this.scale(x) - w_rect / 2,
        y: this.scale(y) - h_rect / 2,
        width: w_rect,
        height: h_rect,
        rx: 2 * w,
        ry: 2 * w,
      }
    },
  },
}
</script>
