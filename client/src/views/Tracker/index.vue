<template>
  <div :class="wrapper_class" :style="`--zoom: ${osd_store.state.zoom}`">
    <unrest-toolbar :storage="tool_storage" class="tracker-toolbar">
      <template #right>
        <div class="btn-group" v-if="admin_mode">
          <button title="Reset Viewer" class="btn -secondary" @click="resetZoom">
            <i class="fa fa-arrows-alt" />
          </button>
          <button
            title="Lock viewer"
            :class="`btn -${osd_options.mouseNavEnabled ? 'secondary' : 'primary'}`"
            @click="osd_options.mouseNavEnabled = !osd_options.mouseNavEnabled"
          >
            <i :class="`fa fa-${osd_options.mouseNavEnabled ? 'un' : ''}lock`" />
          </button>
        </div>
        <unrest-dropdown class="tracker-view__config">
          <button class="btn -primary">
            <i class="fa fa-gear" />
          </button>
          <template #content>
            <div class="dropdown-items" @click.stop>
              <unrest-form
                :schema="tool_storage.schema"
                :state="tool_storage.state"
                @change="tool_storage.save()"
              />
            </div>
          </template>
        </unrest-dropdown>
      </template>
    </unrest-toolbar>
    <osd-viewer
      :osd_store="osd_store"
      @viewer-bound="addCorners"
      :editor_mode="!!tool_storage.state.editor_mode"
      :osd_options="osd_options"
    />
    <template v-if="osd_store.viewer">
      <osd-html-overlay :viewer="osd_store.viewer">
        <area-overlay
          v-for="area in areas"
          :key="area.slug"
          :area="area"
          @move-area="(data) => moveArea(area, data)"
          :osd_store="osd_store"
          :tool_storage="tool_storage"
          :game_state="game_state"
          :json_data="json_data"
        />
        <warp-connections :areas="areas" :game_state="game_state" :tool_storage="tool_storage" />
      </osd-html-overlay>
    </template>
    <div v-if="$store.layout.state.dirty" class="dirty-layout" @click="$store.layout.saveAreas">
      <div class="btn -primary">Save Areas</div>
    </div>
    <div class="tracker-view__key-stack">
      <span v-if="selected_key"> {{ selected_key }} + </span>
      {{ tool_storage.state.key_stack.join(' ') }}
    </div>
    <item-counter :game_state="game_state" :areas="areas" :tool_storage="tool_storage" />
    <item-tracker
      :tool_storage="tool_storage"
      :inventory="game_state.inventory"
      @add-item="addItem"
      @toggle-item="toggleItem"
    />
    <seed-settings :json_data="json_data" />
  </div>
  <edit-area :area="editing_area" :tool_storage="tool_storage" />
</template>

<script>
import { computed } from 'vue'
import { debounce } from 'lodash'
import osd from '@unrest/vue-openseadragon'
import openseadragon from 'openseadragon'

import { saveFile } from '@/data/legacy'
import { subarea_by_area } from '@/data/old'
import AreaOverlay from './AreaOverlay.vue'
import EditArea from './EditArea.vue'
import ItemCounter from './ItemCounter.vue'
import ItemTracker from './ItemTracker.vue'
import ToolStorage from './ToolStorage'
import WarpConnections from './WarpConnections.vue'
import { getStaticUrl, getGridUrl } from '@/utils'
import varia from '@/varia'
import SeedSettings from './SeedSettings.vue'

const { Rect } = openseadragon

export default {
  name: 'TrackerView',
  components: { AreaOverlay, EditArea, ItemCounter, ItemTracker, SeedSettings, WarpConnections },
  provide() {
    return {
      game_state: computed(() => this.game_state),
      game_state: computed(() => this.game_state),
      json_data: computed(() => this.json_data),
      osd_store: computed(() => this.osd_store), // TODO osd_storage, not osd_store
      tool_storage: computed(() => this.tool_storage),
    }
  },
  data() {
    window._S = () => saveFile(`${JSON.stringify(this.areas, null, 2)}`, 'areas.json')
    return {
      inventory: {},
      osd_store: osd.Store(),
      tool_storage: ToolStorage(this),
      osd_options: { showNavigator: false, mouseNavEnabled: false },
      json_data: null,
    }
  },
  computed: {
    editing_area() {
      const { editing } = this.tool_storage.state
      return editing && this.areas.find((a) => a.slug === editing)
    },
    selected_key() {
      const { selected_warp } = this.tool_storage.state
      return selected_warp && this.code_map[selected_warp]
    },
    admin_mode() {
      // this.$auth.user?.is_superuser
      return process.env.NODE_ENV !== 'production'
    },
    code_map() {
      return this.tool_storage.getCodeMap()
    },
    areas() {
      return this.$store.layout.getAreas()
    },
    skin() {
      return this.$route.query.skin || 'jpg'
    },
    wrapper_class() {
      const { large_warps, large_locations } = this.tool_storage.state
      const { tool } = this.tool_storage.state.selected
      return [
        `tracker-view -layout-${this.$store.layout.state.selected} -tool-${tool}`,
        { large_locations, large_warps },
      ]
    },
    game_state() {
      const varia_state = varia.getGameState(this.json_data)
      if (varia_state) {
        return varia_state
      }
      const state = {
        locations: {},
        warps: {},
        inventory: this.inventory,
      }
      const type_map = {}
      const area_locations = {}
      this.areas.forEach((area) => {
        const target_area = subarea_by_area[area.slug] || area.slug
        area_locations[target_area] = area_locations[target_area] || []
        area.locations.forEach((i) => {
          type_map[i.slug] = 'location'
          area_locations[target_area].push(i.slug)
        })
        area.warps.forEach((w) => (type_map[w.slug] = 'warp'))
      })
      this.tool_storage.state.actions.forEach(([action_type, id, arg2]) => {
        if (action_type === 'connect-warp') {
          state.warps[id] = arg2
          state.warps[arg2] = id
        } else if (action_type === 'disconnect-warp') {
          delete state.warps[id]
          delete state.warps[arg2]
        } else if (action_type === 'click-location') {
          state.locations[id] = !state.locations[id]
        } else if (action_type === 'clear-area') {
          const location_slugs = area_locations[id] || []
          const remaining_locations = location_slugs.filter((i) => !state.locations[i]).length
          location_slugs.forEach((i) => (state.locations[i] = remaining_locations !== 0))
        } else {
          console.warn('Unknown action:', action_type, id, arg2)
        }
      })
      return state
    },
  },
  mounted() {
    window.$tracker = this
    document.addEventListener('keydown', this.keyPress)
    window.addEventListener('resize', this.resize)
    if (this.$route.query.dummy) {
      this.$store.getDummyData().then((d) => {
        this.json_data = d
      })
    }
  },
  unmounted() {
    document.removeEventListener('keydown', this.keyPress)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    addCorners() {
      this.osd_store.viewer.addOnceHandler('tile-loaded', this.addImages)
      const { selected } = this.$store.layout.state
      if (this.$route.query.debug) {
        const url = getStaticUrl(`/${selected}/area_map.png`)
        this.osd_store.viewer.addSimpleImage({ url })
      } else if (selected === 'streaming') {
        const url = getStaticUrl(`/${selected}/background.png`)
        this.osd_store.viewer.addSimpleImage({ url })
      } else {
        const { scale, width: x_max, height: y_max } = this.$store.layout.getWorld().root
        const url = getGridUrl(1, 1, scale)
        const corners = [
          [0, 0, 0],
          [0, (y_max - scale) / x_max, 270],
          [(x_max - scale) / x_max, (y_max - scale) / x_max, 180],
          [(x_max - scale) / x_max, 0, 90],
        ]
        corners.forEach(([x, y, degrees]) => {
          this.osd_store.viewer.addSimpleImage({
            url,
            x,
            y,
            width: scale / x_max,
            degrees,
          })
        })
      }
    },
    addImages() {
      const { selected } = this.$store.layout.state
      this.areas.forEach((area) => {
        const { width: max_width, scale } = this.$store.layout.getWorld().root
        let { width, x, y } = area
        const url = `/${selected}/${area.slug}.png`
        this.osd_store.viewer.addSimpleImage({
          url,
          x: (x * scale) / max_width,
          y: (y * scale) / max_width,
          width: (width * scale) / max_width,
        })
      })
      this.resetZoom()
    },
    resetZoom() {
      const { width, height } = this.$store.layout.getWorld().root
      const H = height / width
      this.osd_store.viewer.viewport.fitBounds(new Rect(0, 0, 1, H), true)
    },
    moveArea(area, { dx, dy }) {
      this.$store.layout.moveArea(area.slug, dx, dy)
    },
    keyPress(e) {
      const { area_keys, key_stack } = this.tool_storage.state
      const reverse_keys = {}
      Object.entries(area_keys).forEach(([area, key]) => {
        reverse_keys[key] = area
      })

      const last_key = key_stack[key_stack.length - 1]
      const penultimate_key = key_stack[key_stack.length - 2]
      const isDigit = (k) => '1234567890'.includes(k)
      const isArea = (k) => !!reverse_keys[k]

      const can_press_area = !isArea(last_key)
      const can_press_digit = isArea(last_key) || isArea(penultimate_key)

      if (e.ctrlKey) {
        if (['z', 'Z'].includes(e.key)) {
          this.tool_storage[e.shiftKey ? 'redo' : 'undo']()
        }
      } else if (e.key === 'Backspace') {
        this.tool_storage.state.key_stack.pop()
      } else if (isDigit(e.key) && can_press_digit) {
        key_stack.push(e.key)
        const code1 = key_stack.slice(0, 2).join('').toLowerCase()
        const warp1 = this.$el.querySelector('#' + this.code_map[code1])
        if (warp1) {
          warp1.click()
        }
        this.tool_storage.state.key_stack = []
      } else if (isArea(e.key) && can_press_area) {
        key_stack.push(e.key)
      } else if (e.key === 'x' && key_stack.length === 1) {
        const area = this.areas.find((a) => a.slug === reverse_keys[key_stack[0]])
        this.tool_storage.clearArea(area)
        this.tool_storage.state.key_stack = []
      }
      this.tool_storage.save()
    },
    addItem(name, amount) {
      const max_items = {
        missile: 995,
        'super-missile': 255,
        'power-bomb': 255,
        'reserve-tank': 4,
        'energy-tank': 14,
      }
      if (['missile', 'super-missile', 'power-bomb'].includes(name)) {
        amount = amount * 5
      }
      this.inventory[name] = Math.max(0, (this.inventory[name] || 0) + amount)
      this.inventory[name] = Math.min(this.inventory[name], max_items[name])
    },
    toggleItem(name) {
      this.inventory[name] = !this.inventory[name]
    },
    resize: debounce(function () {
      this.resetZoom()
    }, 200),
    setJsonData(json_data) {
      this.json_data = json_data
    },
  },
}
</script>
