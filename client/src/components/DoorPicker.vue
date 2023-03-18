<template>
  <unrest-popper class="varia-picker" placement="bottom" title="Choose new color" @click.stop>
    <div>
      <div class="varia-picker__title">Choose door new color for:</div>
      <div>{{ door_id }}</div>
    </div>
    <div class="varia-picker__colors">
      <div v-for="color in colors" :key="color.value">
        <div :class="color.class" @click="updateDoorColor(color.value)" :title="color.value">
          <i :class="color.icon" />
          <span class="varia-picker__key">{{ color.key }}</span>
        </div>
      </div>
    </div>
  </unrest-popper>
</template>

<script>
import Mousetrap from '@unrest/vue-mousetrap'
import { door_item_by_color } from '@/data/old'

export default {
  mixins: [Mousetrap.mixin],
  inject: ['tool_storage'],
  props: {
    current_color: String,
    door_id: String,
  },
  computed: {
    mousetrap() {
      return { '1,2,3,4,5,6,7,8': this.keyPress }
    },
    colors() {
      return Object.entries(door_item_by_color).map(([color, item], index) => ({
        value: color,
        class: [
          `varia-picker__door -bg-door -${color}`,
          this.current_color === color && '-selected',
        ],
        icon: `sm-item -${item}`,
        key: index + 1,
      }))
    },
  },
  methods: {
    updateDoorColor(value) {
      this.tool_storage.updateDoorColor(this.door_id, value, this.current_color)
    },
    keyPress(event) {
      const color = this.colors[event.key - 1]
      this.updateDoorColor(color.value)
    },
  },
}
</script>
