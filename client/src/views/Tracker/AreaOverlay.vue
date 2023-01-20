<template>
  <div :style="style.wrapper" class="area-overlay">
    <area-box :area="area" size="100%" @click-location="clickLocation" @click-warp="clickWarp" />
    <div class="area-overlay__title" :style="style.title">
      <drag-anchor
        v-if="moving_area"
        v-model="dxys.__root"
        :osd_store="osd_store"
        @done="moveArea"
      />
      <drag-anchor
        v-if="moving_title"
        v-model="dxys.__title"
        :osd_store="osd_store"
        @done="moveTitle"
      />
      {{ area.name }}
      <i
        v-if="is_admin"
        class="fa fa-edit link"
        @click="tool_storage.save({ editing: area.slug })"
      />
    </div>
  </div>
</template>

<script>
import OSD from 'openseadragon'
import AreaBox from './AreaBox.vue'
import DragAnchor from './DragAnchor.vue'

import { getStaticUrl, getGridUrl } from '@/utils'

export default {
  components: { AreaBox, DragAnchor },
  inject: ['osd_store', 'tool_storage', 'json_data', 'game_state'],
  props: {
    area: Object,
    show_image: Boolean,
  },
  emits: ['move-area'],
  data() {
    return { dxys: {} }
  },
  computed: {
    is_admin() {
      return this.$route.query.is_admin
    },
    src() {
      const { selected } = this.$store.layout.state
      return getStaticUrl(`/${selected}/${this.area.slug}.png`)
    },
    grid_style() {
      const { width, height } = this.area
      const { scale } = this.root
      return {
        width: `${100 * width}%`,
        height: `${100 * height}%`,
        backgroundImage: `url(${getGridUrl(width, height, scale)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }
    },
    root() {
      return this.$store.layout.getWorld().root
    },
    style() {
      const invert = !!this.$route.query.debug
      const { width, x = 0, y = 0 } = this.area
      const { root } = this
      const [title_x, title_y] = this.area.title_dxy || [0, 0]
      const [dx, dy] = this.dxys.__root || [0, 0]
      const _ = (a) => `${(root.scale * (100 * a)) / root.width}%`
      return {
        size: _(1),
        wrapper: {
          left: _(x + dx / root.scale),
          top: _(y + dy / root.scale),
          width: _(1),
          height: _(1),
          '--anchor-size': root.scale,
        },
        img: {
          width: `${100 * width}%`,
          opacity: invert ? 0.5 : null,
          filter: invert ? 'invert(1)' : null,
        },
        title: this.getEntityStyle('__title', title_x, title_y),
      }
    },
    moving_area() {
      const { tool } = this.tool_storage.state.selected
      return 'admin_move_area' === tool
    },
    moving_locations() {
      const { tool } = this.tool_storage.state.selected
      return 'admin_move_location' === tool
    },
    moving_title() {
      const { tool } = this.tool_storage.state.selected
      return 'admin_move_title' === tool
    },
  },
  methods: {
    getEntityStyle(id, x, y) {
      const [dx, dy] = this.dxys[id] || [0, 0]
      const r = this.root.round
      const _ = (a, b) => Math.round(r * (a + b / this.root.scale)) / r
      return {
        left: `${100 * _(x, dx)}%`,
        top: `${100 * _(y, dy)}%`,
      }
    },
    moveArea([dx, dy]) {
      const { width: max_width, scale } = this.$store.layout.getWorld().root
      const [x, y] = this.$store.layout.moveArea(this.area.slug, dx / scale, dy / scale)
      const fname = this.area.slug + '.png'
      const item = this.osd_store.viewer.world._items.find((i) => i.source.url?.includes(fname))
      const point = new OSD.Point((x * scale) / max_width, (y * scale) / max_width)
      item.setPosition(point, true)
    },
    moveTitle([dx, dy]) {
      const { scale } = this.root
      this.$store.layout.moveTitle(this.area.slug, dx / scale, dy / scale)
    },
    clickLocation(id) {
      if (this.json_data) {
        window.clickLoc({ id })
      } else {
        this.tool_storage.click(id, this.game_state)
      }
    },
    clickWarp(id) {
      if (this.json_data) {
        window.clickPortal(id)
      } else {
        this.tool_storage.click(id, this.game_state)
      }
    },
  },
}
</script>
