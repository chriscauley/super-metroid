import { startCase, cloneDeep } from 'lodash'
import { reactive } from 'vue'

export default (component) => {
  const isRandom = (param) => window.isElemIdRandom(param)
  const isTrue = (v) => String(v).toLowerCase() === 'true'
  const state = reactive({})

  const side_effects = {
    areaRando: () => {
      if (state.areaRando && state.areaLayoutCustom.length === 0) {
        state.areaLayoutCustom = window.PATCHES.areaLayout.map((p) => p.id)
      }
    },
  }

  const setObjectiveRandom = (value) => {
    if (state.initialized) {
      // first time this is run, reinitialize backup
      window.objectiveBackup[!value] = state.objective.slice()
    }
    state.objective = window.objectiveBackup[value]
    state.objectiveRandom = value

    updateObjectiveElements()
  }

  const updateObjectiveElements = () => {
    if (state.readonly) {
      return
    }
    const value = isTrue(state.objectiveRandom)
    // disable/enable relevant inputs
    window.disableElement('hiddenObjectives', !value)
    window.disableElement('distributeObjectives', !value)
    window.disableElement('nbObjective', !value)
    window.$('#nbObjectiveRandom').attr('disabled', !value)
    const dice = document.getElementById('objectiveRandom')
    dice.classList[value ? 'add' : 'remove']('active')
  }

  // TODO need to add objectives to customizer so we can display objectives widget
  const objectives_by_category = {}
  Object.entries(window.objectives_categories || {}).forEach(([objective, category]) => {
    objectives_by_category[category] = objectives_by_category[category] || []
    objectives_by_category[category].push(objective)
  })

  const getPatchKey = (group) => {
    return group + 'Custom'
  }

  const migratePreset = (original_data) => {
    // As the definition of a preset grows over time, we want to support legacy definitons
    // many people are running bots and external websites and we can't make them migrate
    const data = cloneDeep(original_data)
    if (data.layoutPatches) {
      // layout breaks the pattern with layoutPatches for the on/off setting
      data.layout = data.layoutPatches
      delete data.layoutPatches
    }
    if (isTrue(data.objectiveRandom)) {
      data.objective = data.objectiveMultiSelect
    }

    Object.keys(window.PATCHES).forEach((patch_group) => {
      const key = getPatchKey(patch_group)
      const all_patches = randomizer.getPatchIds(patch_group)
      if (data[patch_group] === 'off') {
        // backend doesn't save empty list, so user will get stuck with previous setting
        // force an empty list
        data[key] = []
      }
      if (data[patch_group] && !data[key]) {
        data[key] = data[patch_group] === 'on' ? all_patches : []
      }
      if (data[patch_group] === 'on' && data[key]?.length === 0) {
        // on and empty list is all
        data[key] = all_patches
      }
    })
    return data
  }

  const randomizer = {
    state,
    component,
    isRandom,
    set: (key, value) => {
      const changed = state[key] !== value
      state[key] = value
      changed && side_effects[key]?.()
    },
    init: (data) => {
      if (data.readonly) {
        data.objective = data.objective.split(',')
      }
      const fixed_data = migratePreset(data)
      Object.keys(state).forEach((key) => delete state[key])
      Object.assign(state, fixed_data)
      updateObjectiveElements()
      state.initialized = true
    },
    setPatches(group, value) {
      const group_key = getPatchKey(group)
      if (value === 'all') {
        state[group_key] = randomizer.getPatchIds(group)
      } else if (value === 'none') {
        state[group_key] = []
      }
    },
    togglePatch(patch) {
      const key = getPatchKey(patch.patch_group)
      if (state[key].includes(patch.id)) {
        state[key] = state[key].filter((i) => i !== patch.id)
      } else {
        state[key].push(patch.id)
      }
    },
    isPatchGroupAllowed(group) {
      if (state.readonly) {
        return true
      }
      if (group === 'areaLayout') {
        const value = state.areaRandomization
        if (value === 'random') {
          // if random, anything more than off is fine
          return !!state.areaRandomizationMultiSelect.find((v) => v !== 'off')
        }
        // if not random, anything other than off is fine
        return value !== 'off'
      }
      return true
    },
    getPatchIds(group) {
      return window.PATCHES[group].map((patch) => patch.id)
    },
    getPatches(group) {
      const enabled_patches = state[getPatchKey(group)]
      const allowed = randomizer.isPatchGroupAllowed(group)
      const icon = (active) => {
        if (state.readonly) {
          return active ? 'check' : 'close'
        }
        return active ? 'check-square-o' : 'square-o'
      }
      return window.PATCHES[group].map((patch) => {
        const active = allowed && enabled_patches?.includes(patch.id)
        return {
          ...patch,
          active,
          btn: `btn btn-xs btn-${active ? 'primary' : 'default'}`,
          icon: `fa fa-${icon(active)}`,
        }
      })
    },
    getAreaPatches() {
      const { areaRando, areaLayoutCustom } = state
      return Object.entries(window.PATCHES.areaLayout).map(([id, options]) => ({
        ...options,
        id,
        active: areaRando && areaLayoutCustom.includes(id),
        title: options.title || startCase(id),
      }))
    },
    mountHelp(target) {
      state.tour_target = target
      state.tour_hash = Math.random() // forces re-render even if target did not change
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

  const blockReadonly = (o, keys) => {
    keys.forEach((key) => {
      const func = o[key]
      o[key] = (...args) => {
        if (state.readonly) {
          console.warn('attempted to modify randomizer in readonly mode', ...args)
          return null
        }
        return func(...args)
      }
    })
  }

  blockReadonly(randomizer, ['set', 'setPatches', 'togglePatch'])
  blockReadonly(randomizer.objective, ['toggle', 'add', 'remove', 'setRandom'])

  window.$randomizer = randomizer
  return randomizer
}
