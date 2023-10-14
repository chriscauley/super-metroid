<template>
  <div class="patch-toggler">
    <i v-if="!allowed">None (disabled for non-area rando)</i>
    <div v-else class="button-list">
      <div v-if="readonly_text">{{ readonly_text }}</div>
      <div class="btn-group" v-else-if="compact">
        <button
          v-for="button in compact_buttons"
          type="button"
          :key="button.text"
          :class="button.class"
          @click="button.click"
        >
          {{ button.text }}
        </button>
      </div>
      <template v-else>
        <PatchButton v-for="(patch, i) in patches" :key="i" :patch="patch" />
      </template>
      <div class="faux-link" @click="compact = !compact">
        {{ compact ? 'expand' : 'collapse' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['randomizer'],
  props: {
    patch_group: String,
    readonly: Boolean,
  },
  emits: ['toggle-patch'],
  data() {
    const patches = this.randomizer.getPatches(this.patch_group)
    const all = patches.length
    const selected = patches.filter((p) => p.active).length
    return { compact: selected === all || selected === 0 }
  },
  computed: {
    readonly_text() {
      if (!this.compact || !this.randomizer.state.readonly) {
        return null
      }
      const selected = this.patches.filter((p) => p.active).length
      const all = this.patches.length
      if (all > selected && selected > 0) {
        return `${selected} / ${all} patches applied`
      }
      return all === selected ? 'all' : 'none'
    },
    patches() {
      return this.randomizer.getPatches(this.patch_group)
    },
    allowed() {
      return this.randomizer.isPatchGroupAllowed(this.patch_group)
    },
    compact_buttons() {
      const all = this.patches.length
      const selected = this.patches.filter((p) => p.active).length
      const cls = (active) => `btn btn-${active ? 'primary' : 'default'}`
      const set = (value) => this.randomizer.setPatches(this.patch_group, value)
      const is_custom = selected < all && selected > 0
      return [
        {
          text: 'All',
          click: () => set('all'),
          class: cls(all === selected),
        },
        {
          text: 'None',
          click: () => set('none'),
          class: cls(0 === selected),
        },
        {
          text: is_custom ? `Custom ${selected}/${all}` : 'Custom',
          click: () => (this.compact = false),
          class: cls(is_custom),
        },
      ]
    },
  },
}
</script>
