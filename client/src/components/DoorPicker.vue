<template>
  <unrest-popper class="door-picker" placement="bottom" title="Choose new color" @click.stop>
    <div>
      <div class="door-picker__title">Choose door new color for:</div>
      <div>{{ door_id }}</div>
    </div>
    <div class="door-picker__colors">
      <div v-for="color in colors" :key="color.value">
        <div :class="color.class" @click="updateDoorColor(color.value)" :title="color.value">
          <i :class="color.icon" />
        </div>
      </div>
    </div>
  </unrest-popper>
</template>

<script>
import { door_item_by_color } from '@/data/old'

export default {
  inject: ['tool_storage'],
  props: {
    current_color: String,
    door_id: String,
  },
  computed: {
    colors() {
      return Object.entries(door_item_by_color).map(([color, item]) => ({
        value: color,
        class: [`door-picker__door -${color}`, this.current_color === color && '-selected'],
        icon: `sm-item -${item}`,
      }))
    },
  },
  methods: {
    updateDoorColor(value) {
      this.tool_storage.updateDoorColor(this.door_id, value, this.current_color)
    },
  },
}
</script>
