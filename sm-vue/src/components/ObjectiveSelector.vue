<template>
  <div class="objective-selector">
    <div v-for="category in categories" class="objective-selector__category" :key="category.id">
      <h4 :class="category.class">
        <label v-if="is_random">
          <input
            type="checkbox"
            :checked="category.checked"
            @input="$emit('toggle-category', category)"
          />
          {{ category.id }}
        </label>
        <div v-else>{{ category.id }}</div>
      </h4>
      <div class="objective-selector__button-list">
        <button
          v-for="objective in category.objectives"
          :key="objective.id"
          :class="getClass(objective)"
          :title="objective.disabled"
          @click="!objective.disabled && $emit('toggle-objective', objective.id)"
          >
          <i :class="objective.icon" />
          <span class="objective-selector__name">
            {{ short_names ? objective.short : objective.id }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// coppied from ObjectiveBlock in client repo
const cat_map = {
  bosses: 'danger',
  minibosses: 'warning',
  items: 'primary',
  map: 'success',
  memes: 'info',
  enemies: 'default',
}

export default {
  props: {
    categories: Array,
    is_random: Boolean,
    short_names: Boolean,
  },
  emits: ['toggle-objective', 'toggle-category'],
  methods: {
    getClass(objective) {
      const btn = objective.selected ? cat_map[objective.category] : 'empty'
      return [
        `btn btn-${btn} -objective`,
        objective.disabled && '-disabled',
      ]
    }
  }
}
</script>
