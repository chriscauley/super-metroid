<template>
  <unrest-draggable :style="style" @drag="drag" @dragend="dragend">
    <img :src="`/areas/${area.slug}.png`" style="width: 100%" />
  </unrest-draggable>
</template>

<script>
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
      const _ = (a, b) => `${(Math.round(a) / b) * 100}%`
      return {
        position: 'absolute',
        left: _(x + dx, this.parent.width),
        top: _(y + dy, this.parent.height),
        width: _(width, this.parent.width),
        opacity: invert ? 0.5 : null,
        filter: invert ? 'invert(1)' : null,
      }
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
  },
}
</script>
