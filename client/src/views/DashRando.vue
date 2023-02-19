<template>
  <div class="damage-table">
    <table class="table">
      <thead>
        <tr>
          <th>Beams</th>
          <th>
            Charge 1
            <br />
            (Starter)
          </th>
          <th v-for="c in [2, 3, 4, 5]" :key="c">Charge {{ c }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="beam in beams" :key="beam.code">
          <th>
            <div class="damage-table__icons">
              <i v-for="icon in beam.icons" :key="icon" :class="icon" />
              <span v-if="!beam.icons.length">No beams</span>
            </div>
          </th>
          <td v-for="value in beam.damage_values" :key="value">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const base_damages = {
  '': [20],
  i: [30],
  s: [40],
  w: [50],
  is: [50],
  iw: [60],
  sw: [80, 180, 250, 360, 450],
  isw: [100],
  p: [100],
}

const beam_lookup = Object.fromEntries(
  ['ice', 'spazer', 'wave', 'plasma'].map((name) => [name[0], name]),
)

Object.entries(beam_lookup).forEach(([code, name]) => {
  beam_lookup[name] = code
})

const beams = Object.entries(base_damages).map(([code, damage_values]) => {
  const items = code.split('').map((letter) => beam_lookup[letter])
  while (damage_values.length < 5) {
    damage_values.push(damage_values[0] * (damage_values.length + 1))
  }
  return {
    code,
    items,
    icons: code.split('').map((c) => `smv-beam -${beam_lookup[c]}`),
    damage_values,
  }
})

export default {
  data() {
    return { beams }
  },
}
</script>
