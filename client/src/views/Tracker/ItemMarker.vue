<template>
  <div v-bind="attrs" @mouseover="mouseover" @mouseleave="mouseout">
    <unrest-popper v-if="hover" class="area-item__popper" offset="0,10" placement="bottom">
      <div data-popper-arrow />
      <div class="area-item__popper-inner">
        {{ display_name }}
        <div v-if="boss">Boss: {{ boss }}</div>
        <div v-else-if="visited">Item: {{ item_name }}</div>
        <template v-if="locData && !visited">
          <div>Techniques: {{ locData.knows[0] || 'None' }}</div>
          <div>Items: {{ locData.items || None }}</div>
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
export default {
  props: {
    item: Object,
    json_data: Object,
    game_state: Object,
  },
  data() {
    return { hover: false }
  },
  computed: {
    locData() {
      return this.json_data?.availableLocations[this.item.slug]
    },
    display_name() {
      return this.locData?.name || this.item.name
    },
    item_name() {
      return 'TODO'
    },
    visited() {
      return this.json_data?.visitedLocations[this.item.slug]
    },
    boss() {
      return window.locsInfo?.[this.item.slug]?.boss
    },
    attrs() {
      const { slug, chozo, major, scavenger } = this.item
      return {
        id: `item__${slug}`,
        class: [
          'area-item',
          this.$store.layout.getWorld().extra_classes[slug],
          chozo && '-chozo',
          major && '-major',
          scavenger && '-scavenger',
          this.game_state.items[slug] && '-completed',
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
