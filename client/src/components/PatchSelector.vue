<template>
  <div class="patch-selector">
    <div v-if="disabled" class="alert alert-warning">
      These patches can only be enabled when area randomization is full or light.
    </div>
    <div class="patch-selector__cards">
      <div v-for="patch in patches" :key="patch.id" :class="getClass(patch)" @click="click(patch)">
        <div class="patch-card__images">
          <template v-for="i in patch.images" :key="i">
            <img :src="`/solver/static/images/help/${i}`" class="patch-card__image -on" />
          </template>
        </div>
        <div class="patch-card__content">
          <div class="patch-card__title">
            <i :class="`fa fa${patch.active ? '-check' : ''}-square`" />
            {{ patch.title }}
          </div>
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="applyMarkdown(patch.description)" />
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// I might eventually update this to work with super metroid icons
const applyMarkdown = (s) =>
  s.replace(
    /\[\[([^\]]+)\]\]/g,
    (_, b) => `<a
    href="https://wiki.supermetroid.run/${b.replace(/ /g, '_')}"
    target="_blank"
  >
    ${b}
  </a>`,
  )

export default {
  inject: ['randomizer'],
  props: {
    patch_gruop: String,
    readonly: Boolean,
  },
  emits: ['toggle-patch'],
  computed: {
    patches() {
      return this.randomizer.getPatches(this.patch_group)
    },
    disabled() {
      return !this.randomizer
    }
  },
  methods: {
    getClass(patch) {
      return [`patch-card -width-${patch.images.length}`, patch.active ? '-active' : '-inactive']
    },
    click(patch) {
      if (!this.readonly) {
        this.$emit('toggle-patch', patch)
      }
    },
    applyMarkdown,
  },
}
</script>
