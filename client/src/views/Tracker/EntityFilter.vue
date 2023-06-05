<template>
  <button :class="class_" @click="click">Filter: {{ display }}</button>
</template>

<script>
export default {
  inject: ['tool_storage'],
  computed: {
    value() {
      return this.$store.ui.state.entity_filter
    },
    class_() {
      return ['btn', this.value ? '-warning' : '-primary']
    },
    display() {
      const { value } = this
      if (!value) {
        return 'All'
      }
      return value.slice(0, 1).toUpperCase() + value.slice(1) + 's'
    },
  },
  methods: {
    click() {
      const { value } = this
      const values = [undefined, 'door', 'warp', 'item']
      const index = values.indexOf(value) + 1
      this.$store.ui.state.entity_filter = values[index % values.length]
    },
  },
}
</script>
