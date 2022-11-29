<template>
  <div class="tracker-view" :style="`--zoom: ${osd_store.state.zoom}`">
    <osd-viewer :osd_store="osd_store" @viewer-bound="addCorners" :editor_mode="true" />
    <template v-if="osd_store.viewer">
      <osd-html-overlay :viewer="osd_store.viewer">
        <area-overlay
          v-for="area in areas"
          :key="area.slug"
          :area="area"
          :parent="parent"
          @move-area="(data) => moveArea(area, data)"
          :osd_store="osd_store"
        />
      </osd-html-overlay>
      <!-- <div v-for="area in areas" :key="area.slug"> -->
      <!--   <img :src="`/areas/${area.slug}.png`" /> -->
      <!-- </div> -->
    </template>
  </div>
</template>

<script>
import { saveFile } from '@/data/legacy'
import { areas } from '@/data'
import osd from '@unrest/vue-openseadragon'
import openseadragon from 'openseadragon'
import AreaOverlay from '@/components/AreaOverlay'

const { Rect } = openseadragon

areas.forEach((area) => {
  if (area.width) {
    return
  }
  const img = document.createElement('img')
  img.onload = () => {
    area.height = img.height
    area.width = img.width
    resolve(true)
  }
  img.src = `/areas/${area.slug}.png`
})

export default {
  components: { AreaOverlay },
  data() {
    window._S = () => saveFile(`${JSON.stringify(this.areas, null, 2)}`, 'areas.json')
    const parent = {
      width: 1500,
      height: 750,
    }
    return { areas, osd_store: osd.Store(), parent }
  },
  computed: {
    skin() {
      return this.$route.query.skin || 'jpg'
    },
  },
  methods: {
    addCorners() {
      window.OSDS = this.osd_store
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
      const { width, height } = this.parent
      const H = height / width
      this.osd_store.viewer.viewport.fitBounds(new Rect(0, 0, 1, H), true)
      // this.areas.forEach(area => {
      //   const url = `/areas/${area.slug}.png`
      //   this.osd_store.viewer.addSimpleImage({ url })
      // })
    },
    moveArea(area, { dx, dy }) {
      area.x = (area.x || 0) + dx
      area.y = (area.y || 0) + dy
    },
  },
}
</script>
