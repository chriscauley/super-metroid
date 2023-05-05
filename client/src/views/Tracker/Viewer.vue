<template>
  <osd-viewer
    :class="wrapper_class"
    :osd_store="osd_store"
    @viewer-bound="addCorners"
    :editor_mode="!!tool_storage.state.tracker_settings.editor_mode"
    :osd_options="osd_options"
  />
  <osd-html-overlay :viewer="osd_store.viewer" v-if="!loading">
    <div v-if="bg" v-bind="bg" />
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
import { getGridUrl, getStaticUrl } from '@/utils'

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
    bg() {
      const { selected } = this.$store.layout.state
      if (selected === 'streaming') {
        const { show_grid } = this.tool_storage.state.tracker_settings
        const file = `background${show_grid ? '_grid' : ''}.png`
        const url = getStaticUrl(`/layouts/common/streaming/${file}`)
        return {
          class: 'streaming-bg',
          style: { backgroundImage: `url(${url})` },
        }
      }
      return null
    },
  },
  watch: {
    'tool_storage.state.rando_settings.areaRando': 'resetZoom',
    'tool_storage.state.rando_settings.bossRando': 'resetZoom',
    'tool_storage.state.tracker_settings.no_compact': 'resetZoom',
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
      this.loading = true
      this.item_count = this.areas.length + 4 // 4 corners
      this.osd_store.viewer.addHandler('canvas-drag', (e) => {
        if (e.originalEvent.target.classList.contains('unrest-draggable')) {
          e.preventDefaultAction = true
        }
      })
      this.osd_store.viewer.addOnceHandler('tile-loaded', this.addImages)
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
    },
    addImages() {
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
      if (!this.$route.query.debug) {
        this.osd_store.viewer.world._items.forEach((item) => {
          if (item.source.url?.startsWith('data:image/png')) {
            // hide the corners
            item.setOpacity(0)
          }
        })
      }
    },
    resetZoom() {
      const { width: W, height: H } = this.$store.layout.getWorld().root
      if (this.$store.layout.state.selected !== 'nordub') {
        // nordub layout is the only one with compact settings
        // everything else' bounds are set by the layout root
        this.osd_store.viewer.viewport.fitBounds(new Rect(0, 0, 1, H / W), true)
        return
      }

      let xmin = Infinity
      let xmax = -Infinity
      let ymin = Infinity
      let ymax = -Infinity
      this.areas.forEach(({ x, y, width, height, slug }) => {
        if (slug.endsWith('__compact')) {
          // "__compact" tubes are never on the edges (unless they are hidden and at 0,0)
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
    },
    Movearea(area, { dx, dy }) {
      this.$store.layout.moveArea(area.slug, dx, dy)
    },
    finishedLoading() {
      const { _items } = this.osd_store.viewer.world
      const remaining = _items.filter((i) => i.source.tilesUrl && !i.getFullyLoaded())

      // finishedLoading can fire before items are loaded or before addImages
      this.loading = remaining.length !== 0 || _items.length < this.item_count
      clearTimeout(this._timeout)

      if (!this.loading) {
        this.resetZoom()
        this.osd_store.viewer.world._items.forEach((i) => {
          if (i.source.tilesUrl?.includes('__compact')) {
            // Hide the "compact only" elevators
            i.setOpacity(this.compact_settings.area ? 1 : 0)
          }
        })
      } else {
        this._timeout = setTimeout(this.finishedLoading, 100)
      }
    },
  },
}
</script>
