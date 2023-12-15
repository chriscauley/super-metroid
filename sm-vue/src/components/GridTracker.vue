<template>
  <div :class="`grid-tracker smi-tracker ${controlled ? '-controlled' : ''}`" :style="style">
    <div v-for="(row, i) in prepped_rows" :key="i" class="grid-tracker__row">
      <div v-for="cell in row" :key="cell.slug" class="grid-tracker__cell">
        <sm-cwisp-tracker
          v-if="cell.slug === 'cwisp'"
          :inventory="inventory"
          @toggle-item="(i) => !controlled && $emit('toggle-item', i)"
        />
        <div v-else v-bind="cell.attrs" @click="(e) => click(e, cell)" />
        <div v-if="cell.numbers" :class="`grid-tracker__numbers -length-${cell.numbers.length}`">
          <div v-for="(cls, j) in cell.numbers" :key="j" :class="cls" />
        </div>
        <i v-else-if="cell.target" class="fa fa-crosshairs _targeted" />
      </div>
    </div>
  </div>
</template>

<script>
import kebabCase from 'lodash.kebabcase'
import worlds from './worlds'

const slugifyObjective = (id) => kebabCase(id.toLowerCase().replace("'", ''))

const rows = [
  ['energy-tank', 'reserve-tank', 'missile', 'super-missile', 'power-bomb'],
  ['charge-beam', 'ice-beam', 'wave-beam', 'spazer-beam', 'plasma-beam'],
  ['morph-ball', 'varia-suit', 'spring-ball', 'hi-jump-boots', 'space-jump'],
  ['bomb', 'gravity-suit', 'ridley', 'speed-booster', 'screw-attack'],
  ['grappling-beam', 'kraid', 'phantoon', 'draygon', 'x-ray'],
]

const cwisp_4_cells = [
  ['cwisp', 'morph-ball', 'bomb', 'spring-ball'],
  ['hi-jump-boots', 'speed-booster', 'space-jump', 'screw-attack'],
  ['varia-suit', 'ridley', 'gravity-suit'],
  ['kraid', 'phantoon', 'draygon'],
]

const cwisp_5_cells = [
  ['cwisp', 'morph-ball', 'bomb', 'spring-ball', 'varia-suit'],
  ['hi-jump-boots', 'speed-booster', 'space-jump', 'screw-attack', 'gravity-suit'],
]

const packs = rows[0]

const getNumbers = (value, multiplier, pad = 2) => {
  if (!value || typeof value !== 'number') {
    return null
  }
  const displayValue = multiplier ? value * multiplier : value
  return displayValue
    .toString()
    .padStart(pad, 0)
    .split('')
    .map((n) => `smi-number -number-${n}`)
}

const minibosses = ['spore-spawn', 'crocomire', 'botwoon', 'golden-torizo']
const getIcon = (slug, value) => {
  if (VANILLA[slug] || minibosses.includes(slug)) {
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
    objective_order: Array, // optional (intenally tracked if missing)
  },
  emits: ['add-item', 'toggle-item', 'toggle-objective'],
  data() {
    return { targets: {}, orders: [] }
  },
  computed: {
    vanilla_objectives() {
      const ids = Object.keys(this.objectives || {})
      return [0, 4].includes(ids.length) && !ids.find((o) => !VANILLA[o])
    },
    row_slugs() {
      if (this.rows) {
        return this.rows
      }
      let row_slugs = rows.map((r) => r.slice())
      const world_options = worlds[this.world]
      if (this.mode === 'cwisp') {
        if (this.vanilla_objectives) {
          row_slugs = cwisp_4_cells.map((r) => r.slice())
        } else if (Object.keys(this.objectives || {}).length <= 6) {
          row_slugs = cwisp_4_cells
        } else {
          row_slugs = cwisp_5_cells.map((r) => r.slice())
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
          const id = objective_ids.shift()
          const cased = slugifyObjective(id)
          const orders = this.objective_order || this.orders
          let order
          if (orders?.includes(id)) {
            order = orders.indexOf(id) + 1
          }
          rows[row_index].push({
            // slug vs id is a bit confusing because the varia "ids" are human readable
            slug: id,
            type: 'objective',
            numbers: getNumbers(order, 1, 1),
            target: this.targets[id],
            attrs: {
              class: `smv-objective -${cased} -${this.objectives[id] ? 'in' : ''}active`,
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

      // number of columns + 2*padding + (columns-1)*gap
      const total_columns = this.columns + 2 * 0.2 + (this.columns - 1) * 0.1
      return { fontSize: `${width / total_columns}px` }
    },
  },
  watch: {
    objectives() {
      const keys = Object.keys(this.objectives)
      keys.forEach((key) => {
        if (this.objectives[key] && !this.orders.includes(key)) {
          this.orders.push(key)
        }
      })
      this.orders = this.orders.filter((k) => this.objectives[k])
    },
  },
  methods: {
    click(e, { slug, type } = {}) {
      if (type === 'objective') {
        if (this.objectives[slug] === undefined) {
          console.error('trying to toggle non-existant objective')
        } else if (e.shiftKey || e.ctrlKey) {
          this.targets[slug] = !this.targets[slug]
        } else {
          // this still emits even if controlled
          this.$emit('toggle-objective', slug)
        }
      } else if (packs.includes(slug)) {
        const amount = e.shiftKey || e.ctrlKey ? -1 : 1
        !this.controlled && this.$emit('add-item', slug, amount)
      } else {
        !this.controlled && this.$emit('toggle-item', slug)
      }
    },
  },
}
</script>
