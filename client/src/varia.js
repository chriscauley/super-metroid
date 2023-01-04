// library for converting from varia.run data structures to data structures for this app
import { invert, startCase } from 'lodash'
import { all_items, bosses, minibosses, ammo, energy } from '@/data/old'

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
  'grapple-beam': 'Grapple',
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
}
const to_convert = [all_items, bosses, minibosses]

to_convert.forEach((set) =>
  set.forEach((item) => {
    sm_to_varia[item] = sm_to_varia[item] || startCase(item).replace(/ /g, '')
  }),
)

const varia = {
  sm_to_varia,
  varia_to_sm: invert(sm_to_varia),
}

const packs = {}

ammo.forEach((i) => (packs[i] = 5))
energy.forEach((i) => (packs[i] = 1))
varia.getGameState = (json_data) => {
  if (!json_data) {
    return null
  }
  const state = {
    inventory: {},
    items: {},
    warps: json_data.lines,
  }
  json_data.collectedItems.forEach((item_) => {
    const item = varia.varia_to_sm[item_]
    if (!item) {
      console.error(`Unknown Item ${item_}`)
    }
    if (packs[item]) {
      state.inventory[item] = (state.inventory[item] || 0) + packs[item]
    } else {
      state.inventory[item] = true
    }
  })
  return state
}

export default varia
