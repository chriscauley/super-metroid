<template>
  <unrest-popper class="varia-picker" placement="bottom" title="Choose new color" @click.stop>
    <div>
      <div class="varia-picker__title">Choose door new color for:</div>
      <div class="varia-picker__selected">{{ display }}</div>
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
import { startCase } from 'lodash'
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
    display() {
      return startCase(this.door_id)
    },
    mousetrap() {
      return { '1,2,3,4,5,6,7,8,9': this.keyPress }
    },
    colors() {
      return Object.entries(door_item_by_color).map(([color, item], index) => ({
        value: color,
        class: [
          `varia-picker__door -bg-door -${color}`,
          this.current_color === color && '-selected',
        ],
        icon: `sm-item -${item}`,
        key: `${index + 1}`,
      }))
    },
  },
  mounted() {
    document.addEventListener('click', this.close)
  },
  unmount() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    updateDoorColor(value) {
      this.tool_storage.updateDoorColor(this.door_id, value, this.current_color)
    },
    keyPress(event) {
      const color = this.colors.find((c) => c.key === event.key)
      this.updateDoorColor(color.value)
    },
    close() {
      this.tool_storage.clickDoor(null)
    },
  },
}
</script>
