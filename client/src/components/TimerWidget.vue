<template>
  <div :class="cls" :style="style">
    <resize-box @update="resizeBox" />
    <div v-click="click" v-click.double="clear" v-click.hold="clear">
      {{ display }}
    </div>
  </div>
</template>

<script>
const _f = (i) => i.toString().padStart(2, '0')
const format = (frames) => {
  frames = Math.floor(frames)
  const seconds = Math.floor(frames / 60)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor(seconds / 60) % 60
  const s = seconds % 60
  const remainder = frames % 60
  return `${_f(h)}'${_f(m)}'${_f(s)}"${_f(remainder)}`
}

export default {
  data() {
    return {
      last_set: new Date().valueOf(),
      frames: 0,
      running: false,
      controlled: false,
      dt: 0,
    }
  },
  computed: {
    display() {
      // calculate how many frames have passed since frames was last set
      const delta = Math.floor((60 * this.dt) / 1000)
      return format(this.frames + delta)
    },
    cls() {
      return ['timer-widget', this.controlled && '-controlled']
    },
    style() {
      const { x, y, width } = this.$store.config.state['timer-widget'] || {}
      if (!width) {
        return {}
      }
      const columns = 5.25 // width set in css

      return {
        fontSize: `${width / columns}px`,
        left: `${x}px`,
        top: `${y}px`,
      }
    },
  },
  mounted() {
    window.$timer = this
    this.tick()
  },
  unmonuted() {
    window.cancelAnimationFrame(this._frame)
  },
  methods: {
    set(frames, running) {
      if (frames !== null) {
        this.frames = frames
      }
      this.running = running
      this.controlled = this.running
      this.last_set = new Date().valueOf()
    },
    tick() {
      if (this.running) {
        this.dt = new Date().valueOf() - this.last_set
      }
      window.cancelAnimationFrame(this._frame)
      this._frame = window.requestAnimationFrame(this.tick)
    },
    click() {
      if (this.controlled) {
        return
      }
      if (!this.running) {
        this.running = true
        this.last_set = new Date().valueOf()
      } else {
        this.running = false
        const delta = Math.floor((60 * this.dt) / 1000)
        this.frames += delta
        this.dt = 0
      }
    },
    pause() {
      this.running = false
      this.controlled = false
    },
    clear() {
      if (this.controlled) {
        return
      }
      this.frames = 0
      this.dt = 0
      this.running = false
    },
    resizeBox(values) {
      this.$store.config.save({ 'timer-widget': values })
    },
  },
}
</script>
