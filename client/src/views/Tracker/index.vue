<template>
  <div :class="wrapper_class" :style="`--zoom: ${osd_store.state.zoom}`">
    <unrest-toolbar :storage="tool_storage" class="tracker-toolbar">
      <template #right>
        <div class="btn-group">
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
        <unrest-dropdown>
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
          :parent="parent"
          @move-area="(data) => moveArea(area, data)"
          :osd_store="osd_store"
          :tool_storage="tool_storage"
          :game_state="game_state"
        />
        <warp-connections :areas="areas" :game_state="game_state" :tool_storage="tool_storage" />
      </osd-html-overlay>
      <!-- <div v-for="area in areas" :key="area.slug"> -->
      <!--   <img :src="`/areas/${area.slug}.png`" /> -->
      <!-- </div> -->
    </template>
    <div v-if="$store.layout.state.dirty" class="dirty-layout" @click="$store.layout.saveAreas">
      <div class="btn -primary">Save Areas</div>
    </div>
  </div>
</template>

<script>
import osd from '@unrest/vue-openseadragon'
import openseadragon from 'openseadragon'

import { saveFile } from '@/data/legacy'
import AreaOverlay from '@/components/AreaOverlay'
import ToolStorage from './ToolStorage'
import WarpConnections from './WarpConnections.vue'

const { Rect } = openseadragon

export default {
  name: 'TrackerView',
  components: { AreaOverlay, WarpConnections },
  data() {
    window._S = () => saveFile(`${JSON.stringify(this.areas, null, 2)}`, 'areas.json')
    const parent = {
      width: 1500,
      height: 750,
    }
    const tool_storage = ToolStorage(this)
    const osd_store = osd.Store()
    const osd_options = { showNavigator: false, mouseNavEnabled: false }
    return { osd_store, parent, tool_storage, osd_options }
  },
  computed: {
    areas() {
      return this.$store.layout.getAreas()
    },
    skin() {
      return this.$route.query.skin || 'jpg'
    },
    wrapper_class() {
      const { large_warps, large_items } = this.tool_storage.state
      return [
        `tracker-view -layout-${this.$store.layout.state.selected}`,
        { large_items, large_warps },
      ]
    },
    game_state() {
      const state = {
        items: {},
        warps: {},
      }
      const type_map = {}
      this.areas.forEach((area) => {
        area.items.forEach((i) => (type_map[i.slug] = 'item'))
        area.warps.forEach((w) => (type_map[w.slug] = 'warp'))
      })
      this.tool_storage.state.actions.forEach(([action_type, id, arg2]) => {
        if (action_type === 'connect-warp') {
          state.warps[id] = arg2
          state.warps[arg2] = id
        } else if (action_type === 'disconnect-warp') {
          delete state.warps[id]
          delete state.warps[arg2]
        } else if (action_type === 'click-item') {
          state.items[id] = !state.items[id]
        } else {
          console.warn('Unknown action:', action_type, id, arg2)
        }
      })
      window.GS = state
      return state
    },
  },
  methods: {
    addCorners() {
      this.osd_store.viewer.addOnceHandler('tile-loaded', this.addImages)
      if (this.skin === 'jpg' && this.$route.query.debug) {
        const url = '/areas/area_map.png'
        this.osd_store.viewer.addSimpleImage({ url })
      } else {
        const canvas = document.createElement('canvas')
        const scale = 16
        canvas.width = canvas.height = scale
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, scale, scale)
        const url = canvas.toDataURL()
        const { width: x_max, height: y_max } = this.parent
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
            opacity: 1,
            degrees,
          })
        })
      }
    },
    addImages() {
      // this.areas.forEach(area => {
      //   const url = `/areas/${area.slug}.png`
      //   this.osd_store.viewer.addSimpleImage({ url })
      // })
      this.resetZoom()
    },
    resetZoom() {
      const { width, height } = this.parent
      const H = height / width
      this.osd_store.viewer.viewport.fitBounds(new Rect(0, 0, 1, H), true)
    },
    moveArea(area, { dx, dy }) {
      this.$store.layout.moveArea(area.slug, dx, dy)
    },
  },
}
</script>
