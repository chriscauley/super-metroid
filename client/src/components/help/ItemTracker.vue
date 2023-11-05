<template>
  <div class="objective-help">
    <div
      v-for="(objectives, category) in objectives_by_category"
      :key="category"
      class="objective-help__category"
    >
      <h4>{{ category }}</h4>
      <div class="objective-help__list">
        <div v-for="(column, i) in getColumns(objectives)" :key="i">
          <div v-for="objective in column" :key="objective.id" class="objective-help__item">
            <i :class="objective.icon" />
            <div class="objective-help__title">
              {{ objective.id }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import varia from '@/varia'
export default {
  data() {
    return {
      objectives_by_category: varia.objective.by_category,
    }
  },
  methods: {
    getColumns(objectives) {
      if (objectives.length > 8) {
        return [objectives.slice(0, 8), objectives.slice(8)]
      }
      return [objectives]
    },
  },
}
</script>
