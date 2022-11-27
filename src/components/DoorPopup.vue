<template>
  <div id="doorPopup" class="doorPopup">
    <table class="full">
      <tr>
        <td colspan="8"></td>
      </tr>
      <tr>
        <td id="doorGrab" colspan="8" class="center greyRow">Choose door new color</td>
      </tr>
      <tr>
        <td colspan="8" class="blankRow"></td>
      </tr>
      <tr>
        <td v-for="color in door_colors" :key="color">
          <div :id="`${color}DoorSelect`" @click="updateDoorColor(color)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { door_colors } from '@/data/old'
import todo from '@/store/todo'

export default {
  data() {
    return { door_colors }
  },
  methods: {
    updateDoorColor: todo('DoorPopu.updateDoorColor'),
  },
}
</script>
