<template>
  <div :class="wrapper_class">
    <h1>Who dat?</h1>
    <div class="who-dat__display">
      <canvas ref="canvas" class="who-dat__canvas" />
      <canvas ref="mask" class="who-dat__mask" />
      <img ref="img" :src="src" @load="onload" class="who-dat__img" />
    </div>
    <div v-if="result" :class="`alert -${result.correct ? 'success' : 'error'}`">
      <div>
        {{ msg1 }}
      </div>
      <div>{{ msg2 }}</div>
    </div>
    <unrest-form v-else :schema="schema" :state="state" @submit="submit" />
    <div v-if="'debug' in $route.query" class="who-data__debug">
      <div><h2>debug!</h2></div>
      <div>
        <b>last:</b>
        {{ storage.state.recent.indexOf(current.id) }}
      </div>
      <div>
        <b>timer:</b>
        {{ timer }}
      </div>
      <div>
        <b>Distance:</b>
        {{ result?.distance }}
      </div>
      <div>{{ storage.state.recent }}</div>
      <div>{{ current }}</div>
    </div>
  </div>
</template>

<script>
import Storage from './storage'

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
    return { schema, state, current, storage, result: null, timer: 0 }
  },
  computed: {
    src() {
      return `/layouts/enemies/${this.current.image}`
    },
    msg1() {
      const { correct, answer } = this.result
      if (correct) {
        return 'Correct!'
      }
      const a = 'aeiou'.includes(answer[0].toLowerCase()) ? 'an' : 'a'
      return `Nope, that's ${a} ${answer}!`
    },
    msg2() {
      return
    },
    wrapper_class() {
      return ['who-dat', this.result && '-revealed']
    },
  },
  methods: {
    tick() {
      if (this.timer > 0) {
        setTimeout(this.tick, 1000)
        this.timer--
        return
      }
      this.current = this.storage.getNextEnemy(this.$route.query.filter)
      this.state = {}
      this.result = null
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
      this.result = this.storage.guess(this.state.guess, this.current)
      this.timer = 10
      this.tick()
    },
  },
}
</script>
