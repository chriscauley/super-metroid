<template>
  <div style="max-width: 600px">
    <unrest-markdown :source="content" />
  </div>
</template>

<script>
import content from 'raw-loader!./_help.md'

export default {
  data() {
    return { content }
  },
}
</script>
