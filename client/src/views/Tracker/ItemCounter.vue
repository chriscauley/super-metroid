<template>
  <table class="item-counter" v-if="show">
    <tr v-for="row in rows" :key="row[0]" :class="row[2]">
      <td>{{ row[1] }}</td>
      <td>{{ row[0] }}</td>
    </tr>
    <tr>
      <td colspan="2">
        <span v-for="(count, difficulty) in difficulty_counts" :key="difficulty">
          <i :class="`sm-item -empty smva-difficulty -difficulty-${difficulty}`" />
          {{ count }}
        </span>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="font-size: 2em">
        <span v-for="(difficulty, item) in item_difficulties" :key="item">
          <i :class="`sm-item -${item} smva-difficulty -difficulty-${difficulty}`" />
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
import { subarea_by_area, varia } from 'sm-data'
import { prepName } from '@/layouts'

export default {
  inject: ['tool_storage', 'game_state', 'json_data'],
  props: {
    areas: Array,
  },
  computed: {
    show() {
      return this.tool_storage.state.tracker_settings.item_counter
    },
    item_difficulties() {
      const out = {}
      Object.values(this.json_data?.visitedLocations || {}).forEach(({ difficulty, item }) => {
        const slug = varia.variaToSm(item)
        if (!out[slug]) {
          out[slug] = difficulty[0]
        }
      })
      return out
    },
    difficulty_counts() {
      const counts = {
        break: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        harder: 0,
        hardcore: 0,
        mania: 0,
      }
      Object.values(this.json_data?.visitedLocations || {}).forEach(({ difficulty }) => {
        counts[difficulty[0]]++
      })
      return counts
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
}
</script>
