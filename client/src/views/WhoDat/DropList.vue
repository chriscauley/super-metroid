<template>
  <div v-if="drops.length" class="drop-list">
    <div v-for="drop in drops" :key="drop.icon" class="drop-list__cell" :title="drop.title">
      <i v-if="drop.icon" :class="drop.icon" />
      {{ drop.text }}
    </div>
  </div>
  <div v-else>No drops.</div>
</template>

<script>
import { startCase } from 'lodash'

const item_map = {
  super_: 'super-missile',
  missile: 'missile',
  pb: 'power-bomb',
  small: 'small-energy',
  large: 'large-energy',
}

export default {
  props: {
    enemy: Object,
  },
  computed: {
    drops() {
      const items = Object.keys(item_map)
        .filter((i) => this.enemy[i])
        .map((item) => {
          return {
            icon: `sm-drop -${item_map[item]}`,
            name: startCase(item),
            text: `${this.enemy[item]}%`,
            title: startCase(item_map[item]),
          }
        })
      if (this.enemy.damage) {
        items.unshift({
          icon: 'fa fa-bomb',
          text: this.damage,
          title: 'Damage (suitless/varia/gravity)',
        })
      }
      if (this.enemy.health) {
        items.unshift({
          icon: 'fa fa-heart',
          text: this.enemy.health + 'hp',
          title: 'Health',
        })
      }
      return items
    },
    damage() {
      const d = parseInt(this.enemy.damage)
      return `${d}/${Math.floor(d / 2)}/${Math.floor(d / 4)}`
    },
  },
}
</script>
