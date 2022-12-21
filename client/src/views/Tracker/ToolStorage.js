import { cloneDeep } from 'lodash'
import toolbar from '@unrest/vue-toolbar'
import unrest from '@unrest/vue'

import { type_map, default_area_keys, subarea_by_area } from '@/data/old'

export default (component) => {
  const redo_stack = []

  const addAction = (action) => {
    storage.state.actions.push(action)
    while (redo_stack.length) {
      redo_stack.pop()
    }
    storage.save()
  }

  const clearGame = () => {
    const close = () => unrest.ui.alert(null)
    unrest.ui.alert({
      text: 'Are you sure?',
      actions: [
        {
          click: close,
          text: 'Cancel',
          class: 'btn -primary',
        },
        {
          click: () => {
            storage.clear()
            close()
          },
          text: 'Clear Game State',
          class: 'btn -danger',
        },
      ],
    })
  }

  const getTools = () => {
    const tools = [
      { slug: 'play', icon: 'fa fa-gamepad' },
      { slug: 'undo', icon: 'fa fa-undo', select: () => storage.undo() },
      { slug: 'clear', icon: 'fa fa-trash', select: clearGame },
    ]
    if (true) {
      // if (component.$auth.user?.is_superuser) {
      tools.push({ slug: 'admin_move_area', icon: 'fa fa-arrows' })
      tools.push({ slug: 'admin_move_item', icon: 'fa fa-archive' })
      tools.push({ slug: 'admin_move_title', icon: 'fa fa-i-cursor' })
    }
    return tools
  }
  const initial = {
    selected: { tool: 'play' },
    actions: [],
    area_keys: cloneDeep(default_area_keys),
    key_stack: [],
  }
  const storage = toolbar.ToolStorage('tools__tracker', { tools: getTools, initial })
  storage.schema = {
    type: 'object',
    properties: {
      large_items: { type: 'boolean' },
      large_warps: { type: 'boolean' },
      split: {
        type: 'string',
        enum: ['full', 'major', 'chozo', 'scavenger'],
        default: 'full',
      },
      warp_lines: {
        type: 'string',
        enum: ['area', 'legacy'],
        default: 'area',
      },
      editor_mode: {
        title: 'Controls',
        type: 'string',
        enum: ['', 'true'],
        enumNames: ['Google Maps', 'Photo Shop'],
        default: '',
      },
    },
  }

  storage.click = (id, game_state) => {
    const type = type_map[id]
    if (type === 'item') {
      addAction(['click-item', id])
    } else if (type === 'warp' || type === 'boss') {
      const { selected_warp } = storage.state
      const { warps } = game_state
      if (selected_warp === id) {
        storage.state.selected_warp = null
      } else if (selected_warp && warps[id] === selected_warp) {
        // user clicked an alreayd connected pair, disconnect them
        addAction(['disconnect-warp', id, selected_warp])
        storage.state.selected_warp = null
      } else if (selected_warp && !warps[id] && !warps[selected_warp]) {
        addAction(['connect-warp', id, selected_warp])
        storage.state.selected_warp = null
      } else {
        storage.state.selected_warp = id
      }
    } else if (type === 'sand') {
      unrest.ui.alert({
        text: 'Sand Hall warps connections are set by the area rando setting. If area randomization is on, the left sand pit connects to the door below botwoon. If not, the left sand hall door connects to the vanilla exit in West Maridia.',
        class: '-sm',
      })
    }
    storage.save()
  }

  storage.undo = () => {
    redo_stack.push(storage.state.actions.pop())
    storage.save()
  }

  storage.redo = () => {
    if (redo_stack.length) {
      storage.state.actions.push(redo_stack.pop())
      storage.save()
    }
  }

  storage.clear = () => {
    storage.state.actions = []
  }

  storage.getCodeMap = () => {
    const map = {}
    const { area_keys } = storage.state
    const { areas } = component
    areas.forEach((area) => {
      area.warps.forEach((warp, index) => {
        if (['escape', 'sand'].includes(warp.type)) {
          return
        }
        const slug = subarea_by_area[area.slug] || area.slug
        if (warp.slug.endsWith('RoomOut')) {
          index = 9
        } else if (slug !== area.slug) {
          index = 0
        } else {
          index += 1
        }
        const code = `${area_keys[slug]}${index}`
        map[code] = warp.slug
        map[warp.slug] = code
      })
    })
    return map
  }

  storage.getWarpAreaXys = () => {
    const out = {}
    component.areas.forEach((area) => {
      area.warps.forEach((warp) => {
        out[warp.slug] = [area.slug, area.x + warp.x, area.y + warp.y]
      })
    })
    return out
  }

  storage.clearArea = (area) => {
    addAction(['clear-area', area.slug])
  }

  return storage
}
