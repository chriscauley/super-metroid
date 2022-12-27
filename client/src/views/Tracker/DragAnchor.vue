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
      const zoom = this.osd_store.viewer.viewport.getZoom()
      this.$emit('update:modelValue', [
        ((2500 / 1500) * (x1 - x0)) / zoom,
        ((2500 / 1500) * (y1 - y0)) / zoom,
      ])
    },
    dragend() {
      this.$emit('done', this.modelValue)
      this.$emit('update:modelValue', null)
    },
  },
}
</script>
