<template>
  <div :style="style.wrapper" class="area-overlay">
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
    </div>
    <img :src="src" :style="style.img" class="area-overlay__img" />
    <location-marker
      v-for="location in locations"
      :key="location.slug"
      @click="(e) => clickLocation(e, location)"
      :game_state="game_state"
      :json_data="json_data"
      :location="location"
      :style="getEntityStyle(location.slug, location.x, location.y)"
    >
      <drag-anchor
        v-if="moving_locations"
        v-model="dxys[location.slug]"
        :osd_store="osd_store"
        @done="(xy) => moveLocation(location, xy)"
      />
    </location-marker>
    <div
      v-for="entity in entities"
      v-bind="entity"
      :key="entity.id"
      @click="(e) => clickEntity(e, entity)"
    >
      <drag-anchor
        v-if="moving_locations"
        v-model="dxys[entity.id]"
        :osd_store="osd_store"
        @done="(xy) => moveEntity(entity, xy)"
      />
    </div>
  </div>
</template>

<script>
import LocationMarker from './LocationMarker.vue'
import DragAnchor from './DragAnchor.vue'

import { getStaticUrl } from '@/utils'

export default {
  components: { DragAnchor, LocationMarker },
  props: {
    area: Object,
    osd_store: Object,
    tool_storage: Object,
    game_state: Object,
    json_data: Object,
  },
  emits: ['move-area'],
  data() {
    return { dxys: {} }
  },
  computed: {
    src() {
      const { selected } = this.$store.layout.state
      return getStaticUrl(`/${selected}/${this.area.slug}.png`)
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
    warps() {
      const { selected_warp } = this.tool_storage.state
      return this.area.warps.map(({ slug, name, x, y, type, rotated }) => ({
        id: slug,
        title: name,
        class: [`area-warp -${type}`, rotated && '-rotated', selected_warp === slug && '-selected'],
        type: 'warp',
        style: this.getEntityStyle(slug, x, y),
      }))
    },
    locations() {
      if (this.$store.layout.getWorld().hide_locations || this.moving_area || this.moving_title) {
        return []
      }
      const { split } = this.tool_storage.state
      let locations = this.area.locations
      if (['major', 'chozo', 'scavenger'].includes(split)) {
        locations = locations.filter((i) => i[split])
      }
      return locations
    },
    entities() {
      return this.moving_area || this.moving_title ? [] : this.warps
    },
  },
  methods: {
    getEntityStyle(id, x, y) {
      const [dx, dy] = this.dxys[id] || [0, 0]
      const r = this.root.round
      const offset = this.root.offset || 0
      const _ = (a, b) => Math.round(r * (a + b / this.root.scale)) / r + offset
      return {
        left: `${100 * _(x, dx)}%`,
        top: `${100 * _(y, dy)}%`,
      }
    },
    moveArea([dx, dy]) {
      const { scale } = this.root
      this.$store.layout.moveArea(this.area.slug, dx / scale, dy / scale)
    },
    moveTitle([dx, dy]) {
      const { scale } = this.root
      this.$store.layout.moveTitle(this.area.slug, dx / scale, dy / scale)
    },
    moveLocation(location, dxy) {
      return this.moveEntity({ id: location.slug, type: 'location' }, dxy)
    },
    clickLocation(e, location) {
      return this.clickEntity(e, { id: location.slug, type: 'location' })
    },
    moveEntity({ id, type }, [dx, dy]) {
      const { scale } = this.root
      this.$store.layout.moveEntity({ id, type }, dx / scale, dy / scale)
    },
    clickEntity(e, { id, type }) {
      const { tool } = this.tool_storage.state.selected
      if (tool === 'admin_move_location') {
        const { width, height } = e.target.getBoundingClientRect()
        const click_x = e.offsetX / width - 0.5
        const click_y = e.offsetY / height - 0.5
        const dx = Math.abs(click_x) > 0.25 ? Math.sign(click_x) * 0.5 : 0
        const dy = Math.abs(click_y) > 0.25 ? Math.sign(click_y) * 0.5 : 0
        if (dx || dy) {
          this.$store.layout.moveEntity({ id, type }, dx, dy)
        }
      } else if (tool === 'play') {
        this.tool_storage.click(id, this.game_state)
      }
    },
  },
}
</script>
