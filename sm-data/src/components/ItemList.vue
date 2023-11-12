<template>
  <div>
    <div v-for="(items, group) in items_by_group" :key="group">
      <h2>{{ group }}</h2>
      <ul>
        <li v-for="item in items" :key="item">
          <i :class="getIcon(item)" />
          {{ getDisplay(item) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { items_by_group, varia } from '@/data'

export default {
  data() {
    return { items_by_group }
  },
  methods: {
    getDisplay(item) {
      return varia.variaToDisplay(varia.smToVaria(item))
    },
    getIcon(item) {
      return varia.getIcon(varia.smToVaria(item))
    },
  },
}
</script>
