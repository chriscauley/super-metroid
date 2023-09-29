<template>
  <div class="patch-toggler">
    <i v-if="!allowed">None (disabled for non-area rando)</i>
    <div v-else class="button-list">
      <div class="btn-group" v-if="compact">
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
        <button
          v-for="button in patch_buttons"
          :key="button.title"
          :class="button.class"
          @click="randomizer.togglePatch(button)"
          type="button"
        >
          <i :class="button.icon" />
          {{ button.title }}
        </button>
      </template>
      <div class="expand-patches" @click="compact = !compact">
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
    return { compact: true }
  },
  computed: {
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
      const set = (value) => this.randomizer.setPatches(value, this.patch_group)
      const is_custom = selected < all && selected > 0
      const has_custom = this.randomizer.hasBackup(this.patch_group)
      const custom_button = {
        text: `Custom ${selected}/${all}`,
        click: () => set('custom'),
        class: cls(is_custom),
      }
      const fake_custom = {
        text: 'Custom',
        click: () => (this.compact = false),
        class: cls(false),
      }
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
        is_custom || has_custom ? custom_button : fake_custom,
      ]
    },
    patch_buttons() {
      return this.patches.map((patch) => ({
        ...patch,
        class: [`btn btn-xs btn-${patch.active ? 'primary' : 'default'}`],
        icon: `fa fa-${patch.active ? 'plus' : 'minus'}`,
      }))
    },
  },
}
</script>
