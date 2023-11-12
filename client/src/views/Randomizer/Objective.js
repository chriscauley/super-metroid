import { varia } from 'sm-data'

export default (randomizer) => {
  const isTrue = (v) => String(v).toLowerCase() === 'true'
  const setObjectiveRandom = (value) => {
    const { state } = randomizer
    if (state.initialized) {
      // first time this is run, reinitialize backup
      window.objectiveBackup[!value] = state.objective.slice()
    }
    state.objective = window.objectiveBackup[value]
    state.objectiveRandom = value

    updateObjectiveElements()
  }

  const updateObjectiveElements = () => {
    if (randomizer.state.readonly) {
      return
    }
    const value = isTrue(randomizer.state.objectiveRandom)
    // disable/enable relevant inputs
    window.disableElement('hiddenObjectives', !value)
    window.disableElement('distributeObjectives', !value)
    window.disableElement('nbObjective', !value)
    window.$('#nbObjectiveRandom').attr('disabled', !value)
    const dice = document.getElementById('objectiveRandom')
    dice.classList[value ? 'add' : 'remove']('active')
  }

  randomizer.objective = {
    setRandom: setObjectiveRandom,
    updateElements: updateObjectiveElements,
    getMax() {
      if (randomizer.isRandom('objective')) {
        return Infinity
      }
      const majorsSplit = document.getElementById('majorsSplit').value
      return majorsSplit === 'Scavenger' ? 17 : 18
    },
    add(objective) {
      if (!randomizer.state.objective.includes(objective)) {
        randomizer.state.objective.push(objective)
      }
    },
    remove(objective_id) {
      randomizer.state.objective = randomizer.state.objective.filter((o) => o !== objective_id)
    },
    toggle(objective_id) {
      if (!randomizer.state.objective.includes(objective_id)) {
        randomizer.objective.add(objective_id)
      } else {
        randomizer.objective.remove(objective_id)
      }
    },
    getSelectedMap() {
      const selected_map = {}
      randomizer.state.objective.forEach((o) => (selected_map[o] = true))
      return selected_map
    },
    getCategories() {
      const is_random = randomizer.isRandom('objective')
      const selected_map = randomizer.objective.getSelectedMap()
      const disabled_map = randomizer.objective.getDisabledMap()
      return Object.entries(varia.objective.by_category).map(([id, objectives]) => {
        objectives = objectives.map((o) => ({
          ...o,
          disabled: disabled_map[o.id],
          selected: selected_map[o.id],
        }))
        const checked = objectives.filter((o) => o.selected).length > 0
        const partial = is_random && checked > 0 && checked < objectives.length
        return {
          id,
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

      if (randomizer.objective.getMax() === randomizer.state.objective.length) {
        // Cannot add more objectives because we've reached max amount
        const reason = 'You cannot add any more objectives for this splits mode'
        Object.keys(varia.objective.by_id)
          .filter((objective_id) => !selected_map[objective_id])
          .forEach((objective_id) => (disabled_map[objective_id] = reason))
        return disabled_map
      }

      const selected_objectives = randomizer.state.objective
      const tourian = document.getElementById('tourian').value
      const majorsSplit = document.getElementById('majorsSplit').value
      const disqualifying_ids = { bosses: [], minibosses: [] }
      Object.values(varia.objective.by_id).forEach((objective) => {
        if (objective.is_count && selected_map[objective.id]) {
          disqualifying_ids[objective.category].push(objective.id)
        }
      })

      Object.values(varia.objective.by_id).forEach((objective) => {
        if (objective.id.startsWith('clear ')) {
          if (tourian === 'Disabled') {
            const reason = 'Clear ojectives cannot be used with disabled tourian.'
            disabled_map[objective.id] = reason
            return
          } else if (majorsSplit === 'Scavenger') {
            const reason = 'Clear ojectives cannot be used with scavenger splits.'
            disabled_map[objective.id] = reason
            return
          }
        }

        if (selected_map[objective.id]) {
          objective.exclusions?.forEach((blocked_id) => {
            const reason = `This objective cannot be used with ${objective.id}`
            disabled_map[blocked_id] = reason
          })
        }
        const { category, category_limit } = objective
        const disc_ids = disqualifying_ids[category]
        if (disc_ids?.length > category_limit) {
          disabled_map[objective.id] = `There are too many ${category} objectives`
        } else if (disc_ids?.length && objective.is_count) {
          selected_objectives.forEach((test_id) => {
            const test_objective = varia.objective.by_id[test_id]
            const { category_limit } = test_objective
            if (test_objective.category !== category || category_limit === undefined) {
              return
            }
            if (disc_ids.length >= category_limit) {
              // eg "kill kraid" cannot be selected bc "kill two" and two "kill BOSS" are selected
              let quoted = disc_ids.map((i) => `"${i}"`)
              if (quoted.length > 1) {
                quoted[quoted.length - 1] = `and ${quoted[quoted.length - 1]}`
              }
              quoted = quoted.join(quoted.length > 2 ? ', ' : ' ')
              const reason = `"${objective.id}" cannot be selected because "${test_id}" is selected along with ${category_limit} or more similar objectives`
              disabled_map[objective.id] = reason
            }
          })
        }
      })

      // If it's already selected, it's not disabled
      Object.keys(selected_map).forEach((o_id) => delete disabled_map[o_id])
      return disabled_map
    },
    toggleCategory(category) {
      const objective_ids = category.objectives.map((i) => i.id)
      const disabled_objectives = randomizer.objective.getDisabledMap()
      if (category.partial || category.checked) {
        // deselect all objectives in category
        objective_ids.forEach((o_id) => randomizer.objective.remove(o_id))
      } else {
        // mark every non-disabled objective as selected
        objective_ids
          .filter((o_id) => !disabled_objectives[o_id])
          .forEach((o_id) => randomizer.objective.add(o_id))
      }
    },
  }
}
