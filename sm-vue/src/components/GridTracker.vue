<template>
  <div :class="`grid-tracker smi-tracker ${controlled ? '-controlled' : ''}`" :style="style">
    <div v-for="(row, i) in prepped_rows" :key="i" class="grid-tracker__row">
      <template v-for="col in row" :key="col.slug">
        <sm-cwisp-tracker
          v-if="col.slug === 'cwisp'"
          :inventory="inventory"
          @toggle-item="(i) => $emit('toggle-item', i)"
        />
        <div v-else v-bind="col.attrs" @click="(e) => click(e, col)">
          <div v-if="col.numbers" class="grid-tracker__numbers">
            <div v-for="(cls, j) in col.numbers" :key="j" :class="cls" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import worlds from './worlds'

const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

const rows = [
  ['energy-tank', 'reserve-tank', 'missile', 'super-missile', 'power-bomb'],
  ['charge-beam', 'ice-beam', 'wave-beam', 'spazer-beam', 'plasma-beam'],
  ['morph-ball', 'varia-suit', 'spring-ball', 'hi-jump-boots', 'space-jump'],
  ['bomb', 'gravity-suit', 'ridley', 'speed-booster', 'screw-attack'],
  ['grappling-beam', 'kraid', 'phantoon', 'draygon', 'x-ray'],
]

const cwisp_4_cols = [
  ['cwisp', 'morph-ball', 'bomb', 'spring-ball'],
  ['hi-jump-boots', 'speed-booster', 'space-jump', 'screw-attack'],
  ['varia-suit', 'ridley', 'gravity-suit'],
  ['kraid', 'phantoon', 'draygon'],
]

const cwisp_5_cols = [
  ['cwisp', 'morph-ball', 'bomb', 'spring-ball', 'varia-suit'],
  ['hi-jump-boots', 'speed-booster', 'space-jump', 'screw-attack', 'gravity-suit'],
]

const packs = rows[0]

const getNumbers = (value, multiplier) => {
  if (!value || typeof value !== 'number') {
    return null
  }
  const displayValue = multiplier ? value * multiplier : value
  return displayValue
    .toString()
    .padStart(2, 0)
    .split('')
    .map((n) => `smi-number -number-${n}`)
}

const getIcon = (slug, value) => {
  if (['ridley', 'draygon', 'phantoon', 'kraid'].includes(slug)) {
    return [`sm-g4-head -${slug}`, value && '-inactive']
  }
  return [`sm-item -${slug}`, !value && '-has-not']
}

const VANILLA = {
  'kill kraid': true,
  'kill phantoon': true,
  'kill draygon': true,
  'kill ridley': true,
  kraid: true,
  phantoon: true,
  draygon: true,
  ridley: true,
}

const removeVanilla = (rows) => rows.map((r) => r.filter((slug) => !VANILLA[slug]))

export default {
  props: {
    inventory: Object,
    controlled: Boolean,
    mode: String,
    rows: Array,
    world: String,
    objectives: Object,
    width: Number,
  },
  emits: ['add-item', 'toggle-item', 'toggle-objective'],
  computed: {
    vanilla_objectives() {
      const objective_ids = Object.keys(this.objectives || {})
      return !objective_ids.find((o) => !VANILLA[o])
    },
    row_slugs() {
      if (this.rows) {
        return this.rows
      }
      let row_slugs = rows.map((r) => r.slice())
      const world_options = worlds[this.world]
      if (this.mode === 'cwisp') {
        if (this.vanilla_objectives) {
          row_slugs = cwisp_4_cols.map((r) => r.slice())
        } else if (Object.keys(this.objectives || {}).length <= 6) {
          row_slugs = cwisp_4_cols
        } else {
          row_slugs = cwisp_5_cols.map((r) => r.slice())
        }
      } else if (this.mode === 'compact') {
        row_slugs[4].pop() // grappling-beam
        row_slugs[4].shift() // x-ray
        row_slugs.shift() // pack items
      }
      if (world_options) {
        row_slugs = row_slugs.map((row) => row.map((slug) => world_options[slug] || slug))
      }
      if (!this.vanilla_objectives) {
        row_slugs = removeVanilla(row_slugs)
      }
      return row_slugs
    },
    columns() {
      const objective_ids = Object.keys(this.objectives || {})
      return objective_ids.length > 15 ? 6 : this.row_slugs[0].length
    },
    prepped_rows() {
      const world_options = worlds[this.world] || worlds.default
      const rows = this.row_slugs.map((row) =>
        row.map((slug) => {
          const value = this.inventory[slug]
          return {
            slug,
            numbers: getNumbers(value, world_options._packs?.[slug]),
            attrs: {
              class: [getIcon(slug, value), value > 99 && '-three-digits'],
              id: `grid-tracker__${slug}`,
            },
          }
        }),
      )
      if (!this.vanilla_objectives) {
        const objective_ids = Object.keys(this.objectives || {})
        const { columns } = this
        if (!this.mode) {
          rows[3].push(...rows.pop())
        }
        let row_index = rows.findIndex((r) => r.length < rows[0].length)
        if (row_index === -1) {
          row_index = rows.length
        }

        while (objective_ids.length > 0) {
          while (rows[row_index]?.length >= columns) {
            row_index++
          }
          if (!rows[row_index]) {
            rows.push([])
          }
          const slug = objective_ids.shift()
          const cased = kebabCase(slug)
          rows[row_index].push({
            slug,
            type: 'objective',
            attrs: {
              class: `smv-objective -${cased} -${this.objectives[slug] ? 'in' : ''}active`,
              id: `grid-tracker__${cased}`,
            },
          })
        }
      }
      return rows
    },
    style() {
      const { width } = this
      if (!width) {
        return {}
      }
      const columns = this.columns + 2 * 0.2 + 4 * 0.1 // number of columns + padding + gap

      return {
        fontSize: `${width / columns}px`, 
      }
    }
  },
  methods: {
    click(e, { slug, type } = {}) {
      if (type === 'objective') {
        this.$emit('toggle-objective', slug)
      } else if (packs.includes(slug)) {
        const amount = e.shiftKey || e.ctrlKey ? -1 : 1
        this.$emit('add-item', slug, amount)
      } else {
        this.$emit('toggle-item', slug)
      }
    },
  },
}
</script>
