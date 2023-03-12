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

const color_by_difficulty = {
  break: '#FFFFFF',
  easy: '#6daa53',
  medium: '#c1b725',
  hard: '#e69235',
  harder: '#d13434',
  hardcore: '#123456',
  mania: '#000000',
}

const sand_text = {
  belowBotwoonEnergyTankRight: 'A',
  westSandHallTunnelRight: 'V',
}

export const getWarpColor = (warp1, warp2, index, is_portal) => {
  const types = [warp_type_map[warp1], warp_type_map[warp2]]
  if (types.includes('sand')) {
    return '#0FF'
  }
  if (types.includes('escape')) {
    return '#0F0'
  }
  if (vanilla_warps.map[warp1] === warp2) {
    return '#888'
  }
  if (types.includes('escape')) {
    return '#0F0'
  }
  if (warp1.endsWith('RoomIn') || warp2.endsWith('RoomIn')) {
    return '#F00'
  }
  if (is_portal) {
    return '#0F0'
  }
  return colors[index % colors.length]
}

export default {
  inject: ['game_state', 'json_data', 'tool_storage', 'areas'],
  computed: {
    texts() {
      const out = []
      const code_map = this.tool_storage.getCodeMap()
      const { root } = this.$store.layout.getWorld()
      const { text_gap_scale = 1 } = root
      this.areas.forEach((area) => {
        area.warps.forEach((warp) => {
          const [x, y] = this.entity_xys[warp.slug]
          const attrs = {
            title: warp.slug,
            id: `warp-text_${warp.slug}`,
            x: this.scale(x),
            y: this.scale(y) + 0.005, // FireFox doesn't accept alignment-baseline
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
              y: this.scale(y + 0.7 * text_gap_scale) + 0.002, // FF :(
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
      const entity_xys = this.tool_storage.getEntityXys()
      this.areas.forEach((area) =>
        area.gpss.forEach(({ x, y, slug }) => {
          entity_xys[slug] = [area.x + x, area.y + y]
        }),
      )
      return entity_xys
    },
    shapes() {
      const used = {}
      const is_nordub = this.$store.layout.state.selected === 'nordub'
      const { warp_display } = this.tool_storage.state.tracker_settings
      const { areaRando } = this.tool_storage.getRandoSettings()
      const pairs = Object.entries(this.game_state.warps).filter(([a, b]) => {
        if (used[a] || used[b]) {
          return false
        }
        used[a] = used[b] = true
        return true
      })
      is_nordub &&
        pairs.push([
          'westSandHallLeft',
          areaRando ? 'belowBotwoonEnergyTankRight' : 'westSandHallTunnelRight',
        ])
      let lines = []
      let circles = []
      const rects = []
      const texts = this.texts.slice()
      const { locked_warps } = this.game_state
      const hover_target = this.tool_storage.state._hovering_warp
      pairs.forEach(([warp1, warp2], index) => {
        const types = [warp_type_map[warp1], warp_type_map[warp2]]
        const is_escape = types.includes('escape')
        if (is_escape && !is_nordub) {
          return
        }
        const xy1 = this.entity_xys[warp1]
        const xy2 = this.entity_xys[warp2]
        const locked = locked_warps[warp1] || locked_warps[warp2]
        const color = getWarpColor(warp1, warp2, index)
        const hovering = warp1 === hover_target || warp2 === hover_target
        lines.push(this.makeLine(warp1, warp2, xy1, xy2, 'warp', color, hovering))
        if (warp_display === 'dot' || locked || is_escape) {
          circles.push(this.makeCircle(warp1, xy1, 'warp', color))
          circles.push(this.makeCircle(warp2, xy2, 'warp', color))
        } else {
          // warp_display === 'codes' and warp is editable
          rects.push(this.getRect(warp1, xy1, color))
          rects.push(this.getRect(warp2, xy2, color))
        }
      })
      const [inner_lines, inner_circles] = this.getInnerLines()
      lines = lines.concat(inner_lines)
      circles = circles.concat(inner_circles)
      return { lines, circles, rects, texts }
    },
  },
  methods: {
    scale(number) {
      const { root } = this.$store.layout.getWorld()
      const { svg_scale = 1 } = root
      return (svg_scale * (root.scale * number)) / root.width
    },
    getRect(id, xy, stroke) {
      return {
        id: `warp-rect-${id}`,
        class: 'warp-connections__rect',
        stroke,
        x: this.scale(xy[0]) - w_rect / 2,
        y: this.scale(xy[1]) - h_rect / 2,
        width: w_rect,
        height: h_rect,
        rx: 2 * w,
        ry: 2 * w,
      }
    },
    getInnerLines() {
      const { innerTransitions = [] } = this.json_data || {}

      const lines = []
      const circles = {}
      innerTransitions.forEach(([gps1, gps2, difficulties]) => {
        const xy1 = this.entity_xys[gps1]
        const xy2 = this.entity_xys[gps2]
        if (!xy1 || !xy2) {
          !xy1 && console.warn(`missing xy1 for ${gps1}`)
          !xy2 && console.warn(`missing xy2 for ${gps2}`)
          return
        }

        const color = color_by_difficulty[difficulties[0]]
        lines.push(this.makeLine(gps1, gps2, xy1, xy2, 'gps', color, false))
        circles[gps1] = this.makeCircle(gps1, xy1, 'gps', color)
        circles[gps2] = this.makeCircle(gps2, xy2, 'gps', color)
      })
      return [lines, Object.values(circles)]
    },
    makeLine(slug1, slug2, xy1, xy2, type, stroke, hovering) {
      return {
        id: `${slug1}-${slug2}`,
        x1: this.scale(xy1[0]),
        y1: this.scale(xy1[1]),
        x2: this.scale(xy2[0]),
        y2: this.scale(xy2[1]),
        'stroke-width': w,
        stroke,
        class: `${type}-connections__line ${hovering ? '-hovering' : ''}`,
      }
    },
    makeCircle(slug, xy, type, color) {
      return {
        id: `${type}-anchor-${slug}`,
        cx: this.scale(xy[0]),
        cy: this.scale(xy[1]),
        r,
        class: type + '-connections__circle',
        fill: color,
      }
    },
  },
}
</script>
