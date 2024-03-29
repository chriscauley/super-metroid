// library for converting from varia.run data structures to data structures for this app
import kebabCase from 'lodash.kebabcase'
import startCase from 'lodash.startcase'
import { all_items, bosses, minibosses, ammo, energy, location_type_map } from '../misc'
import objectives from './objectives'

const sm_to_varia = {
  'charge-beam': 'Charge',
  'energy-tank': 'ETank',
  'grappling-beam': 'Grapple',
  'gravity-suit': 'Gravity',
  'hi-jump-boots': 'HiJump',
  'ice-beam': 'Ice',
  'morph-ball': 'Morph',
  'plasma-beam': 'Plasma',
  'reserve-tank': 'Reserve',
  'screw-attack': 'ScrewAttack',
  'spazer-beam': 'Spazer',
  'super-missile': 'Super',
  'varia-suit': 'Varia',
  'wave-beam': 'Wave',
  'x-ray': 'XRayScope',
  nothing: 'Nothing',
  noenergy: 'NoEnergy',
  'crystal-flash': 'CrystalFlash',
  '': '',
}
const to_convert = [all_items, bosses, minibosses]

to_convert.forEach((set) =>
  set.forEach((item) => {
    sm_to_varia[item] = sm_to_varia[item] || startCase(item).replace(/ /g, '')
  }),
)

const packs = {}

ammo.forEach((i) => (packs[i] = 5))
energy.forEach((i) => (packs[i] = 1))
const invert = (obj) => Object.fromEntries(Object.entries(obj).map(([a, b]) => [b, a]))

const varia = {
  sm_to_varia,
  varia_to_sm: invert(sm_to_varia),
  getGameState: (json_data, inventory, locked_warps) => {
    if (!json_data) {
      return null
    }
    const state = {
      inventory: {},
      locations: {},
      warps: json_data.lines,
      locked_warps: { ...locked_warps },
    }
    if (inventory) {
      Object.entries(inventory).forEach(([varia_slug, value]) => {
        const item_slug = varia.variaToSm(varia_slug)
        if (packs[item_slug]) {
          state.inventory[item_slug] = value * packs[item_slug]
        } else {
          state.inventory[item_slug] = true
        }
      })
    } else {
      json_data.collectedItems.forEach((varia_slug) => {
        const item_slug = varia.variaToSm(varia_slug)
        if (packs[item_slug]) {
          state.inventory[item_slug] = (state.inventory[item_slug] || 0) + packs[item_slug]
        } else {
          state.inventory[item_slug] = true
        }
      })
    }
    return state
  },
  variaToSm(varia_slug) {
    const slug = varia.varia_to_sm[varia_slug]
    if (slug === undefined) {
      console.error(`Unknown varia_slug: ${varia_slug}`)
    }
    return slug || varia_slug
  },
  smToVaria(slug) {
    const varia_slug = varia.sm_to_varia[slug]
    if (varia_slug === undefined) {
      console.error(`Unknown slug: ${slug}`)
    }
    return varia_slug || slug
  },
  variaToDisplay(varia_slug) {
    return startCase(varia.variaToSm(varia_slug))
  },
  getIcon(varia_slug) {
    if (varia_slug === 'GoldTorizo') {
      return `smv-boss -map-icon -golden-torizo`
    }
    const item_slug = varia.variaToSm(varia_slug)
    const type = location_type_map[varia_slug]
    if (type === 'boss' || type === 'miniboss') {
      return `smv-boss -map-icon -${item_slug}`
    }
    return `sm-item -${item_slug}`
  },

  // Objectives are currently taken from repo but will eventually be pulled in from server
  objective: {},
  loadObjectives: (by_id) => {
    const start = /^(kill|collect|explore|clear|tickle|activate) (the )?/
    const by_category = {}
    Object.values(by_id).forEach((objective) => {
      objective.icon = `smv-objective -${slugifyObjective(objective.id)}`
      objective.short = objective.id.replace(start, '')
      const { category } = objective
      by_category[category] = by_category[category] || []
      by_category[category].push(objective)
    })
    varia.objective.by_id = by_id
    varia.objective.by_category = by_category
    const { memes } = varia.objective.by_category
    if (memes) {
      // memes should be last, but it's easier to change here than in the backend
      // TODO change in backendx
      delete varia.objective.by_category.memes
      varia.objective.by_category.memes = memes
    }
  },
}

const slugifyObjective = (id) => kebabCase(id.toLowerCase().replace("'", ''))

varia.loadObjectives(objectives)

export default varia
