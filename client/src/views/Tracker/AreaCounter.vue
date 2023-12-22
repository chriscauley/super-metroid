<template>
  <div class="area-counter" v-if="show" :style="style">
    <resize-box @update="resizeBox" />
    <table>
      <tr v-for="row in rows" :key="row[0]" :class="row[2]">
        <td>{{ row[1] }}</td>
        <td>{{ row[0] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { subarea_by_area } from 'sm-data'
import { prepName } from '@/layouts'

export default {
  inject: ['tool_storage', 'game_state'],
  props: {
    areas: Array,
  },
  computed: {
    style() {
      const { x, y } = this.$store.config.state['area-counter'] || {}
      if (x === undefined) {
        return {
          bottom: 'var(--settings-height)',
          left: 0,
        }
      }
      return { top: `${y}px`, left: `${x}px` }
    },
    show() {
      return this.tool_storage.state.tracker_settings.area_counter
    },
    rows() {
      const counts = {}
      const hits = {}
      this.areas.forEach((area) => {
        const locations = this.tool_storage.filterVisibleLocations(area.locations)
        const target_area = subarea_by_area[area.slug] || area.slug
        locations.forEach((location) => {
          counts[target_area] = (counts[target_area] || 0) + 1
          hits[target_area] = hits[target_area] || 0
          if (this.game_state.locations[location.slug]) {
            hits[target_area] += 1
          }
        })
      })
      return Object.entries(counts).map(([area, count]) => {
        const cls = ['item-counter__row', count - hits[area] === 0 && '-complete']
        return [prepName(area), count - hits[area], cls]
      })
    },
  },
  methods: {
    resizeBox(values) {
      this.$store.config.save({ 'area-counter': values })
    }
  }
}
</script>
