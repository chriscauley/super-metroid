<template>
  <div class="stop-watch" @click="toggle">
    <div class="display_time">
      {{ display_time }}
    </div>
  </div>
</template>

<script>
const pad2 = n => n.toString().padStart(2, '0')
const formatTime = (dt) => {
  const seconds = dt / 1000
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const ms = Math.floor(((seconds % 60) - s) * 1000)
  return `${h > 0 ? h + ':' : ''}${pad2(m)}:${pad2(s)}.${ms.toString().padStart(3, '0')}`
}

export default {
  data() {
    return { start: null, end: null, logs: [], frame: null }
  },
  computed: {
    display_time() {
      this.watch()
      if (!this.start) {
        return '00:00'
      }
      const end = this.end || new Date().valueOf()
      return formatTime(end - this.start)
    },
    icons() {
      return {
        toggle: `fa fa-${this.start ? 'stop' : 'play'} btn -${this.start ? 'error' : 'secondary'}`,
      }
    },
  },
  unmounted() {},
  mounted() {
    this.tick()
  },
  methods: {
    toggle() {
      if (this.end) {
        this.start = this.end = null
      } else if (this.start) {
        this.pause()
      } else {
        this.start = new Date().valueOf()
      }
    },
    watch() {
      return this.frame
    },
    tick() {
      this.frame = window.requestAnimationFrame(this.tick)
    },
    pause() {
      window.cancelAnimationFrame(this.tick)
      this.logs.push(new Date().valueOf() - this.start)
      this.end = new Date().valueOf()
      this.frame = null
    },
  },
}
</script>
