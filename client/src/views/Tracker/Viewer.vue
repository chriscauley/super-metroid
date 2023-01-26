<template>
  <osd-viewer
    :osd_store="osd_store"
    @viewer-bound="addCorners"
    :editor_mode="!!tool_storage.state.editor_mode"
    :osd_options="osd_options"
  />
  <osd-html-overlay :viewer="osd_store.viewer" v-if="osd_store.viewer">
    <area-overlay
      v-for="area in areas"
      :key="area.slug"
      :area="area"
      @move-area="(data) => moveArea(area, data)"
      />
    <warp-connections :areas="areas" />
  </osd-html-overlay>
</template>

<script>
import { debounce } from 'lodash'
import openseadragon from 'openseadragon'
import osd from '@unrest/vue-openseadragon'

import AreaOverlay from './AreaOverlay.vue'
import WarpConnections from './WarpConnections.vue'
import { getStaticUrl, getGridUrl } from '@/utils'

const { Rect } = openseadragon

export default {
  name: 'TrackerViewer',
  inject: ['tool_storage'],
  components: { AreaOverlay, WarpConnections },
  props: {
    areas: Array,
  },
  data() {
    return {
      osd_options: { showNavigator: false, mouseNavEnabled: false },
      osd_store: osd.Store(),
    }
  },
  mounted() {
    this.$store.layout.osd_store = this.osd_store
    this.resize = debounce(this.resetZoom, 200)
    window.addEventListener('resize', this.resize)
  },
  unmounted() {
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
        const url = getStaticUrl(`/${selected}/${area.slug}.png`)
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
  },
}
</script>