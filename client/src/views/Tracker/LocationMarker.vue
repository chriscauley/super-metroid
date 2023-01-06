<template>
  <div v-bind="attrs" @mouseover="mouseover" @mouseleave="mouseout">
    <slot />
    <unrest-popper v-if="hover" class="location-marker__popper" offset="0,10" placement="bottom">
      <div data-popper-arrow />
      <div class="location-marker__popper-inner">
        {{ display_name }}
        <div v-if="boss">Boss: {{ boss }}</div>
        <div v-else-if="visited">Item: {{ item_name }}</div>
        <template v-if="locData && !visited">
          <div>Techniques: {{ locData.knows[0] || 'None' }}</div>
          <div>
            Items:
            <div v-for="(item, i) in items" :key="i" :class="item" />
            {{ items.length === 0 ? 'None' : '' }}
          </div>
          <div v-if="locData.comeBack === false">
            {{ "WARNING: Can't come back" }}
          </div>
          <div v-if="locData.difficulty">Difficulty: {{ locData.difficulty[1] }}</div>
          <template v-if="$route.query.debug">
            <div v-if="distance in locData">Distance: {{ locData.distance }}</div>
            <div v-if="path in locData">Path: {{ locData.path }}</div>
            <div v-if="locDifficulty in locData">LocDifficulty: {{ locData.locDifficulty }}</div>
            <div v-if="pathDifficulty in locData">PathDifficulty: {{ locData.pathDifficulty }}</div>
          </template>
        </template>
      </div>
    </unrest-popper>
  </div>
</template>

<script>
import { location_type_map } from '@/data/old'
import varia from '@/varia'

export default {
  props: {
    location: Object,
    json_data: Object,
    game_state: Object,
  },
  data() {
    return { hover: false }
  },
  computed: {
    locData() {
      return this.json_data?.availableLocations[this.location.slug]
    },
    display_name() {
      return this.locData?.name || this.location.name
    },
    item_name() {
      const data = this.json_data?.visitedLocations[this.location.slug]
      return varia.variaToDisplay(data.item)
    },
    visited() {
      return this.json_data?.visitedLocations[this.location.slug]
    },
    boss() {
      return window.locsInfo?.[this.location.slug]?.boss
    },
    icon() {
      const data = this.json_data?.visitedLocations[this.location.slug]
      if (data) {
        return [
          varia.getIcon(data.item),
          `smva-difficulty -difficulty-${data.difficulty[0]}`,
          data.major && '-major',
        ]
      }
      const type = location_type_map[this.location.slug]
      return 'sm-map -' + (type === 'item' ? 'egg' : type)
    },
    items() {
      return (this.locData.items || []).map((i) => varia.getIcon(i))
    },
    attrs() {
      const { slug, chozo, major, scavenger } = this.location
      return {
        id: `location__${slug}`,
        class: [
          'location-marker',
          this.$store.layout.getWorld().extra_classes[slug],
          chozo && '-chozo',
          major && '-major',
          scavenger && '-scavenger',
          this.game_state.locations[slug] && '-completed',
          this.icon,
        ],
      }
    },
  },
  methods: {
    mouseover() {
      this.hover = true
    },
    mouseout() {
      this.hover = false
    },
  },
}
</script>
