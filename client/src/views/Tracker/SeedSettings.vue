<template>
  <div class="seed-settings" v-if="json_data">
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
  props: {
    json_data: Object,
  },
}
</script>
