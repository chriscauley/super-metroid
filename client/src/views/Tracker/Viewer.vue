<template>
  <osd-viewer
    :class="wrapper_class"
    :osd_store="osd_store"
    @viewer-bound="addCorners"
    :editor_mode="!!tool_storage.state.tracker_settings.editor_mode"
    :osd_options="osd_options"
  />
  <osd-html-overlay :viewer="osd_store.viewer" v-if="osd_store.viewer">
    <area-overlay
      v-for="area in areas"
      :key="area.slug"
      :area="area"
      @move-area="(data) => moveArea(area, data)"
    />
    <warp-connections />
    <samus-icon />
  </osd-html-overlay>
</template>

<script>
import { debounce } from 'lodash'
import openseadragon from 'openseadragon'
import osd from '@unrest/vue-openseadragon'

import AreaOverlay from './AreaOverlay.vue'
import SamusIcon from './SamusIcon.vue'
import WarpConnections from './WarpConnections.vue'
import { getGridUrl } from '@/utils'

const { Rect } = openseadragon

export default {
  name: 'TrackerViewer',
  components: { AreaOverlay, SamusIcon, WarpConnections },
  inject: ['tool_storage', 'compact_settings', 'json_data'],
  props: {
    areas: Array,
  },
  data() {
    return {
      loading: true,
      osd_options: { showNavigator: false, mouseNavEnabled: false },
      osd_store: osd.Store(),
    }
  },
  computed: {
    wrapper_class() {
      return [this.loading && '-loading']
    },
  },
  watch: {
    'tool_storage.state.rando_settings.areaRando': 'resetZoom',
    'tool_storage.state.rando_settings.bossRando': 'resetZoom',
    json_data: 'resetZoom',
  },
  mounted() {
    this.$store.state.osd_store = this.osd_store
    this.osd_store.resetZoom = this.resetZoom
    this.$store.state.osd_options = this.osd_options
    this.resize = debounce(this.resetZoom, 200)
    window.addEventListener('resize', this.resize)
  },
  unmounted() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    getLayoutUrl(filename) {
      return this.$store.layout.getWorld().image_url + filename
    },
    addCorners() {
      this.osd_store.viewer.addHandler('canvas-drag', (e) => {
        if (e.originalEvent.target.classList.contains('unrest-draggable')) {
          e.preventDefaultAction = true
        }
      })
      this.osd_store.viewer.addOnceHandler('tile-loaded', this.addImages)
      const { selected } = this.$store.layout.state
      if (selected === 'streaming') {
        const url = this.getLayoutUrl('background.png')
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
      this.loading = true
      this.osd_store.viewer.addOnceHandler('tile-loaded', this.finishedLoading)
      this.areas.forEach((area) => {
        const { width: max_width, scale } = this.$store.layout.getWorld().root
        let { width, x, y } = area
        const tileSource = this.getLayoutUrl(`${area.slug}.dzi`)
        this.osd_store.viewer.addTiledImage({
          tileSource,
          x: (x * scale) / max_width,
          y: (y * scale) / max_width,
          width: (width * scale) / max_width,
        })
      })
      this.resetZoom()
    },
    resetZoom() {
      const { width: W } = this.$store.layout.getWorld().root

      let xmin = Infinity
      let xmax = -Infinity
      let ymin = Infinity
      let ymax = -Infinity
      this.areas.forEach(({ x, y, width, height, slug }) => {
        if (slug.endsWith('__compact')) {
          // "__compact" tubes are never on the edges
          return
        }
        xmin = Math.min(xmin, x - 1)
        xmax = Math.max(xmax, x + width + 1)
        ymin = Math.min(ymin, y - 3)
        ymax = Math.max(ymax, y + height + 1)
      })

      const S = W / 32
      const bounds = new Rect(xmin / S, ymin / S, (xmax - xmin) / S, (ymax - ymin) / S)
      this.osd_store.viewer.viewport.fitBounds(bounds, true)

      // this.osd_store.viewer.viewport.fitBounds(new Rect(0, 0, 1, H / W), true)
      this.osd_store.viewer.world._items.forEach((i) => {
        if (i.source.tilesUrl?.includes('__compact')) {
          // Hide the "compact only" elevators
          i.setOpacity(this.compact_settings.area ? 1 : 0)
        }
      })
    },
    Movearea(area, { dx, dy }) {
      this.$store.layout.moveArea(area.slug, dx, dy)
    },
    finishedLoading() {
      const remaining = this.osd_store.viewer.world._items.filter((i) => !i.getFullyLoaded())
      this.loading = remaining.length === 0
      clearTimeout(this._timeout)
      if (this.loading) {
        this._timeout = setTimeout(this.finishedLoading, 100)
      } else {
        this.resetZoom()
      }
    },
  },
}
</script>
