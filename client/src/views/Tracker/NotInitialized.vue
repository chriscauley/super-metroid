<template>
  <div>
    In order to use the {{ noun }} you must first initialize.
    <br />
    Click the play button to initialize or click help for instructions.
  </div>
</template>

<script>
export default {
  computed: {
    noun() {
      return window.location.pathname.includes('tracker') ? 'tracker' : 'plando'
    },
  },
}
</script>
