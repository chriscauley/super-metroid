<template>
  <unrest-modal v-if="area" @close="close">
    <unrest-toolbar :storage="area_storage">
      <template v-if="area_storage.state.selected.tool === 'grid'" #right>
        <select v-model="selected_id" @change="savePath">
          <option v-for="option in svg_options" :key="option.id" :value="option.id">
            {{ option.display }}
          </option>
        </select>
      </template>
    </unrest-toolbar>
    <unrest-draggable
      :class="wrapper_class"
      @drag="drag"
      @dragstart="dragstart"
      @dragend="dragend"
      @mousemove="mousemove"
    >
      <img :src="src" />
      <area-box :area="area" :extra_path="extra_path" />
      <div v-if="show_grid" class="edit-area__click-mask">
        <div v-for="(dot, i) in dots" :key="i" :style="dot" class="edit-area__hover-dot" />
      </div>
    </unrest-draggable>
    <template #actions>
      <button class="btn -primary" @click="nextArea"><i class="fa fa-chevron-right" /></button>
    </template>
  </unrest-modal>
</template>

<script>
import { sortBy } from 'lodash'

import AreaStorage from './AreaStorage'
import AreaBox from './AreaBox.vue'

export default {
  components: { AreaBox },
  inject: ['tool_storage'],
  props: {
    area: Object,
  },
  emits: ['close'],
  data() {
    return {
      dragging: null,
      area_storage: AreaStorage(this),
      extra_path: [],
      hover_xy: [0, 0],
      selected_id: null,
    }
  },
  computed: {
    src() {
      return `${this.$store.layout.getWorld().image_url}${this.area.slug}.png`
    },
    wrapper_class() {
      return ['edit-area -tool-' + this.area_storage.state.selected.tool]
    },
    svg_options() {
      let options = Object.entries(this.area.svg_coords || {})
      options = options.map((o) => ({
        display: `${o[1].length} - ${o[0]}`,
        id: o[0],
      }))
      return sortBy(options, 'display')
    },
    show_grid() {
      return this.area_storage.state.selected.tool === 'grid'
    },
    dots() {
      const dots = [this.hover_xy, ...this.extra_path]
      const { scale } = this.$store.layout.getWorld().root
      return dots.map((d, i) => ({
        left: `${d[0] * scale}px`,
        top: `${d[1] * scale}px`,
        background: i === 0 ? 'green' : 'red',
      }))
    },
  },
  methods: {
    close() {
      this.tool_storage.save({ editing: null })
    },
    drag(e) {
      if (!this.dragging) {
        return
      }
      const { x, y, type, id } = this.dragging
      const [x1, y1] = e._drag.xy
      const [x2, y2] = e._drag.xy_start
      const _ = this.getRoundedPoint
      const dx = x1 - x2
      const dy = y1 - y2
      this.$store.layout.moveEntity({ type, id }, x + _(dx), y + _(dy))
    },
    dragstart(e) {
      const { type, id } = e.target.dataset
      if (this.show_grid) {
        const xy = this.getRoundedPoint(e)
        const index = this.extra_path.findIndex((p) => p[0] === xy[0] && p[1] === xy[1])
        if (index > -1) {
          while (this.extra_path.length > index) {
            this.extra_path.pop()
          }
        } else {
          this.extra_path.push(xy)
        }
        return
      }
      if (!(type && id)) {
        return
      }
      const { x, y } = this.area[type + 's'].find((l) => l.slug === id)
      this.dragging = { type, id, x, y }
    },
    dragend() {
      this.dragging = null
    },
    mousemove(e) {
      this.hover_xy = this.getRoundedPoint(e)
    },
    nextArea() {
      const { areas } = this.$store.layout.getWorld()
      const index = areas.findIndex((a) => a.slug === this.area.slug)
      const next_area = areas[(index + 1) % areas.length]
      this.tool_storage.save({ editing: next_area.slug })
    },
    getRoundedPoint(e) {
      const { scale, round } = this.$store.layout.getWorld().root
      const _ = (i) => round * Math.round(i / scale / round)
      if (typeof e === 'number') {
        return _(e)
      }
      const rect = e.target.getBoundingClientRect()
      return [_(e.clientX - rect.x), _(e.clientY - rect.y)]
    },
    savePath() {
      this.$store.layout.savePath(this.area.slug, this.selected_id, this.extra_path)
      this.extra_path = []
      this.selected_id = null
    },
  },
}
</script>
