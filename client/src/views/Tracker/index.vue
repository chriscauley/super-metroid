<template>
  <div :class="wrapper_class" :style="`--zoom: ${osd_store?.state.zoom || 1}`">
    <div v-if="completed_objectives" class="objectivesPopup" @click="completed_objectives = null">
      <div v-for="obj in completed_objectives" :key="obj">{{ obj }}</div>
    </div>
    <unrest-toolbar :storage="tool_storage" class="tracker-toolbar">
      <template #right>
        <div class="btn-group" v-if="is_admin">
          <button title="Reset Viewer" class="btn -secondary" @click="osd_store.resetZoom">
            <i class="fa fa-arrows-alt" />
          </button>
          <button
            title="Lock viewer"
            :class="`btn -${osd_options.mouseNavEnabled ? 'secondary' : 'primary'}`"
            @click="toggleLock"
          >
            <i :class="`fa fa-${osd_options.mouseNavEnabled ? 'un' : ''}lock`" />
          </button>
        </div>
        <tracker-settings />
        <rando-settings />
        <entity-filter v-if="is_plando" />
      </template>
    </unrest-toolbar>
    <tracker-viewer :areas="areas" :key="selected_layout + tool_storage.getRandoSettings().logic" />
    <div v-if="$store.layout.state.dirty" class="dirty-layout" @click="$store.layout.saveAreas">
      <div class="btn -primary">Save Areas</div>
    </div>
    <div class="tracker-view__key-stack">
      <span v-if="selected_key"> {{ selected_key }} + </span>
      {{ tool_storage.state.key_stack.join(' ') }}
    </div>
    <item-counter :game_state="game_state" :areas="areas" />
    <item-tracker :inventory="game_state.inventory" @add-item="addItem" @toggle-item="toggleItem" />
    <seed-settings :json_data="json_data" />
    <Teleport to="body">
      <edit-area :area="editing_area" :tool_storage="tool_storage" />
    </Teleport>
  </div>
</template>

<script>
import { computed } from 'vue'

import { saveFile } from '@/data/legacy'
import { location_type_map, subarea_by_area, vanilla_warps } from '@/data/old'
import EditArea from './EditArea.vue'
import EntityFilter from './EntityFilter.vue'
import ItemCounter from './ItemCounter.vue'
import ItemTracker from './ItemTracker.vue'
import RandoSettings from './RandoSettings.vue'
import ToolStorage from './ToolStorage'
import TrackerSettings from './TrackerSettings.vue'
import TrackerViewer from './Viewer.vue'
import varia from '@/varia'
import SeedSettings from './SeedSettings.vue'

export default {
  name: 'TrackerView',
  components: {
    EditArea,
    EntityFilter,
    ItemCounter,
    ItemTracker,
    RandoSettings,
    SeedSettings,
    TrackerSettings,
    TrackerViewer,
  },
  provide() {
    return {
      game_state: computed(() => this.game_state),
      varia_state: computed(() => this.varia_state),
      json_data: computed(() => this.json_data),
      osd_store: computed(() => this.osd_store), // TODO osd_storage, not osd_store
      tool_storage: computed(() => this.tool_storage),
      areas: computed(() => this.areas),
    }
  },
  data() {
    window._S = () => saveFile(`${JSON.stringify(this.areas, null, 2)}`, 'areas.json')
    return {
      completed_objectives: null,
      inventory: {},
      varia_state: {},
      tool_storage: ToolStorage(this),
      json_data: null,
      samus_icon: null,
    }
  },
  computed: {
    selected_layout() {
      return this.$store.layout.state.selected
    },
    osd_store() {
      // TODO move to a different storage
      return this.$store.state.osd_store
    },
    osd_options() {
      return this.$store.state.osd_options || {}
    },
    is_varia() {
      return this.$site.name === 'varia'
    },
    is_plando() {
      return this.$route.path.includes('plando')
    },
    editing_area() {
      const { editing } = this.tool_storage.state
      return editing && this.areas.find((a) => a.slug === editing)
    },
    selected_key() {
      const { selected_warp } = this.tool_storage.state
      return selected_warp && this.code_map[selected_warp]
    },
    is_admin() {
      return this.$route.query.is_admin
    },
    code_map() {
      return this.tool_storage.getCodeMap()
    },
    areas() {
      return this.$store.layout.getAreas(this.tool_storage.getRandoSettings().logic)
    },
    skin() {
      return this.$route.query.skin || 'jpg'
    },
    wrapper_class() {
      const { tracker_settings, entity_filter } = this.tool_storage.state
      const { large_warps, large_locations, large_doors } = tracker_settings
      const { tool } = this.tool_storage.state.selected
      const layout = this.$store.layout.state.selected
      const { logic } = this.tool_storage.getRandoSettings()
      document.body.dataset.variaLogic = logic
      return [
        `tracker-view -layout-${layout} -tool-${tool} -logic-${logic}`,
        { large_locations, large_warps, large_doors },
        this.is_plando && entity_filter && `-entity-filter-${entity_filter}`,
      ]
    },
    locked_warps() {
      const locked = {}
      const rando_settings = this.tool_storage.getRandoSettings()
      const forceWarp = ([a, b]) => {
        locked[a] = b
        locked[b] = a
      }
      if (rando_settings.areaRando === 'off') {
        // area randomizer locks all area_warps
        vanilla_warps.area.forEach(forceWarp)
      }

      if (!rando_settings.bossRando) {
        // area randomizer locks all area_warps
        vanilla_warps.boss.forEach(forceWarp)
      }
      return locked
    },
    game_state() {
      const { locked_warps } = this
      const varia_game_state = varia.getGameState(this.json_data, locked_warps)
      if (varia_game_state) {
        // game state controlled by server
        return varia_game_state
      }
      const state = {
        locations: {},
        warps: { ...locked_warps },
        inventory: this.inventory,
        locked_warps,
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
      const location_history = []
      const warp_history = []
      this.tool_storage.state.actions.forEach(([action_type, id, arg2]) => {
        if ((action_type.includes('warp') && locked_warps[id]) || locked_warps[arg2]) {
          // warp was set by rando_settings
          return
        }
        if (action_type === 'connect-warp') {
          state.warps[id] = arg2
          state.warps[arg2] = id
          warp_history.push([id, arg2])
        } else if (action_type === 'disconnect-warp') {
          delete state.warps[id]
          delete state.warps[arg2]
        } else if (action_type === 'click-location') {
          state.locations[id] = !state.locations[id]
          location_history.push(id)
        } else if (action_type === 'clear-area') {
          const location_slugs = area_locations[id] || []
          const remaining_locations = location_slugs.filter((i) => !state.locations[i]).length
          location_slugs.forEach((i) => (state.locations[i] = remaining_locations !== 0))
        } else if (action_type === 'undo-location') {
          while (location_history.length) {
            const location_id = location_history.pop()
            if (state.locations[location_id]) {
              delete state.locations[location_id]
              break
            }
          }
        } else if (action_type === 'undo-warp') {
          while (warp_history.length) {
            const [a, b] = warp_history.pop() || []
            if (state.warps[a] && state.warps[b]) {
              delete state.warps[a]
              delete state.warps[b]
              break
            }
          }
        } else if (action_type === 'clear-location') {
          state.locations = {}
        } else if (action_type === 'clear-warp') {
          Object.entries(state.warps).forEach(([a, b]) => {
            if (locked_warps[a] || locked_warps[b]) {
              return
            }
            delete state.warps[a]
            delete state.warps[b]
          })
        } else {
          console.warn('Unknown action:', action_type, id, arg2)
        }
      })

      return state
    },
  },
  mounted() {
    window.$tracker = this
    this.location_type_map = location_type_map // needed by plando
    document.addEventListener('keydown', this.keyPress)
    if (this.$route.query.dummy) {
      this.$store.getDummyData().then((d) => {
        this.json_data = d
      })
    }
    const { selected, preferred } = this.$store.layout.state
    if (this.is_plando) {
      if (selected.includes('streaming')) {
        this.$store.layout.save({ selected: 'nordub', preferred: selected })
      }
    } else if (preferred) {
      this.$store.layout.save({ selected: preferred, preferred: null })
    }
  },
  unmounted() {
    document.removeEventListener('keydown', this.keyPress)
  },
  methods: {
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
      if (this.json_data) {
        const action = amount < 0 ? 'remove' : 'add'
        const itemName = varia.smToVaria(name)
        window.ajaxCall({ action, scope: 'item', itemName }, 'upload')
        return
      }
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
      if (this.json_data) {
        const itemName = varia.smToVaria(name)
        window.ajaxCall({ action: 'toggle', scope: 'item', itemName }, 'upload')
        return
      }
      this.inventory[name] = !this.inventory[name]
    },
    setJsonData(json_data) {
      if (json_data) {
        json_data.svg_rooms = { unknownSvg: true }
        json_data.roomsVisibility.forEach((s) => (json_data.svg_rooms[s] = true))
        if (json_data.newlyCompletedObjectives?.length) {
          clearTimeout(this._obj_timeout)
          this._obj_timeout = setTimeout(() => (this.completed_objectives = null), 3000)
          this.completed_objectives = json_data.newlyCompletedObjectives
        }
      }
      this.json_data = json_data
    },
    setVaria(data) {
      Object.assign(this.varia_state, data)
    },
    toggleLock() {
      const { osd_options } = this.$store.state
      osd_options.mouseNavEnabled = !osd_options.mouseNavEnabled
    },
  },
}
</script>
