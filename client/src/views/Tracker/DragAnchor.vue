<template>
  <unrest-draggable @drag="drag" @dragend="dragend" class="fa fa-arrows drag-anchor" />
</template>

<script>
export default {
  props: {
    modelValue: Array,
    osd_store: Object,
  },
  emits: ['update:modelValue', 'done'],
  methods: {
    drag(e) {
      const [x0, y0] = e._drag.xy_start
      const [x1, y1] = e._drag.xy
      const viewer = this.osd_store.viewer
      const viewer_zoom = viewer.viewport.getZoom()
      const zoom = viewer.world.getItemAt(0).viewportToImageZoom(viewer_zoom)
      this.$emit('update:modelValue', [(x1 - x0) / zoom, (y1 - y0) / zoom])
    },
    dragend() {
      this.$emit('done', this.modelValue)
      this.$emit('update:modelValue', null)
    },
  },
}
</script>
