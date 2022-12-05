<template>
  <unrest-draggable :style="style.wrapper" @drag="drag" @dragend="dragend" class="area-overlay">
    <img :src="`/areas/${area.slug}.png`" :style="style.img" class="area-overlay__img" />
    <div v-for="warp in warps" v-bind="warp" :key="warp.id" @click="(e) => clickWarp(e, warp)" />
    <div v-for="item in items" v-bind="item" :key="item.id" @click="(e) => clickItem(e, item)" />
  </unrest-draggable>
</template>

<script>
const size = 13.5 // size of anchor box. All internal sizings are a multiple of this

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
    items() {
      return this.area.items.map(({ slug, name, x, y, chozo, major, scavenger }) => ({
        id: slug,
        title: name,
        class: [
          'area-item',
          this.$store.layout.getWorld().extra_classes[slug],
          chozo && '-chozo',
          major && '-major',
          scavenger && '-scavenger',
        ],
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
      const click_x = e.offsetX / width - 0.5
      const click_y = e.offsetY / height - 0.5
      const dx = Math.abs(click_x) > 0.25 ? Math.sign(click_x) * 0.5 : 0
      const dy = Math.abs(click_y) > 0.25 ? Math.sign(click_y) * 0.5 : 0
      if (dx || dy) {
        this.$store.layout.moveWarp(warp.slug, dx, dy)
      }
    },
    clickItem(e, { id }) {
      navigator.clipboard.writeText(id)
      return
      // const { width, height } = e.target.getBoundingClientRect()
      // const item = this.area.items.find((i) => i.slug === id)
      // const click_x = e.offsetX / width - 0.5
      // const click_y = e.offsetY / height - 0.5
      // const dx = Math.abs(click_x) > 0.25 ? Math.sign(click_x) * 0.5 : 0
      // const dy = Math.abs(click_y) > 0.25 ? Math.sign(click_y) * 0.5 : 0
      // if (dx || dy) {
      //   this.$store.layout.moveItem(item.slug, dx, dy)
      // }
    },
  },
}
</script>
