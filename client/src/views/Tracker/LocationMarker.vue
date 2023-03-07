<template>
  <div v-bind="attrs" @mouseover="mouseover" @mouseleave="mouseout">
    <slot />
    <unrest-popper v-if="hover" class="location-marker__popper" offset="0,10" placement="bottom">
      <div data-popper-arrow />
      <div class="location-marker__popper-inner">
        {{ display_name }}
        <div v-if="boss">Boss: {{ boss }}</div>
        <div v-else-if="visited_data">Item: {{ item_name }}</div>
        <div v-if="!locData && !visited_data">Sequence Break</div>
        <template v-if="locData && !visited_data">
          <div>Techniques: {{ locData.knows[0] || 'None' }}</div>
          <div class="location-marker__item-list">
            Items:
            <div v-for="(item, i) in items" :key="i" class="location-marker__item">
              {{ item.text }}
              <i :class="item.class" />
            </div>
            {{ items.length === 0 ? 'None' : '' }}
          </div>
          <div v-if="locData.comeBack === false">
            {{ "WARNING: Can't come back" }}
          </div>
          <div v-if="locData.difficulty">Difficulty: {{ locData.difficulty[1] }}</div>
          <template v-if="$route.path.includes('debug')">
            <div v-if="locData.distance">Distance: {{ locData.distance }}</div>
            <div v-if="locData.path" style="max-width: 500px; white-space: break-spaces">
              Path: {{ locData.path.join(' > ') }}
            </div>
            <div v-if="locData.locDifficulty">LocDifficulty: {{ locData.locDifficulty }}</div>
            <div v-if="locData.pathDifficulty">PathDifficulty: {{ locData.pathDifficulty }}</div>
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
  inject: ['json_data', 'game_state', 'tool_storage'],
  props: {
    location: Object,
  },
  data() {
    return { over: false }
  },
  computed: {
    hover() {
      const { highlight_location, hover_location } = this.$store.ui.state
      const { slug } = this.location
      return slug === hover_location || slug === highlight_location
    },
    locData() {
      return this.json_data?.availableLocations[this.location.slug]
    },
    visited_data() {
      return this.json_data?.visitedLocations[this.location.slug]
    },
    display_name() {
      return this.locData?.name || this.location.name
    },
    item_name() {
      return varia.variaToDisplay(this.visited_data.item)
    },
    boss() {
      return window.locsInfo?.[this.location.slug]?.boss
    },
    icon() {
      const { visited_data, locData } = this
      if (visited_data) {
        return [
          varia.getIcon(visited_data.item),
          `smva-difficulty -difficulty-${visited_data.difficulty[0]}`,
          visited_data.major && '-major',
        ]
      }
      if (locData) {
        return `sm-item -empty smva-difficulty -difficulty-${locData.difficulty[0]}`
      }
      if (this.$site.name === 'varia') {
        return 'sm-item -empty smva-difficulty -difficulty-break'
      }
      const type = location_type_map[this.location.slug]
      return 'sm-map -' + (type === 'item' ? 'egg' : type)
    },
    items() {
      const items = this.locData.items || []
      return items.map((item) => {
        let count, text
        if (item.includes('-')) {
          ;[count, item] = item.split('-')
          text = `${count}-`
        }
        return { text, class: varia.getIcon(item) }
      })
    },
    attrs() {
      const { slug, chozo, major, scavenger } = this.location
      let is_major = false
      if (!!this.json_data) {
        const split = this.tool_storage.getRandoSettings().majorsSplit.toLowerCase()
        is_major = this.location[split]
      }
      return {
        id: `location__${slug}`,
        'data-id': slug,
        'data-type': 'location',
        class: [
          'location-marker',
          this.$store.layout.getWorld().extra_classes[slug],
          chozo && '-chozo',
          major && '-major',
          scavenger && '-scavenger',
          this.game_state.locations[slug] && '-completed',
          this.icon,
          this.hover && '-hover',
          is_major && '-is-major',
        ],
      }
    },
  },
  methods: {
    mouseover() {
      this.$store.ui.state.hover_location = this.location.slug
    },
    mouseout() {
      this.$store.ui.state.hover_location = null
    },
  },
}
</script>
