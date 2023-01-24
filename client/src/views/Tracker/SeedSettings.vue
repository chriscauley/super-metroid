<template>
  <div class="seed-settings" v-if="json_data">
    <div class="_col">
      <div class="_label">Connection:</div>
      <div class="_value"><i :class="ws_icon" /></div>
    </div>
    <div class="_col">
      <div class="_label">Current Preset:</div>
      <div class="_value">{{ json_data.preset || 'n/a' }}</div>
    </div>
    <div class="_col">
      <div class="_label">Current Seed:</div>
      <div class="_value">{{ json_data.seed || 'n/a' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['json_data', 'varia_state'],
  computed: {
    ws_icon() {
      const { ws_icon } = this.varia_state
      const icons = {
        // remap icons to font awesome
        checkmark: 'check',
      }
      return `fa fa-${icons[ws_icon] || ws_icon}`
    },
  },
}
</script>
