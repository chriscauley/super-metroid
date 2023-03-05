<template>
  <div class="seed-settings" v-if="json_data">
    <div class="_row">
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
    <div v-if="tracker_debug.length" class="_row">
      <div v-for="row in tracker_debug" :key="row[0]" class="_col">
        <div class="_label">{{ row[0] }}</div>
        <div class="_value">{{ row[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const icons = {
  // remap icons to font awesome
  checkmark: 'check',
}

export default {
  inject: ['json_data', 'varia_state'],
  computed: {
    ws_icon() {
      const { ws_icon } = this.varia_state
      const icon = icons[ws_icon] || ws_icon
      document.body.dataset.connectionIcon = icon
      return `fa fa-${icon}`
    },
    tracker_debug() {
      const { tracker_debug } = this.$store.ui.state
      return Object.entries(tracker_debug || {})
    },
  },
}
</script>
