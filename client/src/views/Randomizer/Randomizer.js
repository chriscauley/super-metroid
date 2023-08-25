import { reactive } from 'vue'

export default (component) => {
  const isRandom = (param) => window.isElemIdRandom(param)
  const state = reactive({})

  const setObjectiveRandom = (value) => {
    state.objective = window.objectiveBackup[value]
  }

  setObjectiveRandom(isRandom('objective'))

  const objectives_by_category = {}
  Object.entries(window.objectives_categories).forEach(([objective, category]) => {
    objectives_by_category[category] = objectives_by_category[category] || []
    objectives_by_category[category].push(objective)
  })

  const randomizer = {
    state,
    component,
    isRandom,
    setRandom: setObjectiveRandom,
    objective: {
      by_category: objectives_by_category,
      add(objective) {
        if (!state.objective.includes(objective)) {
          state.objective.push(objective)
        }
        randomizer.objective._syncBackup()
      },
      remove(objective) {
        state.objective = state.objective.filter((o) => o !== objective)
        randomizer.objective._syncBackup()
      },
      toggle(objective) {
        if (!state.objective.includes(objective)) {
          randomizer.objective.add(objective)
        } else {
          randomizer.objective.remove(objective)
        }
      },
      _syncBackup() {
        const _is_random = isRandom('objective')
        window.objectiveBackup[_is_random] = state.objective.slice()
      },
      getSelectedMap() {
        const selected_map = {}
        state.objective.forEach((o) => (selected_map[o] = true))
        return selected_map
      },
      getCategories() {
        const is_random = randomizer.isRandom('objective')
        const selected_map = randomizer.objective.getSelectedMap()
        return Object.entries(randomizer.objective.by_category).map(([name, objectives]) => {
          const checked = objectives.filter((o) => selected_map[o]).length
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
      getDisabledMap() {
        // an object of disabled ojectives and why they are disabled
        const disabled_map = {}
        if (randomizer.isRandom('objective')) {
          return disabled_map
        }
        const selected_map = randomizer.objective.getSelectedMap()

        const { objectives_exclusions, is_clear_area_objective } = window
        const selected_objectives = state.objective
        const tourian = document.getElementById('tourian').value
        const majorsSplit = document.getElementById('majorsSplit').value
        const objective_counts = { boss: 0, miniboss: 0 }
        Object.entries(window.objectives_types).forEach(([type, objectives]) => {
          objectives.forEach((objective) => {
            if (selected_map[objective]) {
              objective_counts[type]++
            }
          })
        })

        Object.entries(objectives_exclusions).forEach(([objective, options]) => {
          if (selected_map[objective]) {
            options.list?.forEach((blocked_objective) => {
              const reason = `This objective cannot be used with ${objective}`
              disabled_map[blocked_objective] = reason
            })
          }
          const { type, limit } = options
          if (type && objective_counts[type] > limit) {
            const reason = `This objective can only be used with ${limit} ${type} objectives`
            disabled_map[objective] = reason
          } else if (window.is_count_objective(objective)) {
            const type = window.get_count_objective_type(objective)
            const count = window.get_objectives_count(type, selected_objectives)
            for (let i = 0; i < selected_objectives.length; i++) {
              const toTest = selected_objectives[i]
              if (window.get_limit_objective_type(toTest) == type) {
                const limit = window.get_limit_objective_limit(toTest)
                if (count >= limit) {
                  const reason = `This objective can only be used with ${limit} ${type} objectives`
                  disabled_map[objective] = reason
                }
              }
            }
          } else if (is_clear_area_objective(objective)) {
            if (tourian === 'Disabled') {
              const reason = 'Clear ojectives cannot be used with disabled tourian.'
              disabled_map[objective] = reason
            } else if (majorsSplit === 'Scavenger') {
              const reason = 'Clear ojectives cannot be used with scavenger splits.'
              disabled_map[objective] = reason
            }
          }
        })

        // If it's already selected, it's not disabled
        Object.keys(selected_map).forEach((o) => delete disabled_map[o])
        return disabled_map
      },
      toggleCategory(category) {
        if (category.partial || !category.checked) {
          // mark every non-disabled objective as selected
          category.objectives
            .filter((o) => !this.disabled_objectives[o])
            .forEach((o) => randomizer.objective.add(o))
        } else {
          category.objectives.forEach((o) => randomizer.objective.remove(o))
        }
      },
    },
  }

  window.$randomizer = randomizer
  return randomizer
}
