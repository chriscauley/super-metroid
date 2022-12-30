<template>
  <div style="background: black" class="-pixelated">
    <pause-inventory
      :inventory="inventory"
      @toggle-item="toggleItem"
      @add-item="addItem"
      controlled
    />
    <div class="sm-item -missile" />
    <div>
      <div v-for="icon in inventory_icons" :key="icon" :class="icon" />
    </div>
  </div>
</template>

<script>
import PauseInventory from '@/components/PauseInventory'

const inventory_icons = [
  'smi -auto',
  'smi -energy',
  'smi -ietank',
  'smi -igrapple',
  'smi -ixray',
  'smi -imissile',
  'smi -isuper',
  'smi -ireserve',
]

let i = 0
while (i < 10) {
  inventory_icons.push(`smi-number -number-${i}`)
  i++
}
i = 0
while (i < 5) {
  inventory_icons.push(`smi-reserve-number -number-${i}`)
  i++
}

const menu_items =
  'charge-beam ice-beam wave-beam spazer-beam plasma-beam varia-suit gravity-suit morph-ball bomb spring-ball screw-attack hi-jump-boots space-jump speed-booster'.split(
    ' ',
  )

menu_items.forEach((item) => inventory_icons.push(`smi-menu-item -${item}`))
menu_items.forEach((item) => inventory_icons.push(`smi-menu-item -${item} -inactive`))

const inventory = {
  'energy-tank': 9,
  reserve: 300,
  missile: 125,
  'super-missile': 27,
  'power-bomb': 14,
}

const max_items = {
  missile: 995,
  'super-missile': 255,
  'power-bomb': 255,
  reserve: 400,
  'energy-tank': 14,
}

export default {
  components: { PauseInventory },
  data() {
    return { inventory_icons, inventory }
  },
  methods: {
    addItem(name, amount) {
      if (['missile', 'super-missile', 'power-bomb'].includes(name)) {
        amount = amount * 5
      }
      if (name === 'reserve-tank') {
        amount = amount * 100
        name = 'reserve'
      }
      this.inventory[name] = Math.max(0, (this.inventory[name] || 0) + amount)
      this.inventory[name] = Math.min(this.inventory[name], max_items[name])
    },
    toggleItem(name) {
      this.inventory[name] = !this.inventory[name]
    },
  },
}
</script>
