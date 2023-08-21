<template>
  <div class="objective-selector">
    <div
      v-for="category in categories"
      class="objective-selector__category"
      :key="category.name"
    >
      <h4 :class="category.class">
        <label>
          <input
            type="checkbox"
            :checked="category.checked"
            @input="toggleCategory(category)"
          />
          {{ category.name }}
        </label>
      </h4>
      <div v-for="objective in category.objectives" :key="objective" class="checkbox">
        <label>
          <input type="checkbox" v-model="modelValue[objective]" />
          {{ objective }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const objectives_by_category = {}
    const { objectives_categories } = window
    Object.entries(objectives_categories).forEach(([objective, category]) => {
      if (!objectives_by_category[category]) {
        objectives_by_category[category] = []
      }
      objectives_by_category[category].push(objective)
    })
    const modelValue = {}
    return { objectives_by_category, modelValue }
  },
  computed: {
    categories() {
      return Object.entries(this.objectives_by_category).map(([name, objectives]) => {
        const checked = objectives.filter((o) => this.modelValue[o]).length
        const partial = checked !== objectives.length
        return {
          name,
          objectives,
          checked,
          partial,
          class: ['checkbox', partial && '-partial'],
        }
      })
    },
  },
  methods: {
    toggleCategory(category) {
      const value = category.partial || !category.checked
      category.objectives.forEach((o) => (this.modelValue[o] = value))
    },
  },
}
</script>
