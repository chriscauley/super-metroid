<template>
  <unrest-draggable
    v-if="tool_storage.state.edit_mode"
    class="resize-box"
    @dragstart="dragstart"
    @drag="drag"
    @dragend="dragend"
    @click.stop
  >
    <div class="resize-box__target" data-target="reset">
      <i class="fa fa-undo" />
    </div>
    <div v-for="t in TARGETS" class="resize-box__target" :key="t" :data-target="t" />
    <div class="resize-box__target" data-target="center">
      <i class="fa fa-arrows" />
    </div>
    <div class="resize-box__debug">{{ debug }}</div>
  </unrest-draggable>
</template>

<script>
import { clamp } from 'lodash'

const TARGETS = ['bottom-right'] // 'top-right', 'top-left', 'bottom-right', 'bottom-left']

export default {
  inject: ['tool_storage'],
  emits: ['update'],
  data() {
    return { TARGETS, debug: null, state: null, target: null }
  },
  computed: {
    targets() {
      return TARGETS.map((name) => ({
        class: `resize-box__target -${name}`,
        'data-name': name,
      }))
    },
  },
  methods: {
    dragstart(e) {
      this.target = e.target.dataset.target
      if (!this.target) {
        return
      }
      if (this.target === 'reset') {
        this.target = null
        this.$emit('update', null)
        return
      }
      this.box = this.$el.getBoundingClientRect()
    },
    drag(e) {
      if (!this.box) {
        return
      }
      let { x, y, width, height } = this.box
      if (document.body.classList.contains('-site-varia')) {
        y -= 24 // margin in place for the toolbar
      }
      const { target } = this

      const { xy, xy_start } = e._drag
      const dx = xy[0] - xy_start[0]
      const dy = xy[1] - xy_start[1]

      if (target.includes('left')) {
        x -= dx
        width -= dx
      } else if (target.includes('right')) {
        width += dx
      }

      if (target.includes('top')) {
        y -= dy
        height -= dy
      } else if (target.includes('bottom')) {
        height += dy
      }

      if (target === 'center') {
        x += dx
        y += dy
      }

      x = clamp(x, 0, window.innerWidth - width)
      y = clamp(y, 0, window.innerHeight - height)
      this.$emit('update', { x, y, width, height })
    },
    dragend() {
      this.box = null
      this.target = null
    },
  },
}
</script>
