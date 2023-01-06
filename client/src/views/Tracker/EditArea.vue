<template>
  <unrest-modal v-if="area" :hide_actions="true" @close="close">
    <unrest-draggable class="edit-area" @drag="drag" @dragstart="dragstart" @dragend="dragend">
      <img :src="src" />
      <area-box :area="area" />
    </unrest-draggable>
  </unrest-modal>
</template>

<script>
import AreaBox from './AreaBox.vue'

export default {
  components: { AreaBox },
  props: {
    area: Object,
    tool_storage: Object,
  },
  emits: ['close'],
  data() {
    return { dragging: null }
  },
  computed: {
    src() {
      const { selected } = this.$store.layout.state
      return `/${selected}/${this.area.slug}.png`
    },
  },
  methods: {
    close() {
      this.tool_storage.save({ editing: null })
    },
    drag(e) {
      const { scale, round } = this.$store.layout.getWorld().root
      const { x, y, type, id } = this.dragging
      const [x1, y1] = e._drag.xy
      const [x2, y2] = e._drag.xy_start
      const _ = (i) => round * Math.round(i / round)
      const dx = (x1 - x2) / scale
      const dy = (y1 - y2) / scale
      this.$store.layout.moveEntity({ type, id }, _(x + dx), _(y + dy))
    },
    dragstart(e) {
      const { type, id } = e.target.dataset
      const { x, y } = this.area[type + 's'].find((l) => l.slug === id)
      this.dragging = { type, id, x, y }
    },
    dragend() {
      this.dragging = null
    },
  },
}
</script>
