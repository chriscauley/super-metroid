import { ReactiveLocalStorage } from '@unrest/vue-storage'

import { beams } from '@/data/old'

const beam_slugs = beams.map((b) => b.replace('-beam', ''))

const damages = {
  '': 20,
  ice: 30,
  spazer: 40,
  wave: 50,
  plasma: 150,
  'ice-spazer': 60,
  'ice-wave': 60,
  'wave-spazer': 70,
  'ice-wave-spazer': 100,
  'ice-plasma': 200,
  'wave-plasma': 250,
  'ice-wave-plasma': 300,
}

Object.keys(damages).forEach((key) => {
  const prefix = key ? 'charge-' : 'charge'
  damages[prefix + key] = damages[key] * 3
})

const LS_KEY = 'CHEAT_SHEET'
const initial = {
  selected: { charge: true },
}

export default () => {
  const storage = ReactiveLocalStorage({ LS_KEY, initial })
  Object.assign(storage, {
    beam_slugs,
    getDamage() {
      const { selected } = storage.state
      const key = beam_slugs.filter((slug) => selected[slug]).join('-')
      return damages[key]
    },
    toggleBeam(beam) {
      const { selected } = storage.state
      if (beam === 'plasma' && selected.spazer) {
        selected.spazer = false
      } else if (beam === 'spazer' && selected.plasma) {
        selected.plasma = false
      }
      selected[beam] = !selected[beam]
      storage.save()
    },
  })
  return storage
}
