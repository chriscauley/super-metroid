<template>
  <div class="patch-toggler">
    <div class="button-list">
      <i v-if="!allowed">None (disabled for non-area rando)</i>
      <div
        v-for="button in patch_buttons"
        :key="button.text"
        :class="button.class"
        @click="togglePatch(button)"
      >
        <i :class="button.icon" />
        {{ button.title }}
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
  computed: {
    patches() {
      return this.randomizer.getPatches(this.patch_group)
    },
    allowed() {
      return this.randomizer.isPatchGroupAllowed(this.patch_group)
    },
    patch_buttons() {
      if (!this.allowed) {
        return []
      }
      return this.patches.map((patch) => ({
        ...patch,
        class: [`btn btn-xs btn-${patch.active ? 'primary' : 'default'}`],
        icon: `fa fa-${patch.active ? 'plus' : 'minus'}`,
      }))
    },
  },
  methods: {
    togglePatch(patch) {
      this.randomizer.togglePatch(patch)
    },
  },
}
</script>
