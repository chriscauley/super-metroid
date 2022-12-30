<template>
  <div class="item-tracker smi-tracker">
    <div v-for="(row, i) in prepped_rows" :key="i" class="item-tracker__row">
      <div v-for="col in row" :key="col.id" v-bind="col.attrs" @click="(e) => click(e, col)">
        <div v-if="col.numbers" class="item-tracker__numbers">
          <div v-for="(cls, j) in col.numbers" :key="j" :class="cls" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const rows = [
  ['energy-tank', 'reserve-tank', 'missile', 'super-missile', 'power-bomb'],
  ['charge-beam', 'ice-beam', 'wave-beam', 'spazer-beam', 'plasma-beam'],
  ['morph-ball', 'varia-suit', 'spring-ball', 'hi-jump-boots', 'space-jump'],
  ['bomb', 'gravity-suit', 'ridley', 'speed-booster', 'screw-attack'],
  ['grappling-beam', 'kraid', 'phantoon', 'draygon', 'x-ray'],
]
const packs = rows[0]

const getNumbers = (value) => {
  if (!value || typeof value !== 'number') {
    return null
  }
  return value
    .toString()
    .padStart(2, 0)
    .split('')
    .map((n) => `smi-number -number-${n}`)
}

export default {
  props: {
    inventory: Object,
    controlled: Boolean,
    compact: Boolean,
    rows: Array,
  },
  emits: ['add-item', 'toggle-item'],
  computed: {
    row_slugs() {
      if (this.rows) {
        return this.rows
      }
      const row_slugs = rows.slice().map((r) => r.slice())
      if (this.compact) {
        row_slugs[4].pop() // grappling-beam
        row_slugs[4].shift() // x-ray
        row_slugs.shift() // pack items
      }
      return row_slugs
    },
    prepped_rows() {
      return this.row_slugs.map((row) =>
        row.map((slug) => {
          let value = this.inventory[slug]
          if (['ridley', 'draygon', 'phantoon', 'kraid'].includes(slug)) {
            value = !value
          }
          return {
            slug,
            numbers: getNumbers(value),
            attrs: {
              class: [`sm-item -${slug}`, !value && '-inactive'],
              id: `item-tracker__${slug}`,
            },
          }
        }),
      )
    },
  },
  methods: {
    click(e, { slug }) {
      if (packs.includes(slug)) {
        const amount = e.shiftKey || e.ctrlKey ? -1 : 1
        this.$emit('add-item', slug, amount)
      } else {
        this.$emit('toggle-item', slug)
      }
    },
  },
}
</script>
