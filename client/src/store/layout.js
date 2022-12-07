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
    layouts.moveArea(storage.state.selected, area_slug, dx, dy)
    storage.markDirty()
  }
  storage.saveAreas = () => {
    const { areas } = layouts[storage.state.selected]
    saveFile(JSON.stringify(areas, null, 2), 'areas.json')
    storage.state.dirty = null
  }
  return storage
}
