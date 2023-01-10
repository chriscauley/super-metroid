import { ReactiveLocalStorage } from '@unrest/vue-storage'

import { saveFile } from '@/data/legacy'
import layouts from '@/layouts'

const LS_KEY = 'LAYOUT_STORAGE'
const initial = {
  selected: 'legacy',
  dirty: null,
}

export default () => {
  const storage = ReactiveLocalStorage({ LS_KEY, initial })
  storage.getWorld = () => {
    return layouts[storage.state.selected]
  }
  storage.getAreas = () => {
    storage.watch()
    return layouts.getAreas(storage.state.selected)
  }
  storage.watch = () => storage.state.dirty
  storage.markDirty = () => {
    storage.state.dirty = Math.random() // creates a watcher
  }
  storage.moveEntity = (entity, dx, dy) => {
    layouts.moveEntity(storage.state.selected, entity, dx, dy)
    storage.markDirty()
  }
  storage.moveArea = (area_slug, dx, dy) => {
    const xy = layouts.moveArea(storage.state.selected, area_slug, dx, dy)
    storage.markDirty()
    return xy
  }
  storage.moveTitle = (area_slug, dx, dy) => {
    layouts.moveTitle(storage.state.selected, area_slug, dx, dy)
    storage.markDirty()
  }
  storage.saveAreas = () => {
    const { areas } = layouts[storage.state.selected]
    saveFile(JSON.stringify(areas, null, 2), 'areas.json')
    storage.state.dirty = null
  }
  window.savePaths = () => {
    const svg_coords = layouts[storage.state.selected].svg_coords
    saveFile('export default ' + JSON.stringify(svg_coords, null, 2), 'svg_coords.js')
  }
  storage.getButton = (component) => {
    const { selected } = storage.state
    return {
      slug: 'layout',
      name: 'Layout Skin: ' + selected,
      icon: 'sm-icon -' + selected,
      select: () => {
        const { selected } = storage.state
        const index = (layouts.slugs.indexOf(selected) + 1) % layouts.slugs.length
        const next = layouts.slugs[index]
        storage.save({ selected: next })
        component.resetZoom()
      },
    }
  }
  storage.savePath = (area_slug, path_id, path) => {
    const { selected } = storage.state
    layouts.savePath(selected, area_slug, path_id, path)
    storage.markDirty()
  }
  return storage
}
