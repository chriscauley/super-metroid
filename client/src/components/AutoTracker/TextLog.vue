<template>
  <div class="text-log">
    <div class="text-log__index">
      {{ index }}
    </div>
    <div class="text-log__text">
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
