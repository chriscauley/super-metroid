import { cloneDeep } from 'lodash'
import toolbar from '@unrest/vue-toolbar'
import unrest from '@unrest/vue'

import HelpPopup from './HelpPopup.vue'

import { warp_type_map, default_area_keys, subarea_by_area } from '@/data/old'

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
    if (component.is_plando) {
      const clickPlay = () => window.displayPopup(component.is_plando)
      const { is_plando, json_data } = component
      const { deleteLoc, clearLocs, deleteLine, clearLines, save } = window
      const loc_items = [
        { text: 'Undo Last Location', icon: 'undo', click: () => deleteLoc(is_plando) },
        { text: 'Reset All Locations', icon: 'trash', click: () => clearLocs(is_plando) },
      ]
      const portal_items = [
        { text: 'Undo Last Portal', icon: 'undo', click: () => deleteLine(is_plando) },
        { text: 'Reset All Portals', icon: 'trash', click: () => clearLines(is_plando) },
      ]

      const download_items = [
        { text: 'Download Unlocked ROM', click: () => save('save'), icon: 'unlock' },
        { text: 'Download Locked ROM', click: () => save('save'), icon: 'lock' },
      ]

      let tools = [
        { slug: 'play', select: clickPlay, icon: 'fa fa-play' },
        { slug: 'item-locations', icon: 'sm-map -egg', items: loc_items },
        { slug: 'portal-locations', icon: 'sm-portal', items: portal_items },
        { slug: 'scavenger', select: window.displayScavPopup, icon: 'fa fa-puzzle-piece' },
        { slug: 'randomize-remaining', select: window.displayRandoPopup, icon: 'fa fa-random' },
        { slug: 'download-rom', items: download_items, icon: 'fa fa-download' },
        { slug: 'help', icon: 'fa fa-question-circle', select: window.startTheTour },
      ]

      if (json_data && json_data.majorsSplit === 'Scavenger') {
        tools = tools.filter((t) => t.slug !== 'scavenger')
      }
      return tools
    }
    const showHelp = () => {
      if (component.is_varia) {
        window.startTheTour()
      } else {
        unrest.ui.alert(HelpPopup)
      }
    }
    let tools = [
      { slug: 'undo', icon: 'fa fa-undo', select: () => storage.undo() },
      { slug: 'clear', icon: 'fa fa-trash', select: clearGame },
      { slug: 'help', icon: 'fa fa-question-circle', select: showHelp },
      component.$store.layout.getButton(component),
    ]
    if (component.is_admin) {
      // if (component.$auth.user?.is_superuser) {
      tools.unshift({ slug: 'play', icon: 'fa fa-gamepad' })
      tools.push('separator')
      tools.push({ slug: 'admin_move_area', icon: 'fa fa-arrows' })
      tools.push({ slug: 'admin_move_location', icon: 'fa fa-archive' })
      tools.push({ slug: 'admin_move_title', icon: 'fa fa-i-cursor' })
    }
    if (component.is_varia) {
      const click = () => window.displayPopup(component.is_plando)
      tools.unshift({ slug: 'play', click, icon: 'fa fa-play' })
    }
    return tools
  }
  const initial = {
    selected: { tool: 'play' },
    actions: [],
    area_keys: cloneDeep(default_area_keys),
    key_stack: [],
    split: 'full',
    warp_display: 'codes',
    large_doors: true,
    large_locations: true,
    large_warp: true,
    item_tracker: 'pause-inventory',
    entity_filter: undefined,
  }
  const storage = toolbar.ToolStorage('tools__tracker_v2', { tools: getTools, initial })
  storage.schema = {
    type: 'object',
    properties: {
      large_doors: { type: 'boolean' },
      large_locations: { type: 'boolean' },
      large_warps: { type: 'boolean' },
      split: {
        name: 'Majors Split',
        type: 'string',
        enum: ['full', 'major', 'chozo', 'scavenger'],
      },
      warp_display: {
        type: 'string',
        enum: ['dot', 'codes'],
      },
      // editor_mode: {
      //   title: 'Controls',
      //   type: 'string',
      //   enum: ['', 'true'],
      //   enumNames: ['Google Maps', 'Photo Shop'],
      //   default: '',
      // },
      item_tracker: {
        type: 'string',
        enum: ['', 'area-counter', 'pause-menu', 'grid', 'compact'],
        enumNames: ['None', 'Area Counter', 'Pause Menu', 'Grid', 'Grid (compact)'],
      },
    },
  }

  const connectWarp = (id, selected_warp) => {
    const { json_data } = component
    if (json_data) {
      window.clickPortal(id, selected_warp)
    } else {
      addAction(['connect-warp', id, selected_warp])
    }
    storage.state.selected_warp = null
  }

  const disconnectWarp = (id, selected_warp) => {
    const { json_data, game_state } = component
    if (json_data) {
      if (game_state[id]) {
        window.removePortal(id)
      } else {
        window.addPortal(id, selected_warp)
      }
    } else {
      addAction(['disconnect-warp', id, selected_warp])
    }
    storage.state.selected_warp = null
  }

  storage.click = (id, game_state) => {
    const type = warp_type_map[id]
    const { json_data } = component
    if (type === 'location') {
      addAction(['click-location', id])
    } else if (type === 'warp' || type === 'boss') {
      if (json_data && !json_data.areaRando) {
        // user cannot modify a warp when areaRando is selected
        return
      }
      const { selected_warp } = storage.state
      const { warps } = game_state
      if (selected_warp === id) {
        // clicked the same warp twice, unselect
        storage.state.selected_warp = null
      } else if (selected_warp && warps[id] === selected_warp) {
        // user clicked an alreayd connected pair, disconnect them
        disconnectWarp(id, selected_warp)
      } else if (selected_warp && !warps[id] && !warps[selected_warp]) {
        // user clicked unpaired warps, connect them
        connectWarp(id, selected_warp)
      } else {
        // user clicked a bad combination of warps or no warp was selected
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

  storage.getEntityXys = () => {
    const out = {}
    const checkUnique = (slug) => {
      if (out[slug]) {
        console.warn('Duplicate slug detected: ' + slug)
      }
    }
    component.areas.forEach((area) => {
      area.warps.forEach((w) => {
        checkUnique(w.slug)
        out[w.slug] = [area.slug, area.x + _(w.x), area.y + _(w.y)]
      })
      area.locations.forEach((i) => {
        checkUnique(i.slug)
        out[i.slug] = [area.slug, area.x + _(i.x), area.y + _(i.y)]
      })
    })
    return out
  }

  storage.clearArea = (area) => {
    addAction(['clear-area', area.slug])
  }

  storage.nextEntityFilter = () => {
    const value = storage.state.entity_filter
    const values = [undefined, 'door', 'warp', 'item']
    const index = values.indexOf(value) + 1
    storage.save({ entity_filter: values[index % values.length] })
  }

  storage.getEntityFilterDisplay = () => {
    const value = storage.state.entity_filter
    if (!value) {
      return 'All'
    }
    return value.slice(0, 1).toUpperCase() + value.slice(1) + 's'
  }

  return storage
}
