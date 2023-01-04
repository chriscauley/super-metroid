<template>
  <table class="item-counter" v-if="show">
    <tr v-for="row in rows" :key="row[0]" :class="row[2]">
      <td>{{ row[1] }}</td>
      <td>{{ row[0] }}</td>
    </tr>
  </table>
</template>

<script>
import { subarea_by_area } from '@/data/old'
import { prepName } from '@/layouts'
import { filterSplitLocations } from '@/utils'

export default {
  props: {
    tool_storage: Object,
    game_state: Object,
    areas: Array,
  },
  computed: {
    show() {
      return this.tool_storage.state.item_tracker === 'area-counter'
    },
    rows() {
      const counts = {}
      const hits = {}
      this.areas.forEach((area) => {
        const locations = filterSplitLocations(area.locations, this.tool_storage.state.split)
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
}
</script>
