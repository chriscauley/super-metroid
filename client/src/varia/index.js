// library for converting from varia.run data structures to data structures for this app
import { invert, startCase } from 'lodash'
import { all_items, bosses, minibosses, ammo, energy, location_type_map } from '@/data/old'
import objectives from './objectives'

//   Morph: 'morph-ball',
//   Super: 'super-missile',
//   ETank: 'e-tank',
//   Nothing: 'nothing',
//   Gravity: 'gravity-suit',
//   Varia: 'varia-suit',
//   XRayScope: 'x-ray',
//   PowerBomb: 'power-bomb',
//   ScrewAttack: 'screw-attack',
//   Kraid: 'kraid',
//   Ridley: 'Ridley
// }

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

const varia = {
  objectives,
  sm_to_varia,
  varia_to_sm: invert(sm_to_varia),
  getGameState: (json_data, locked_warps) => {
    if (!json_data) {
      return null
    }
    const state = {
      inventory: {},
      locations: {},
      warps: json_data.lines,
      locked_warps: { ...locked_warps },
    }
    json_data.collectedItems.forEach((varia_slug) => {
      const item_slug = varia.variaToSm(varia_slug)
      if (packs[item_slug]) {
        state.inventory[item_slug] = (state.inventory[item_slug] || 0) + packs[item_slug]
      } else {
        state.inventory[item_slug] = true
      }
    })
    return state
  },
  variaToSm(varia_slug) {
    const slug = varia.varia_to_sm[varia_slug]
    if (!slug) {
      console.error(`Unknown varia_slug: ${varia_slug}`)
    }
    return slug || varia_slug
  },
  smToVaria(slug) {
    const varia_slug = varia.sm_to_varia[slug]
    if (!varia_slug) {
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
}

export default varia
