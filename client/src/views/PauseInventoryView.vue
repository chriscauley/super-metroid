<template>
  <div>
    <pause-inventory
      :inventory="inventory"
      @toggle-item="toggleItem"
      @add-item="addItem"
      :controlled="state.controlled"
    />
  </div>
</template>

<script>
const max_items = {
  missile: 995,
  'super-missile': 255,
  'power-bomb': 255,
  reserve: 400,
  'energy-tank': 14,
}

export default {
  data() {
    const state = { controlled: false }
    const inventory = {}
    return { state, inventory }
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
