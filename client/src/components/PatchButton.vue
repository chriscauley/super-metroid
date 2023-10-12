<template>
  <button :class="patch.btn" @click="randomizer.togglePatch(patch)" type="button">
    <i :class="patch.icon" />
    {{ patch.title }}
  </button>
</template>

<script>
export default {
  inject: ['randomizer'],
  props: {
    patch: Object,
  },
}
</script>
