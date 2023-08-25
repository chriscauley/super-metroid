<template>
  <div class="objective-selector">
    <div v-for="category in categories" class="objective-selector__category" :key="category.name">
      <h4 :class="category.class">
        <div v-if="!category.is_random">{{ category.name }}</div>
        <label v-else>
          <input type="checkbox" :checked="category.checked" @input="toggleCategory(category)" />
          {{ category.name }}
        </label>
      </h4>
      <div
        v-for="objective in category.objectives"
        :key="objective"
        :class="objectiveClass(objective)"
      >
        <label :title="disabled_objectives[objective]">
          <input
            type="checkbox"
            @input="randomizer.objective.toggle(objective)"
            :checked="selected_objectives[objective]"
            :disabled="!!disabled_objectives[objective]"
          />
          {{ objective }}
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
