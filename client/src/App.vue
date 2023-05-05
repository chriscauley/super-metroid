<template>
  <router-view />
  <unrest-ui />
</template>

<script>
export default {
  name: 'App',
  mounted() {
    document.body.classList.add('theme-dark_mode');
  }
}
</script>
