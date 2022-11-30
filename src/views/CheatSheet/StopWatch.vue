<template>
  <div>
    <div class="btn-group">
      <div :class="icons.toggle" @click="toggle" />
    </div>
    {{ display_time }}
  </div>
</template>

<script>
const formatTime = (dt) => {
const seconds = dt / 1000
      const m = Math.floor(seconds / 60)
      const s = Math.floor(seconds % 60)
      const ms = Math.floor((seconds - s) * 1000)
      return `${m}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`
}

export default {
  data() {
    return { start: null, logs: [], frame: null }
  },
  computed: {
    display_time() {
      this.watch()
      if (!this.start) {
        return
      }
      return formatTime(new Date().valueOf() - this.start)
    },
    icons() {
      return {
        toggle: `fa fa-${this.start ? 'stop' : 'play' } btn -${this.start ? 'error' : 'secondary'}`
      }
    },
  },
  unmounted() {
    
  },
  mounted() {
    this.tick()
  },
  methods: {
    toggle() {
      if (this.start) {
        this.stop()
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
    stop() {
      window.cancelAnimationFrame(this.tick)
      this.logs.push(new Date().valueOf() - this.start)
      this.start = null
      this.frame = null
    },
  }
}
</script>
