<template>
  <div class="cheat-sheet">
    <beam-chooser :storage="storage" />
    <stop-watch />
    <table class="table">
      <thead>
        <tr>
          <td></td>
          <td>hp</td>
          <td>missiles</td>
          <td>supers</td>
          <td>beams</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>
            <div class="cheat-sheet__portrait" :title="row.name">
              <img :src="row.src" />
            </div>
          </td>
          <td>
            {{ row.hp }}
          </td>
          <td v-for="item in row.items" :key="item.icon">
            {{ item.count }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BeamChooser from './BeamChooser.vue'
import StopWatch from './StopWatch.vue'
import Storage from './Storage'

const microwave_beam = { href: 'https://wiki.supermetroid.run/X-Plasma', text: 'Microwave Beam' }

const bosses = [
  // {
  //   name: 'Bomb Torizo',
  //   hp: 800,
  //   weak: 'super-missile',
  //   subtype: 'mini-boss',
  // },
  // {
  //   name: 'Spore Spawn',
  //   hp: 960,
  //   weak: 'charge-beam',
  //   fastest: ['charge+ice+plasma', 'charge+wave+plasma', 'charge+wave+ice+plasma'],
  //   subtype: 'mini-boss',
  // },
  // {
  //   name: 'Crocomire',
  //   subtype: 'mini-boss',
  //   hp: 'n/a',
  //   weak: { icon: 'grappling-beam', title: ':troll-face' },
  //   fastest: 'charge+plasma',
  // },
  {
    name: 'Kraid',
    hp: 1000,
    fastest: {
      href: 'https://wiki.supermetroid.run/Kraid#Peashooter_Method',
      text: 'Kraid Quick Kill',
    },
  },
  {
    name: 'Phantoon',
    hp: 2500,
    weak: 'super-missile',
    fastest: [
      {
        text: `1xMissile + ${microwave_beam.text}`,
        href: 'https://wiki.supermetroid.run/Phantoon#GT_Classic',
      },
      {
        text: 'Doppler',
        href: 'https://wiki.supermetroid.run/Phantoon#Any.25_PRKD',
      },
    ],
  },
  {
    name: 'Draygon',
    hp: 6000,
  },
  {
    name: 'Ridley',
    hp: 18000,
    weak: 'super-missile',
    fastest: { 'super-missile': 30 },
  },
  {
    name: 'Botwoon',
    hp: 3000,
    weak: 'n/a',
    fastest: [microwave_beam, { 'super-missile': 10 }],
  },
  {
    name: 'Golden Torizo',
    hp: 13500,
    weak: 'super-missile',
    fastest: 'charge+ice+wave+plasma',
  },
  {
    name: 'Mother Brain',
    hp: 18000,
  },
]

export default {
  name: 'CheatSheet',
  components: { BeamChooser, StopWatch },
  data() {
    return { storage: Storage() }
  },
  computed: {
    rows() {
      return bosses.map((b) => ({
        ...b,
        src: `/solver/static/images/tracker/inventory/${b.name.replace(' ', '')}.png`,
        items: this.getItems(b),
      }))
    },
  },
  methods: {
    getBeamHitCount(hp) {
      return Math.ceil(hp / this.storage.getDamage())
    },
    getItems(b) {
      const { hp, weak } = b
      return [
        {
          icon: 'missiles',
          count: Math.ceil(hp / 100),
        },
        {
          icon: 'super-missiles',
          count: Math.ceil(hp / (weak === 'super-missile' ? 600 : 300)),
        },
        {
          icon: 'beams',
          count: this.getBeamHitCount(hp),
        },
      ]
    },
  },
}
</script>
