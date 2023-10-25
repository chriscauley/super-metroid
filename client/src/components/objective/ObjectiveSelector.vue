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
      <div
        v-for="objective in category.objectives"
        :key="objective.id"
        :class="['checkbox', objective.disabled && '-disabled']"
      >
        <label :title="objective.disabled">
          <input
            type="checkbox"
            @input="$emit('toggle-objective', objective.id)"
            :checked="objective.selected"
            :disabled="!!objective.disabled"
          />
          {{ objective.id }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['randomizer'],
  props: {
    categories: Array,
    is_random: Boolean,
  },
  emits: ['toggle-objective', 'toggle-category'],
}
</script>
