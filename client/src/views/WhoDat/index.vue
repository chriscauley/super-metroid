<template>
  <div :class="wrapper_class">
    <h1>{{ title }}</h1>
    <div class="who-dat__display">
      <canvas ref="canvas" class="who-dat__canvas" />
      <canvas ref="mask" class="who-dat__mask" />
      <img ref="img" :src="src" @load="onload" class="who-dat__img" />
    </div>
    <div v-if="result" :class="`alert -${result.correct ? 'success' : 'error'}`">
      <div>
        {{ msg1 }}
      </div>
      <button class="btn -primary" ref="focus" @click="skip">Next</button>
    </div>
    <unrest-form v-else :schema="schema" :state="state" @submit="submit" />
    <div v-if="'debug' in $route.query" class="who-data__debug">
      <div><h2>debug!</h2></div>
      <div>
        <b>last:</b>
        {{ storage.state.recent.indexOf(current.id) }}
      </div>
      <div>
        <b>next_at:</b>
        {{ next_at }}
      </div>
      <div>
        <b>Distance:</b>
        {{ result?.distance }}
      </div>
      <div>{{ storage.state.recent }}</div>
      <div>{{ current }}</div>
    </div>
    <div class="who-dat__scores">
      <div>
        <b>Streak:</b>
        {{ storage.state.streak }}
      </div>
      <div>
        <b>Grade:</b>
        {{ storage.getPercentage() }} %
      </div>
    </div>
  </div>
</template>

<script>
import Storage from './storage'

const DURATION = 10000 // 10s

export default {
  name: 'WhoDat',
  data() {
    const state = {}
    const schema = {
      type: 'object',
      properties: {
        guess: {
          type: 'string',
        },
      },
    }
    const storage = Storage()
    const current = storage.getNextEnemy(this.$route.query.filter)
    return { schema, state, current, storage, result: null, next_at: null }
  },
  computed: {
    src() {
      return `/layouts/enemies/${this.current.image}`
    },
    title() {
      if (!this.result) {
        return 'Who dat?'
      }
      return `It's ${this.current.name}`
    },
    msg1() {
      const { correct, distance } = this.result
      if (correct) {
        return 'Correct!'
      }
      if (distance < 5) {
        return "Good guess, but I can't accept that"
      }
      return 'Sorry, try again.'
    },
    wrapper_class() {
      return ['who-dat', this.result && '-revealed']
    },
  },
  mounted() {
    this.tick()
  },
  unmounted() {
    cancelAnimationFrame(this._frame)
  },
  methods: {
    tick() {
      this._frame = requestAnimationFrame(this.tick)
      if (!this.next_at) {
        return
      }
      this.$refs.focus?.focus()
      if (this.next_at > new Date().valueOf()) {
        return
      }
      this.next_at = null
      this.result = null
      this.current = this.storage.getNextEnemy(this.$route.query.filter)
      this.state = {}
    },
    onload(e) {
      const img = e.target
      const ratio = img.width / img.height
      const ctx = this.$refs.canvas.getContext('2d')
      const { width, height } = this.$refs.canvas
      ctx.clearRect(0, 0, width, height)
      ctx.imageSmoothingEnabled = false
      let dwidth = width
      let dheight = height
      if (ratio < 1) {
        dwidth = width * ratio
      } else {
        dheight = height / ratio
      }
      ctx.drawImage(img, (width - dwidth) / 2, (height - dheight) / 2, dwidth, dheight)
      this.mask_data = ctx.getImageData(0, 0, width, height)
      for (let i = 0; i * 4 < this.mask_data.data.length; i++) {
        this.mask_data.data[i * 4] = 0
        this.mask_data.data[i * 4 + 1] = 0
        this.mask_data.data[i * 4 + 2] = 0
      }
      this.$refs.mask.getContext('2d').putImageData(this.mask_data, 0, 0)
    },
    submit() {
      if (!this.state.guess) {
        return
      }
      this.result = this.storage.guess(this.state.guess, this.current)
      this.next_at = new Date().valueOf() + DURATION
    },
    skip() {
      this.next_at = new Date().valueOf() - 1 // in past
    },
  },
}
</script>
