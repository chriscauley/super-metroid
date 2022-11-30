<template>
  <unrest-draggable :style="style.wrapper" @drag="drag" @dragend="dragend" class="area-overlay">
    <img :src="`/areas/${area.slug}.png`" :style="style.img" class="area-overlay__img" />
    <div v-for="warp in warps" v-bind="warp" :key="warp.id" @click="(e) => clickWarp(e, warp)" />
  </unrest-draggable>
</template>

<script>
const size = 75 // size of anchor box. All internal sizings are a multiple of this

export default {
  props: {
    area: Object,
    parent: Object,
    osd_store: Object,
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
          top: _(y + dy, this.parent.height),
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
    warps() {
      return this.area.warps.map(({ slug, name, x, y, type, rotated }) => ({
        id: slug,
        title: name,
        class: [`area-warp -${type}`, rotated && '-rotated'],
        style: {
          left: `${(100 * x) / size}%`,
          top: `${(100 * y) / size}%`,
        },
      }))
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
      const { dx, dy } = this
      this.$emit('move-area', { dx, dy })
      this.dx = this.dy = 0
    },
    clickWarp(e, { id }) {
      const { width, height } = e.target.getBoundingClientRect()
      const warp = this.area.warps.find((w) => w.slug === id)
      const dx = e.offsetX / width - 0.5
      const dy = e.offsetY / height - 0.5
      if (Math.abs(dx) > 0.25) {
        warp.x += Math.sign(dx) * 0.5
      }
      if (Math.abs(dy) > 0.25) {
        warp.y += Math.sign(dy) * 0.5
      }
    },
  },
}
</script>
