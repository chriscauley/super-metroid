<template>
  <div style="font-size: 32px;columns: 4;padding: 20px; background: black; color:white;">
    <div v-for="obj in randomizer_data.objective_by_id" :key="obj.id">
      <i :class="objClass(obj.id)" />
      {{ obj.id }}
    </div>
  </div>
  <div class="smi-tracker text-white p-8" style="font-size: 32px">
    <div style="display: flex; align-items: center">
      <div>
        <img
          src="http://varia.localhost:8000/solver/static/images/tracker/markers/marker_mania.gif"
        />
      </div>
      <div class="sm-item -empty smva-difficulty -difficulty-mania" style="font-size: 128px" />
    </div>
    <div v-for="(icons, name) in icon_groups" :key="name" class="mb-8">
      <h2>{{ name }}</h2>
      <div class="flex flex-wrap">
        <div v-for="icon in icons" :key="icon" :class="icon" :title="icon" />
      </div>
    </div>
  </div>
</template>

<script>
import randomizer_data from './randomizerData.json'
import { kebabCase } from 'lodash'

const icon_groups = {
  sm: [],
  smv: ['smv-icon -door', 'smv-icon -map-cursor -blink'],
  gps: [],
  smi: [
    'smi -auto',
    'smi -energy',
    'smi -ietank',
    'smi -igrapple',
    'smi -ixray',
    'smi -imissile',
    'smi -isuper',
    'smi -ireserve',
  ],
  numbers: [],
  reserve_numbers: [],
}

const bosses = ['ridley', 'draygon', 'phantoon', 'kraid']
const minibosses = ['spore-spawn', 'botwoon', 'crocomire', 'golden-torizo']
bosses.forEach((b) => icon_groups.sm.push('sm-item -' + b))
bosses.forEach((b) => icon_groups.sm.push('sm-item -inactive -' + b))
icon_groups.sm.push('sm-item -crystal-flash')

const all_bosses = [...bosses, ...minibosses, 'mother-brain']
const levels = ['break', 'easy', 'medium', 'hard', 'harder', 'hardcore', 'mania']
all_bosses.forEach((b, i) =>
  icon_groups.smv.push(`smv-boss -${b} smva-difficulty -difficulty-${levels[i % levels.length]}`),
)
levels.forEach((level) =>
  icon_groups.smv.push(`smv-boss -nothing smva-difficulty -difficulty-${level}`),
)

let i = 0
while (i < 10) {
  icon_groups.numbers.push(`smi-number -number-${i}`)
  i++
}
i = 0
while (i < 5) {
  icon_groups.reserve_numbers.push(`smi-reserve-number -number-${i}`)
  i++
}
i = 0
icon_groups.gps.push('smv-gps')
while (i < 32) {
  i++
  icon_groups.gps.push(`smv-gps-number -number-${i}`)
}

export default {
  data() {
    return { icon_groups, inventory: {}, randomizer_data }
  },
  methods: {
    objClass(id) {
      return `smv-obj -${kebabCase(id)}`
    }
  },
}
</script>
