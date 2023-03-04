<template>
  <div :class="wrapper_class">
    <div v-for="group in groups" :key="group.name" :class="group.class">
      <div v-for="(child, i) in group.children" :key="i" v-bind="child" />
    </div>
  </div>
</template>

<script>
import { range } from 'lodash'

const css = {
  item: (_class) => ({ class: _class }),
  group: (name, c) => [`pause-inventory__group -group-${name}`, c],
  number: (n) => css.item(`smi-number -number-${n}`),
  numbers: (n, p) => n.toString().padStart(p, 0).split('').map(css.number),
}

css.separator = css.item('flex-grow')

const energyTanks = (n, flag) => ({
  name: 'energy-tanks',
  children: range(n).map(() => css.item('smi -ietank')),
  class: css.group('energy-tanks', flag),
})

const soloGroup = (name) => ({
  name: name,
  class: css.group(name),
  children: [css.item('smi -' + name)],
})

const item_groups = {
  beams: ['charge', 'ice', 'wave', 'spazer', 'plasma'].map((n) => n + '-beam'),
  suits: ['varia-suit', 'gravity-suit'],
  misc: ['morph-ball', 'bomb', 'spring-ball', 'screw-attack'],
  boots: ['hi-jump-boots', 'space-jump', 'speed-booster'],
}

const hud_items = ['missile', 'super-missile', 'power-bomb', 'grappling-beam', 'x-ray']

export default {
  props: {
    inventory: Object,
    controlled: Boolean,
  },
  emits: ['add-item', 'toggle-item'],
  computed: {
    wrapper_class() {
      return [
        'pause-inventory smi-pause-screen',
        this.controlled && '-controlled',
        this.inventory['super-missile'] > 99 && '-high-super-missile',
        this.inventory['power-bomb'] > 99 && '-high-power-bomb',
      ]
    },
    groups() {
      const out = [
        ...this.energy_tanks,
        this.hud_items,
        this.reserve_tanks,
        this.energy_text,
        ...this.pack_numbers,
        ...this.item_groups,
        ...this.pack_controls,
      ]
      if (this.inventory['reserve-tank']) {
        out.push(soloGroup('auto'))
        out.push(soloGroup('reserve_text'))
      }
      return out
    },
    hud_items() {
      return {
        name: 'hud-items',
        class: css.group('hud-items'),
        children: hud_items.map((item) => ({
          class: ['smi -i' + item, this.inventory[item] || '-inactive'],
          onclick: () => this.$emit('toggle-item', item),
        })),
      }
    },
    pack_numbers() {
      return ['missile', 'super-missile', 'power-bomb'].map((name) => ({
        name,
        class: css.group(name),
        children: css.numbers(this.inventory[name] || 0, name === 'missile' ? 3 : 2),
      }))
    },
    pack_controls() {
      const packs = ['missile', 'super-missile', 'power-bomb', 'energy-tank', 'reserve-tank']
      return packs.map((name) => ({
        name: `${name} controls`,
        class: css.group(name + '-controls'),
        children: [
          {
            class: '_plus',
            onclick: () => this.$emit('add-item', name, 1),
          },
          {
            class: '_minus',
            onclick: () => this.$emit('add-item', name, -1),
          },
        ],
      }))
    },
    energy_tanks() {
      const count = this.inventory['energy-tank']
      return [energyTanks(Math.min(count, 7)), energyTanks(Math.max(count - 7, 0), '-top')]
    },
    reserve_tanks() {
      const amount = this.inventory['reserve-tank']
      const tanks = range(Math.floor(amount)).map(() => css.item('smi -ireserve'))
      const children = [...tanks, css.separator]
      if (amount > 0) {
        const chars = (100 * amount).toString().split('')
        chars.forEach((i) => children.push(css.item(`smi-reserve-number -number-${i}`)))
      }
      return {
        name: 'reserve-tanks',
        class: css.group('reserve-tanks'),
        children,
      }
    },
    energy_text() {
      return {
        name: 'energy-text',
        class: css.group('energy-text'),
        children: [css.item('smi -energy'), css.separator, css.number(9), css.number(9)],
      }
    },
    item_groups() {
      return Object.entries(item_groups).map(([name, items]) => ({
        name,
        class: css.group(name),
        children: items.map((item) => ({
          class: [`smi-pause-item -${item}`, this.inventory[item] || '-inactive'],
          onclick: () => this.$emit('toggle-item', item),
        })),
      }))
    },
  },
}
</script>
