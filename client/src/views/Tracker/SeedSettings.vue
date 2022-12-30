<template>
  <div class="seed-settings">
    <div class="_col">
      <div class="_label">Current Seed:</div>
      <div class="_value">{{ rom || 'n/a' }}</div>
    </div>
    <div class="_col">
      <div class="_label">Current Preset:</div>
      <div class="_value">{{ preset || 'n/a' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rom: String,
    preset: String,
  },
}
</script>
