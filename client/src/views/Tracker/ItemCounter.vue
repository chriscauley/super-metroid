<template>
  <unrest-dropdown>
    <button class="btn -primary">
      <i class="fa fa-hashtag" />
    </button>
    <template #content>
      <div class="dropdown-items" @click.stop>
        <div v-for="row in rows" :key="row[0]" class="dropdown-item">{{ row[1] }} {{ row[0] }}</div>
      </div>
    </template>
  </unrest-dropdown>
</template>

<script>
import { subarea_by_area } from '@/data/old'
import { prepName } from '@/layouts'

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
      const { split } = this.tool_storage.state
      this.areas.forEach((area) => {
        let items = area.items
        if (['major', 'chozo', 'scavenger'].includes(split)) {
          items = items.filter((i) => i[split])
        }
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
        return [prepName(area), count - hits[area]]
      })
    },
  },
}
</script>
