<template>
  <unrest-popper class="varia-picker" placement="bottom" @click.stop>
    <div>
      <div class="varia-picker__title">Choose item new item for:</div>
      <div>
        {{ location.name }}
      </div>
    </div>
    <div v-if="can_hide">Hide this item: <input type="checkbox" v-model="hide" /></div>
    <div class="varia-picker__items">
      <div v-for="group in groups" :key="group.slug" class="varia-picker__item-group">
        <div v-for="item in group.items" :key="item.slug">
          <div :class="item.class" @click="clickLocation(item.slug)" :title="item.title">
            <i :class="item.icon" />
            <span v-if="item.key" class="varia-picker__key">{{ item.key }}</span>
          </div>
        </div>
      </div>
    </div>
  </unrest-popper>
</template>

<script>
import { range } from 'lodash'
import Mousetrap from '@unrest/vue-mousetrap'
import { items_by_group, ammo, energy } from '@/data/old'
import varia from '@/varia'

export default {
  mixins: [Mousetrap.mixin],
  inject: ['tool_storage', 'json_data'],
  props: {
    current_item: String,
    location: Object,
  },
  data() {
    const visited_location = this.json_data?.visitedLocations[this.location.slug] || {}
    return {
      key_items: ['nothing', ...ammo, ...energy],
      can_hide: visited_location?.canHidden,
      hide: visited_location.visibility === 'Hidden',
    }
  },
  computed: {
    mousetrap() {
      const keys = range(this.key_items.length)
      return {
        [keys]: (e) => this.clickLocation(this.key_items[e.key]),
        x: () => this.clickLocation(''),
      }
    },
    groups() {
      const keys = {}
      const current_item = this.current_item && varia.variaToSm(this.current_item)
      this.key_items.forEach((item, i) => (keys[item] = i.toString()))
      const groups = Object.entries(items_by_group).map(([slug, items]) => ({
        slug,
        items: items.map((slug) => ({
          slug,
          class: ['varia-picker__door', current_item === slug && '-selected'],
          icon: [
            `sm-item -${slug}`,
            slug === 'nothing' && '-nothing smva-difficulty -difficulty-easy',
          ],
          title: `Set Location to: ${slug}`,
          key: keys[slug],
        })),
      }))
      groups[0].items.unshift({
        slug: '',
        class: ['varia-picker__door', !item && '-selected'],
        icon: 'sm-item -empty smva-difficulty -difficulty-easy',
        key: 'x',
        title: 'Reset Location',
      })
      return groups
    },
  },
  mounted() {
    // Adding this now causes the click that added the picker to close the picker /shrug
    setTimeout(() => document.addEventListener('click', this.close), 100)
  },
  unmounted() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    close() {
      this.tool_storage.state.active_location = null
    },
    clickLocation(value) {
      this.tool_storage.updateLocationItem(
        this.location.slug,
        varia.smToVaria(value),
        this.item,
        this.hide,
      )
    },
  },
}
</script>