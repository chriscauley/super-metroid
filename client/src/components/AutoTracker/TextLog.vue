<template>
  <div class="text-log">
    <div class="text-log__index">
      {{ index }}
    </div>
    <div class="text-log__text">
      <span v-if="source.count > 1">{{ source.count }}x</span>
      {{ source.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextLog',
  props: {
    index: Number,
    source: Object,
  },
}
</script>
