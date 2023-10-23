<template>
  <div class="objective-selector">
    <div v-for="category in categories" class="objective-selector__category" :key="category.id">
      <h4 :class="category.class">
        <div v-if="!category.is_random">{{ category.id }}</div>
        <label v-else>
          <input type="checkbox" :checked="category.checked" @input="toggleCategory(category)" />
          {{ category.id }}
        </label>
      </h4>
      <div
        v-for="objective_id in category.objective_ids"
        :key="objective_id"
        :class="objectiveClass(objective_id)"
      >
        <label :title="disabled_objectives[objective_id]">
          <input
            type="checkbox"
            @input="randomizer.objective.toggle(objective_id)"
            :checked="selected_objectives[objective_id]"
            :disabled="!!disabled_objectives[objective_id]"
          />
          {{ objective_id }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['randomizer'],
  computed: {
    categories() {
      return this.randomizer.objective.getCategories()
    },
    disabled_objectives() {
      return this.randomizer.objective.getDisabledMap()
    },
    selected_objectives() {
      return this.randomizer.objective.getSelectedMap()
    },
  },
  methods: {
    toggleCategory(category) {
      this.randomizer.objective.toggleCategory(category)
    },
    objectiveClass(objective) {
      return ['checkbox', this.disabled_objectives[objective] && '-disabled']
    },
  },
}
</script>
