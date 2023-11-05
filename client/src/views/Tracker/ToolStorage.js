import { cloneDeep } from 'lodash'
import toolbar from '@unrest/vue-toolbar'
import unrest from '@unrest/vue'
import NotInitialized from './NotInitialized'

import HelpPopup from './HelpPopup.vue'

import { default_door_colors, warp_type_map, default_area_keys, subarea_by_area } from '@/data/old'

const warn = unrest.ui.toast.warning

const { TOGGLE } = toolbar.ToolStorage

const tracker_settings = {
  schema: {
    type: 'object',
    properties: {
      large_doors: { type: 'boolean' },
      large_locations: { type: 'boolean' },
      large_warps: { type: 'boolean' },
      show_objectives: {
        type: 'boolean',
      },
      // editor_mode: {
      //   title: 'Controls',
      //   type: 'string',
      //   enum: ['', 'true'],
      //   enumNames: ['Google Maps', 'Photo Shop'],
      //   default: '',
      // },
      visible_locations: {
        type: 'string',
        enum: ['full', 'major', 'chozo', 'scavenger'],
      },
      item_tracker: {
        type: 'string',
        enum: ['', 'pause-menu', 'grid', 'compact', 'cwisp'],
        enumNames: ['None', 'Pause Menu', 'Grid', 'Compact Grid', 'CWISP Grid'],
      },
      room_visibility: {
        type: 'string',
        enum: ['highlight-open', 'hide-closed'],
      },
      no_compact: {
        title: 'Never Compact',
        type: 'boolean',
      },
      show_grid: {
        type: 'boolean',
      },
      warp_display: {
        type: 'string',
        enum: ['dot', 'codes'],
      },
    },
  },
  initial: {
    warp_display: 'dot',
    large_doors: false,
    large_locations: false,
    large_warps: false,
    show_objectives: true,
    item_tracker: 'pause-menu',
    visible_locations: 'full',
    room_visibility: 'highlight-open',
    no_compat: false,
  },
}

const rando_settings = {
  schema: {
    type: 'object',
    properties: {
      logic: {
        type: 'string',
        enum: ['vanilla', 'mirror'],
      },
      majorsSplit: {
        type: 'string',
        enum: ['Full', 'FullWithHUD', 'Major', 'Chozo', 'Scavenger'],
        enumNames: ['Full', 'Full Countdown', 'Major', 'Chozo', 'Scavenger'],
      },
      areaRando: {
        type: 'boolean',
      },
      bossRando: {
        type: 'boolean',
      },
      escapeRando: {
        type: 'boolean',
      },
      doorsRando: {
        type: 'boolean',
      },
      tourian: {
        type: 'string',
        enum: ['Vanilla', 'Fast', 'Disabled'],
      },
    },
  },
  initial: {
    logic: 'vanilla',
    majorsSplit: 'full',
    areaRando: 'off',
    bossRando: false,
    escapeRando: false,
    doorsRando: false,
    tourian: 'Vanilla',
  },
}

export default (component) => {
  const edit_tool = { slug: 'edit_mode', icon: 'fa fa-edit', select: TOGGLE }

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

  const isAreaRando = () => {
    const { areaRando, escapeRando, bossRando } = storage.getRandoSettings()
    return areaRando || escapeRando || bossRando
  }

  // this is an interface to some legacy functions I haven't absorbed into the library
  const varia = {
    undoLocation: () => window.deleteLoc(component.is_plando),
    clearLocations: () => window.clearLocs(component.is_plando),
    undoPortal: () => {
      if (!isAreaRando()) {
        warn('Area randomiztion is off.')
        return
      }
      const startPoint = storage.state.selected_warp
      const is_connected = component.game_state.warps[startPoint]
      if (is_connected) {
        // removes selected warp
        window.ajaxCall({ action: 'remove', scope: 'area', startPoint }, 'upload')
      } else {
        // removes last warp (undo)
        window.ajaxCall({ action: 'remove', scope: 'area' }, 'upload')
      }
    },
    clearPortals: () => {
      if (!isAreaRando()) {
        warn('Area randomiztion is off.')
        return
      }
      if (!confirm('Reset seed transitions?')) {
        return
      }
      window.ajaxCall({ action: 'clear', scope: 'area' }, 'upload')
    },
  }

  const getTools = () => {
    if (component.is_varia) {
      const clickPlay = () => window.displayPopup(component.is_plando)
      const play = { slug: 'play', name: 'Load Seed', select: clickPlay, icon: 'fa fa-play' }
      const help = {
        slug: 'help',
        icon: 'fa fa-question-circle',
        select: window.startTheTour,
        id: 'welcomeHelp',
      }
      if (!(component.json_data && window.init)) {
        return [play, help]
      }
      const loc_items = [
        { text: 'Undo Last Location', icon: 'undo', click: varia.undoLocation },
        { text: 'Reset Locations', icon: 'trash', click: varia.clearLocations },
      ]
      const portal_items = [
        { text: 'Undo Last Portal', icon: 'undo', click: varia.undoPortal },
        { text: 'Reset Portals', icon: 'trash', click: varia.clearPortals },
      ]

      const download_items = [
        { text: 'Download Unlocked ROM', click: () => window.save('save'), icon: 'unlock' },
        { text: 'Download Locked ROM', click: () => window.save('lock'), icon: 'lock' },
      ]

      let tools = [
        play,
        { slug: 'item-locations', icon: 'sm-map -egg', items: loc_items },
        { slug: 'portal-locations', icon: 'sm-portal', items: portal_items },
        { slug: 'scavenger', select: window.displayScavPopup, icon: 'fa fa-puzzle-piece' },
        { slug: 'randomize-remaining', select: window.displayRandoPopup, icon: 'fa fa-random' },
        { slug: 'download-rom', items: download_items, icon: 'fa fa-download' },
        component.$store.layout.getButton(component),
        help,
        edit_tool,
      ]

      const remove = (slug) => (tools = tools.filter((t) => t.slug !== slug))
      if (component.json_data?.majorsSplit !== 'Scavenger') {
        remove('scavenger')
      }
      if (component.is_plando) {
        remove('layout')
      } else {
        remove('randomize-remaining')
        remove('download-rom')
      }
      return tools
    }

    const showHelp = () => unrest.ui.alert(HelpPopup)
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
      const select = () => window.displayPopup(component.is_plando)
      tools.unshift({ slug: 'play', select, icon: 'fa fa-play' })
    }
    tools.push(edit_tool)
    return tools
  }
  const initial = {
    selected: { tool: 'play' },
    active_door: null,
    active_location: null,
    actions: [],
    area_keys: cloneDeep(default_area_keys),
    key_stack: [],
    tracker_settings: { ...tracker_settings.initial },
    rando_settings: { ...rando_settings.initial },
  }
  const storage = toolbar.ToolStorage('tools__tracker_v2', { tools: getTools, initial })
  storage.tracker_settings = tracker_settings
  storage.rando_settings = rando_settings

  // reset these on refresh
  storage.save({
    key_stack: [],
    active_door: null,
    selected: { tool: 'play' },
    selected_warp: null,
  })

  const connectWarp = (id, selected_warp) => {
    const { json_data } = component
    const type1 = warp_type_map[id]
    const type2 = warp_type_map[selected_warp]
    if (type1 !== type2) {
      if (type1 === 'escape' || type2 === 'escape') {
        warn('You cannot connect escape portals with non-escape portals.')
        storage.state.selected_warp = null
        return
      }
    }
    if (json_data) {
      if (window.interfaceIsFrozen()) {
        return
      }
      window.addPortal(id, selected_warp)
    } else {
      addAction(['connect-warp', id, selected_warp])
    }
    storage.state.selected_warp = null
  }

  const disconnectWarp = (id, selected_warp) => {
    const { json_data } = component
    if (json_data) {
      if (window.interfaceIsFrozen()) {
        return
      }
      window.removePortal(id, selected_warp)
    } else {
      addAction(['disconnect-warp', id, selected_warp])
    }
    storage.state.selected_warp = null
  }

  const checkVaria = () => {
    if (component.is_varia && !component.json_data && !window.init) {
      unrest.ui.alert(NotInitialized)
      return false
    }
    return true
  }

  storage.clickDoor = (id) => {
    // TODO this should be using the getRandoSettings() and needs to work in serverless mode
    const { mode, doorsRando } = component.json_data || {}
    if (storage.getDoorColor(id) === 'blue') {
      // doors froced to blue cannot be changed
      return
    }
    if (mode === 'standard' && doorsRando) {
      // user clicks on white doors to see what they are
      const doorName = id
      window.ajaxCall({ action: 'toggle', scope: 'door', doorName }, 'upload')
      return
    }

    // user is in plando mode, race mode, or using seedless tracker
    if (!doorsRando || storage.state.active_door === id) {
      storage.state.active_door = null
    } else {
      storage.state.active_door = id
    }
  }

  const setVariaLocation = (action, locName, itemName, hide) => {
    window.ajaxCall({ action, scope: 'item', locName, itemName, hide }, 'upload')
    if (action === 'add' && locName === 'MotherBrain') {
      alert('SEE YOU NEXT MISSION')
    }
  }

  storage.clickLocation = (id) => {
    if (!checkVaria()) {
      return
    }
    if (component.json_data) {
      const visited = component.json_data.visitedLocations[id]
      const type = component.location_type_map[id]
      const is_boss = ['boss', 'miniboss'].includes(type)
      if (component.is_plando && !is_boss) {
        storage.state.active_location = id
      } else {
        // in tracker or clicked plando boss
        const action = visited ? 'remove' : 'add'
        setVariaLocation(action, id, component.is_plando ? id : undefined)
        storage.state.active_location = null
      }
    } else {
      addAction(['click-location', id])
    }
  }

  storage.updateLocationItem = (locName, itemName, old_item, hide) => {
    if (component.json_data) {
      if (window.interfaceIsFrozen()) {
        return
      }
      if (itemName === '') {
        if (old_item) {
          setVariaLocation('remove', locName)
        }
      } else if (itemName !== old_item) {
        const action = old_item ? 'replace' : 'add'
        setVariaLocation(action, locName, itemName, hide)
      }
      storage.state.active_location = null
    } else {
      warn('TODO client side item tracking')
    }
  }

  storage.updateDoorColor = (id, newColor, old_color) => {
    if (component.json_data) {
      if (window.interfaceIsFrozen()) {
        return
      }
      if (newColor !== old_color) {
        const data = { action: 'replace', scope: 'door', doorName: id, newColor }
        window.ajaxCall(data, 'upload')
      }
    } else {
      warn('TODO client side door tracking')
    }
    storage.state.active_door = null
  }

  storage.getDoorColor = (id) => {
    if (default_door_colors[id] === 'hidden') {
      return 'hidden'
    }
    const json_door = component.json_data?.doors[id]
    if (json_door) {
      const [color, _facing, hidden] = json_door
      return hidden ? 'white' : color
    }
    return default_door_colors[id]
  }

  storage.clickWarp = (id) => {
    const type = warp_type_map[id]
    const rando_settings = storage.getRandoSettings()
    if (type === 'sand') {
      unrest.ui.alert({
        text: 'Sand Hall warps connections are set by the area rando setting. If area randomization is on, the left sand pit connects to the door below botwoon. If not, the left sand hall door connects to the vanilla exit in West Maridia.',
        class: '-sm',
      })
    } else if (['area', 'boss', 'escape'].includes(type)) {
      if (!rando_settings[type + 'Rando']) {
        warn(`You cannot change this portal because ${type} rando is off.`)
        return
      }
      const { selected_warp } = storage.state
      const { warps } = component.game_state
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
        out[w.slug] = [area.x + _(w.x), area.y + _(w.y)]
      })
      area.locations.forEach((i) => {
        checkUnique(i.slug)
        out[i.slug] = [area.x + _(i.x), area.y + _(i.y)]
      })
    })
    return out
  }

  storage.clearArea = (area) => {
    addAction(['clear-area', area.slug])
  }

  storage.getRandoSettings = () => {
    const { json_data } = component
    if (json_data) {
      const { properties } = rando_settings.schema
      return Object.fromEntries(Object.keys(properties).map((key) => [key, json_data[key]]))
    }
    return storage.state.rando_settings
  }

  storage.filterVisibleLocations = (locations) => {
    if (component.$store.layout.getWorld().hide_locations) {
      return []
    }
    if (component.json_data) {
      return locations
    }
    const { visible_locations } = storage.state.tracker_settings
    if (['major', 'chozo', 'scavenger'].includes(visible_locations)) {
      return locations.filter((i) => i[visible_locations])
    }
    return locations.slice()
  }

  return storage
}
