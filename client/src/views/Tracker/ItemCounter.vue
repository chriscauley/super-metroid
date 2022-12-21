<template>
  <div class="item-counter" :style="style">
    <div v-for="row in rows" :key="row[0]" :class="row[2]">{{ row[1] }} {{ row[0] }}</div>
  </div>
</template>

<script>
import { subarea_by_area } from '@/data/old'
import { prepName } from '@/layouts'
import { filterSplitItems } from '@/utils'

export default {
  props: {
    tool_storage: Object,
    game_state: Object,
    areas: Array,
  },
  computed: {
    rows() {
      const counts = {}
      const hits = {}
      this.areas.forEach((area) => {
        const items = filterSplitItems(area.items, this.tool_storage.state.split)
        const target_area = subarea_by_area[area.slug] || area.slug
        items.forEach((item) => {
          counts[target_area] = (counts[target_area] || 0) + 1
          hits[target_area] = hits[target_area] || 0
          if (this.game_state.items[item.slug]) {
            hits[target_area] += 1
          }
        })
      })
      return Object.entries(counts).map(([area, count]) => {
        const cls = ['item-counter__row', count - hits[area] === 0 && '-complete']
        return [prepName(area), count - hits[area], cls]
      })
    },
    style() {
      let [top, left] = [0, 0]
      top = Math.max(top, 40)
      left = Math.max(left, 0)
      return {
        top: `${top}px`,
        left: `${left}px`,
      }
    },
  },
}
</script>
