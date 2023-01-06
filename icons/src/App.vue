<template>
  <div class="smi-tracker text-white p-8" style="font-size: 32px">
    <div v-for="(icons, name) in icon_groups" :key="name" class="mb-8">
      <h2>{{ name }}</h2>
      <div class="flex">
        <div v-for="icon in icons" :key="icon" :class="icon" :title="icon" />
      </div>
    </div>
  </div>
</template>

<script>
const icon_groups = {
  sm: [],
  smv: [],
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

const all_bosses = [...bosses, ...minibosses, 'mother-brain']
const levels = ['break', 'easy', 'medium', 'hard', 'harder', 'hardcore', 'mania']
all_bosses.forEach((b, i) =>
  icon_groups.smv.push(`smv-boss -${b} smva-difficulty -difficulty-${levels[i % levels.length]}`),
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

// const beams = ['charge', 'ice', 'wave', 'spazer', 'plasma'].map(s => s+'-beam')
// const suits = ['varia-suit', 'gravity-suit']
// const misc = ['morph-ball', 'bomb', 'spring-ball', 'screw-attack']
// const boots = ['hi-jump-boots', 'space-jump', 'speed-booster']

// const menu_items = [ ...beams, ...suits, ...misc, ...misc]

export default {
  data() {
    return { icon_groups }
  },
}
</script>
