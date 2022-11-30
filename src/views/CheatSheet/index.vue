<template>
  <div>
    <beam-chooser />
    <stop-watch />
    <table>
      <thead>
        <tr>
          <td></td>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</template>

<script>
import BeamChooser from './BeamChooser.vue'
import StopWatch from './StopWatch.vue'

const microwave_beam = { href: 'https://wiki.supermetroid.run/X-Plasma', text: 'Microwave Beam' }

const bosses = [
  {
    name: 'Bomb Torizo',
    hp: 800,
    weak: 'super-missile',
    subtype: 'mini-boss',
  },
  {
    name: 'Spore Spawn',
    hp: 960,
    weak: 'charge-beam',
    fastest: ['charge+ice+plasma', 'charge+wave+plasma', 'charge+wave+ice+plasma'],
    subtype: 'mini-boss',
  },
  {
    name: 'Crocomire',
    subtype: 'mini-boss',
    hp: 'n/a',
    weak: { icon: 'grappling-beam', title: ':troll-face' },
    fastest: 'charge+plasma',
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
    name: 'Kraid',
    hp: 1000,
    fastest: {
      href: 'https://wiki.supermetroid.run/Kraid#Peashooter_Method',
      text: 'Kraid Quick Kill',
    }
  },
  {
    name: 'Phantoon',
    hp: 2500,
    fastest: [
      {
        text: `1xMissile + ${microwave_beam.text}`,
        href: 'https://wiki.supermetroid.run/Phantoon#GT_Classic',
      },
      {
        text: 'Doppler',
        href: 'https://wiki.supermetroid.run/Phantoon#Any.25_PRKD',
      }
    ]
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
]

export default {
  __route: {
    path: '/cheat-sheet/'
  },
  components: { BeamChooser, StopWatch },
  computed: {
    rows() {

    }
  }
}
</script>