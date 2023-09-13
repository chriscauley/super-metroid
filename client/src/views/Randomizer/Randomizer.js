import { startCase } from 'lodash'
import { reactive } from 'vue'

export default (component) => {
  const isRandom = (param) => window.isElemIdRandom(param)
  const state = reactive({})

  const side_effects = {
    areaRando: () => {
      if (state.areaRando && state.areaLayoutCustom.length === 0) {
        state.areaLayoutCustom = Object.keys(window.AREA_PATCHES)
      }
    },
  }

  const setObjectiveRandom = (value) => {
    if (state.objective) {
      window.objectiveBackup[!value] = state.objective.slice()
    }
    state.objective = window.objectiveBackup[value]
    state.objectiveRandom = value

    // disable/enable relevant inputs
    window.disableElement('hiddenObjectives', !value)
    window.disableElement('nbObjective', !value)
    window.$('#nbObjectiveRandom').attr('disabled', !value)
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
    set: (key, value) => {
      const changed = state[key] !== value
      state[key] = value
      changed && side_effects[key]?.()
    },
    init: (data) => Object.assign(state, data),
    getAreaPatches() {
      const { areaRando, areaLayoutCustom } = state
      return Object.entries(window.AREA_PATCHES).map(([slug, options]) => ({
        ...options,
        slug,
        active: areaRando && areaLayoutCustom.includes(slug),
        title: options.title || startCase(slug),
      }))
    },
    objective: {
      setRandom: setObjectiveRandom,
      by_category: objectives_by_category,
      getMax() {
        if (isRandom('objective')) {
          return Infinity
        }
        const majorsSplit = document.getElementById('majorsSplit').value
        return majorsSplit === 'Scavenger' ? 17 : 18
      },
      add(objective) {
        if (!state.objective.includes(objective)) {
          state.objective.push(objective)
        }
      },
      remove(objective) {
        state.objective = state.objective.filter((o) => o !== objective)
      },
      toggle(objective) {
        if (!state.objective.includes(objective)) {
          randomizer.objective.add(objective)
        } else {
          randomizer.objective.remove(objective)
        }
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

        if (randomizer.objective.getMax() === state.objective.length) {
          // Cannot add more objectives because we've reached max amount
          const reason = 'You cannot add any more objectives for this splits mode'
          Object.keys(window.objectives_categories)
            .filter((o) => !selected_map[o])
            .forEach((o) => (disabled_map[o] = reason))
          return disabled_map
        }

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
            const reason = `There are too many ${type} objectives`
            disabled_map[objective] = reason
          } else if (window.is_count_objective(objective)) {
            const type = window.get_count_objective_type(objective)
            const count = window.get_objectives_count(type, selected_objectives)
            for (let i = 0; i < selected_objectives.length; i++) {
              const toTest = selected_objectives[i]
              if (window.get_limit_objective_type(toTest) == type) {
                const limit = window.get_limit_objective_limit(toTest)
                if (count >= limit) {
                  const reason = `There are too many ${type} objectives`
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
        const disabled_objectives = randomizer.objective.getDisabledMap()
        if (category.partial || category.checked) {
          // deselect all objectives in category
          category.objectives.forEach((o) => randomizer.objective.remove(o))
        } else {
          // mark every non-disabled objective as selected
          category.objectives
            .filter((o) => !disabled_objectives[o])
            .forEach((o) => randomizer.objective.add(o))
        }
      },
    },
  }

  window.$randomizer = randomizer
  return randomizer
}
