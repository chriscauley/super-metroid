<template>
  <div :style="style.wrapper" :class="wrapper_class">
    <area-box
      :area="area"
      size="100%"
      @click-location="tool_storage.clickLocation"
      @click-warp="tool_storage.clickWarp"
      @click-door="tool_storage.clickDoor"
    />
    <div class="area-overlay__title" :style="style.title">
      <unrest-draggable v-if="moving_area" @drag="dragArea" class="fa fa-arrows drag-anchor" />
      <drag-anchor
        v-if="moving_title"
        v-model="dxys.__title"
        :osd_store="osd_store"
        @done="moveTitle"
      />
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

import { getGridUrl } from '@/utils'

export default {
  components: { AreaBox, DragAnchor },
  inject: ['osd_store', 'tool_storage', 'json_data', 'game_state', 'compact_settings'],
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
    wrapper_class() {
      const compact = !this.compact_settings.area && this.area.slug.endsWith('__compact')
      return ['area-overlay', compact && '-compact']
    },
    root() {
      return this.$store.layout.getWorld().root
    },
    style() {
      const invert = !!this.$route.query.debug
      const { width, x = 0, y = 0 } = this.area
      const { root } = this
      const { logic } = this.tool_storage.getRandoSettings()
      const title_key = logic === 'vanilla' ? 'title_dxy' : `${logic}_title_dxy`
      const [title_x, title_y] = this.area[title_key] || [0, 0]
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
  watch: {
    'area.x': 'redraw',
    'area.y': 'redraw',
  },
  mounted() {
    this.redraw()
  },
  methods: {
    getEntityStyle(id, x, y) {
      const [dx, dy] = this.dxys[id] || [0, 0]
      const r = this.root.round
      const _ = (a, b) => r * Math.round((a + b / this.root.scale) / r)
      return {
        left: `${100 * _(x, dx)}%`,
        top: `${100 * _(y, dy)}%`,
      }
    },
    dragArea(e) {
      let [dx, dy] = e._drag.last_dxy
      if (dx === 0 && dy === 0) {
        return
      }
      const viewer = this.osd_store.viewer
      const viewer_zoom = viewer.viewport.getZoom()
      const zoom = viewer.world.getItemAt(0).viewportToImageZoom(viewer_zoom)
      const { scale } = this.root
      dx = dx / (zoom * scale)
      dy = dy / (zoom * scale)
      this.$store.layout.moveArea(this.area.slug, dx, dy, this.tool_storage)
    },
    moveTitle([dx, dy]) {
      const { scale } = this.root
      const { logic } = this.tool_storage.getRandoSettings()
      this.$store.layout.moveTitle(this.area.slug, dx / scale, dy / scale, logic)
    },
    redraw() {
      const { x, y, slug } = this.area
      const { width: max_width, scale } = this.root
      const fname = slug + '_files'
      const item = this.osd_store.viewer.world._items.find((i) =>
        i.source.tilesUrl?.includes(fname),
      )
      if (!item) {
        console.error('cannot find area tile', slug)
      } else {
        const point = new OSD.Point((x * scale) / max_width, (y * scale) / max_width)
        item.setPosition(point, true)
        if (slug.endsWith('__compact')) {
          item.setOpacity(this.compact_settings.area ? 1 : 0)
        }
      }
    },
  },
}
</script>
