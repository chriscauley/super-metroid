import { startCase, cloneDeep, memoize } from 'lodash'

import { access_points, boss_doors, escape_doors, sand_doors } from 'sm-data'
import { getStaticUrl } from '@/utils'
import alt_streaming from './alt-streaming'
import legacy from './legacy'
import nordub from './nordub'
import streaming from './streaming'

// uncomment this to check for missing gps
// import checkGps from './checkGps'
// checkGps(legacy.areas)

const rotated_warp_regexp = /(Top|Bottom|redBrinstarElevator)$/

const SHORT_NAMES = {
  'green-brinstar': 'Gr Brin',
  'red-brinstar': 'Red Brin',
  crocomire: 'Croc',
  ridley: 'R',
  phantoon: 'P',
  draygon: 'D',
  kraid: 'K',
  'kraids-lair': 'Kraid',
  'east-maridia': 'E Marid',
  'west-maridia': 'W Marid',
  'wrecked-ship': 'W Ship',
  'upper-norfair': 'Up No',
  'lower-norfair': 'Lo No',
}

export const prepName = memoize((name) => {
  if (SHORT_NAMES[name]) {
    return SHORT_NAMES[name]
  }
  name = name.replace(
    /(super|missile|outside|yellow|middle|above|false|wall|tatori|turtle|shine|spark|bubble|door|surface|gauntlet|spike|side|hopper|moat|pink|green|sand|bottom|top|left|right|behind|reserve|tank|of|fire|flea|norfair|blue|shame|lower|red)/g,
    (c) => ` ${c}`,
  )
  name = name.replace('Bombred', 'Bomb red')
  if (name.includes('room') && !name.includes('Mushrooms')) {
    name = name.replace('room', ' room')
  }
  return startCase(name)
})

const rotated_doors = {
  CrocomireSpeedwayBottom: true,
  RedKihunterShaftBottom: true,
  PlasmaSparkBottom: true,
  OasisTop: true,
  LeCoudeBottom: true,
  WreckedShipMainShaftBottom: true,
  KihunterBottom: true,
}

const warp_types = {}
access_points.forEach((w) => {
  warp_types[w] = 'area'
})
boss_doors.forEach((w) => {
  warp_types[w] = 'boss'
})
escape_doors.forEach((w) => {
  warp_types[w] = 'escape'
})
sand_doors.forEach((w) => {
  warp_types[w] = 'sand'
})

const prepArea = (area, layout) => {
  area = cloneDeep(area)
  const isRotated = (slug) => slug.match(rotated_warp_regexp)
  area.name = prepName(area.slug)
  if (area.slug.includes('__compact')) {
    area.name = ''
  }

  area.warps = area.warps.map(([slug, x, y]) => {
    const name = prepName(slug)
    const rotated = isRotated(slug)
    const type = warp_types[slug]
    return { slug, x, y, name, rotated, type }
  })

  area.locations = area.locations.map(([slug, x, y]) => {
    const name = prepName(slug)
    return { slug, x, y, name }
  })

  // Remove BT for now since it's not hooked up in varia backend
  area.locations = area.locations.filter((l) => l.slug !== 'BombTorizo')

  area.gpss = (area.gpss || []).map(([slug, x, y]) => ({ slug, x, y, name: prepName(slug) }))
  area.warps.forEach(({ slug, x, y, name }) => area.gpss.push({ slug, x, y, name }))

  area.doors = area.doors.map(([slug, x, y]) => {
    const name = prepName(slug)
    return { slug, name, x, y, rotated: rotated_doors[slug] }
  })

  if (layout.svg_coords) {
    area.svg_coords = layout.svg_coords[area.slug]
  }

  return area
}

const transformLogic = (layout, areas, logic) => {
  const transform_items = ['locations', 'warps', 'doors', 'gpss']

  areas.forEach((area) => {
    if (logic === 'mirror') {
      area.x = layout.root.width / layout.root.scale - area.x - area.width
      transform_items.forEach((key) => {
        area[key].forEach((item) => {
          item.x = area.width - item.x
        })
      })
    }
  })
}

const transformCompact = (areas, compact_settings) => {
  if (compact_settings.area) {
    areas.forEach((area) => {
      if (area.compact_xy) {
        area.x = area.compact_xy[0]
        area.y = area.compact_xy[1]
      }
    })
  }
  if (!compact_settings.boss) {
    areas.forEach((area) => {
      if (area.boss_dxy) {
        area.x += area.boss_dxy[0]
        area.y += area.boss_dxy[1]
      }
    })
  }
}

export default {
  legacy,
  nordub,
  streaming,
  'alt-streaming': alt_streaming,
  slugs: ['legacy', 'nordub', 'streaming', 'alt-streaming'],
  getAreas(slug, logic, compact_settings) {
    const layout = this[slug]
    layout.image_url = getStaticUrl(`/layouts/${logic}/${slug}/`)
    const areas = layout.areas.map((a) => prepArea(a, this[slug]))

    transformCompact(areas, compact_settings)
    transformLogic(layout, areas, logic)
    return areas
  },
  moveEntity(layout_slug, { type, id }, x, y) {
    const layout = this[layout_slug]
    let entity
    layout.areas.find((area) => {
      entity = area[type + 's'].find((entity) => entity[0] === id)
      return entity
    })
    if (!entity) {
      throw `Unable to locate ${type}: ${id}`
    }
    entity[1] = x
    entity[2] = y
  },
  moveArea(layout_slug, area_slug, dx, dy, tool_storage) {
    const layout = this[layout_slug]
    const area = layout.areas.find((area) => area.slug === area_slug)
    if (!area) {
      throw `Unable to locate area: ${area_slug}`
    }
    if (tool_storage.getRandoSettings().areaRando) {
      area.x = area.x + dx
      area.y = area.y + dy
    } else {
      area.compact_xy = area.compact_xy || [area.x, area.y]
      area.compact_xy[0] += dx
      area.compact_xy[1] += dy
    }
  },
  moveTitle(layout_slug, area_slug, dx, dy, logic) {
    const area = this[layout_slug].areas.find((area) => area.slug === area_slug)
    if (!area) {
      throw `Unable to locate area: ${area_slug}`
    }
    const key = logic === 'vanilla' ? 'title_dxy' : `${logic}_title_dxy`
    area[key] = area[key] || [0, 0]
    area[key][0] += dx
    area[key][1] += dy
  },
  savePath(layout_slug, area_slug, path_id, path) {
    this[layout_slug].svg_coords[area_slug][path_id] = path
  },
}
