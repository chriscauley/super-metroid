<template>
  <div style="background: black" class="-pixelated">
    <div class="sm-item -missile" />
    <div>
      <div v-for="icon in inventory_icons" :key="icon" :class="icon" />
    </div>
  </div>
</template>

<script>
const inventory_icons = [
  'smi -auto',
  'smi -energy',
  'smi -ietank',
  'smi -igrapple',
  'smi -ixray',
  'smi -imissile',
  'smi -isuper',
  'smi -ireserve',
]

let i = 0
while (i < 10) {
  inventory_icons.push(`smi-number -number-${i}`)
  i++
}
i = 0
while (i < 5) {
  inventory_icons.push(`smi-reserve-number -number-${i}`)
  i++
}

const menu_items =
  'charge-beam ice-beam wave-beam spazer-beam plasma-beam varia-suit gravity-suit morph-ball bomb spring-ball screw-attack hi-jump-boots space-jump speed-booster'.split(
    ' ',
  )

menu_items.forEach((item) => inventory_icons.push(`smi-menu-item -${item}`))
menu_items.forEach((item) => inventory_icons.push(`smi-menu-item -${item} -inactive`))

export default {
  data() {
    return { inventory_icons }
  },
}
</script>
