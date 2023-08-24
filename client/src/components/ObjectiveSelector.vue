<template>
  <div class="objective-selector">
    <div
      v-for="category in categories"
      class="objective-selector__category"
      :key="category.name"
    >
      <h4 :class="category.class">
        <div v-if="!category.is_random">{{ category.name }}</div>
        <label v-else>
          <input
            type="checkbox"
            :checked="category.checked"
            @input="toggleCategory(category)"
          />
          {{ category.name }}
        </label>
      </h4>
      <div
        v-for="objective in category.objectives"
        :key="objective"
        :class="objectiveClass(objective)"
      >
        <label :title="disabled_objectives[objective]">
          <input type="checkbox" v-model="modelValue[objective]" :disabled="!!disabled_objectives[objective]" />
          {{ objective }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
const isRandom = () => window.isElemIdRandom("objective")

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
    window.get_selected_objectives().forEach(o => modelValue[o] = true)

    return { objectives_by_category, modelValue }
  },
  watch: {
    modelValue() {
      inupt.value = this.selected_array
    }
  },
  computed: {
    categories() {
      const is_random = isRandom()
      return Object.entries(this.objectives_by_category).map(([name, objectives]) => {
        const checked = objectives.filter((o) => this.modelValue[o]).length
        const partial = is_random && checked > 0 && checked < objectives.length
        return {
          name,
          objectives,
          checked,
          partial,
          is_random,
          class: ['checkbox', partial && '-partial'],
        }
      })
    },
    selected_array() {
      return Object.keys(this.modelValue).filter(o => this.modelValue[o])
    },
    disabled_objectives() {
      // an object of disabled ojectives and why they are disabled
      const disabled_objectives = {}
      if (isRandom()) {
        return disabled_objectives
      }

      const { objectives_exclusions, is_clear_area_objective } = window
      const selectedArray = this.selected_array
      const tourian = document.getElementById("tourian").value
      const majorsSplit = document.getElementById("majorsSplit").value
      const objective_counts = { boss: 0, miniboss: 0 }
      Object.entries(window.objectives_types).forEach(([type, objectives]) => {
        objectives.forEach((objective) => {
          if (this.modelValue[objective]) {
            objective_counts[type] ++
          }
        })
      })

      Object.entries(objectives_exclusions).forEach(([objective, options]) => {
        if (this.modelValue[objective]) {
          options.list?.forEach((blocked_objective) => {
            const reason = `This objective cannot be used with ${objective}`
            disabled_objectives[blocked_objective] = reason
          })
        }
        const { type, limit } = options
        if (type && objective_counts[type] > limit) {
          const reason = `This objective can only be used with ${limit} ${type} objectives`
          disabled_objectives[objective] = reason
        } else if (window.is_count_objective(objective)) {
          const type = window.get_count_objective_type(objective);
          const count = window.get_objectives_count(type, selectedArray);
          for(let i=0; i<selectedArray.length; i++) {
            const toTest = selectedArray[i];
            if (window.get_limit_objective_type(toTest) == type) {
              const limit = window.get_limit_objective_limit(toTest);
              if(count >= limit) {
                const reason = `This objective can only be used with ${limit} ${type} objectives`
                disabled_objectives[objective] = reason
              }
            }
          }
        } else if (is_clear_area_objective(objective)) {
          if (tourian === "Disabled") {
            const reason = 'Clear ojectives cannot be used with disabled tourian.'
            disabled_objectives[objective] = reason
          } else if (majorsSplit === "Scavenger") {
            const reason = 'Clear ojectives cannot be used with scavenger splits.'
            disabled_objectives[objective] = reason
          }
        }
      })

      // If it's already selected, it's not disabled
      this.selected_array.forEach(o => delete disabled_objectives[o])
      return disabled_objectives
    }
  },
  methods: {
    toggleCategory(category) {
      if (category.partial || !category.checked) {
        // mark every non-disabled objective as selected
        category.objectives
          .filter(o => !this.disabled_objectives[o])
          .forEach((o) => this.modelValue[o] = true)
      } else {
        category.objectives.forEach((o) => this.modelValue[o] = false)
      }
      const input = document.getElementById('#selectedObjectives')
    },
    objectiveClass(objective) {
      return [
        'checkbox',
        this.disabled_objectives[objective] && '-disabled'
      ]
    }
  },
}
</script>
