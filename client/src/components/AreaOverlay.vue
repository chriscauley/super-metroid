<template>
  <div :style="style.wrapper" class="area-overlay">
    <unrest-draggable
      v-if="is_moveable"
      @drag="drag"
      @dragend="dragend"
      class="fa fa-arrows area-overlay__move"
    />
    <img :src="`/areas/${area.slug}.png`" :style="style.img" class="area-overlay__img" />
    <div
      v-for="entity in entities"
      v-bind="entity"
      :key="entity.id"
      @click="(e) => clickEntity(e, entity)"
    />
  </div>
</template>

<script>
const size = 13.5 // size of anchor box. All internal sizings are a multiple of this

export default {
  props: {
    area: Object,
    parent: Object,
    osd_store: Object,
    tool_storage: Object,
    game_state: Object,
  },
  emits: ['move-area'],
  data() {
    return { dx: 0, dy: 0 }
  },
  computed: {
    style() {
      const invert = !!this.$route.query.debug
      const { width, x = 0, y = 0 } = this.area
      const { dx, dy } = this
      const _ = (a, b) => `${(100 * a) / b}%`
      return {
        wrapper: {
          left: _(x + dx, this.parent.width),
          top: _(y + dy, this.parent.width),
          width: _(size, this.parent.width),
          height: _(size, this.parent.width),
          '--anchor-size': size,
        },
        img: {
          width: `${(100 * width) / size}%`,
          opacity: invert ? 0.5 : null,
          filter: invert ? 'invert(1)' : null,
        },
      }
    },
    is_moveable() {
      const { tool } = this.tool_storage.state.selected
      return ['admin_move_area'].includes(tool)
    },
    warps() {
      const { tool } = this.tool_storage.state.selected
      const { selected_warp } = this.tool_storage.state
      if (!['admin_move_item', 'play'].includes(tool)) {
        return []
      }
      return this.area.warps.map(({ slug, name, x, y, type, rotated }) => ({
        id: slug,
        title: name,
        class: [`area-warp -${type}`, rotated && '-rotated', selected_warp === slug && '-selected'],
        type: 'warp',
        style: {
          left: `${(100 * x) / size}%`,
          top: `${(100 * y) / size}%`,
        },
      }))
    },
    items() {
      const { tool } = this.tool_storage.state.selected
      if (!['admin_move_item', 'play'].includes(tool)) {
        return []
      }
      const { split } = this.tool_storage.state
      let items = this.area.items
      if (['major', 'chozo', 'scavenger'].includes(split)) {
        items = items.filter((i) => i[split])
      }
      return items.map(({ slug, name, x, y, chozo, major, scavenger }) => ({
        id: slug,
        title: name,
        type: 'item',
        class: [
          'area-item',
          this.$store.layout.getWorld().extra_classes[slug],
          chozo && '-chozo',
          major && '-major',
          scavenger && '-scavenger',
          this.game_state.items[slug] && '-completed',
        ],
        style: {
          left: `${(100 * x) / size}%`,
          top: `${(100 * y) / size}%`,
        },
      }))
    },
    entities() {
      return [...this.warps, ...this.items]
    },
  },
  methods: {
    drag(e) {
      const [x0, y0] = e._drag.xy_start
      const [x1, y1] = e._drag.xy
      const zoom = this.osd_store.viewer.viewport.getZoom()
      this.dx = (x1 - x0) / zoom
      this.dy = (y1 - y0) / zoom
    },
    dragend() {
      const { tool } = this.tool_storage.state.selected
      const { dx, dy } = this
      if (tool === 'admin_move_area') {
        this.$emit('move-area', { dx, dy })
      } else {
        console.warn('TODO: moving marker should add an override to moving the area')
      }
      this.dx = this.dy = 0
    },
    clickEntity(e, { id, type }) {
      const { tool } = this.tool_storage.state.selected
      if (tool === 'admin_move_item') {
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
