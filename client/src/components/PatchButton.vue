<template>
  <button
    :class="css.btn"
    @click="randomizer.togglePatch(patch)"
    type="button"
  >
    <i :class="css.icon" />
    {{ patch.title }}
  </button>
</template>

<script>
export default {
  inject: ['randomizer'],
  props: {
    patch: Object,
  },
  computed: {
    css() {
      const { active } = this.patch
      return {
        btn: [`btn btn-xs btn-${active ? 'primary' : 'default'}`],
        icon: `fa fa-${active ? 'check-square-o' : 'square-o'}`,
      }
    }
  },
}
</script>