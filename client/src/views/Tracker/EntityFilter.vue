<template>
  <button class="btn -primary" @click="tool_storage.nextEntityFilter">
    Filter: {{ tool_storage.getEntityFilterDisplay() }}
  </button>
</template>

<script>
export default {
  inject: ['tool_storage'],
}
</script>
