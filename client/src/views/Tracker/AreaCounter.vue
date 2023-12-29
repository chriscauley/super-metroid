<template>
  <div class="area-counter" v-if="show" :style="$store.config.getPosition('area-counter')">
    <resize-box @update="(values) => $store.config.save({ 'area-counter': values })" />
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
  inject: ['tool_storage', 'game_state', 'json_data'],
  props: {
    areas: Array,
  },
  computed: {
    show() {
      return this.tool_storage.state.tracker_settings.area_counter
    },
    rows() {
      const counts = {}
      const hits = {}
      const any_major = Object.values(this.json_data?.all_locations || {}).some((l) => l.major)
      this.areas.forEach((area) => {
        if (area.slug === 'tourian' || area.slug.endsWith('__compact')) {
          return
        }
        const target_area = subarea_by_area[area.slug] || area.slug
        hits[target_area] = 0
        counts[target_area] = 0
        area.locations.forEach(({ slug }) => {
          const location = this.json_data?.all_locations[slug] || {}
          if (any_major && !location.major) {
            return
          }
          counts[target_area] += 1
          if (this.json_data?.visitedLocations[slug]) {
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
