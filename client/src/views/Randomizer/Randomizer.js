import { startCase, cloneDeep } from 'lodash'
import { reactive } from 'vue'
import Objective from './Objective'

const forceArray = (value) => {
  if (Array.isArray(value)) {
    return value
  }
  // ''.split(',') => ['']
  return value ? value.split(',') : []
}

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
    if (typeof data.objective === 'string') {
      data.objective = data.objective.split(',')
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
      data[key] = forceArray(data[key])
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
      randomizer.objective.updateElements()
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
  }

  Objective(randomizer) // add objective logic

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
