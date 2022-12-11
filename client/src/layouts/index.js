import { startCase, cloneDeep, memoize } from 'lodash'

import { access_points, boss_doors, escape_doors, sand_doors, special_items } from '@/data/old'
import legacy from './legacy'

const rotated_door_regexp = /(Top|Bottom|redBrinstarElevator)$/

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
    /(super|missile|outside|yellow|middle|above|false|wall|tatori|turtle|shine|spark|bubble|door|surface|gauntlet|hunter|spike|side|hopper|moat|pink|green|sand|bottom|top|left|right|behind|reserve|tank|of|fire|flea)/g,
    (c) => ` ${c}`,
  )
  if (name.includes('room') && !name.includes('Mushrooms')) {
    name = name.replace('room', ' room')
  }
  return startCase(name)
})

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

const prepArea = (area) => {
  area = cloneDeep(area)
  const isRotated = (slug) => slug.match(rotated_door_regexp)
  area.name = prepName(area.slug)

  area.warps = area.warps.map(([slug, x, y]) => ({
    slug,
    name: prepName(slug),
    x,
    y,
    rotated: isRotated(slug),
    type: warp_types[slug],
  }))

  area.items = area.items.map(([slug, x, y]) => ({
    slug,
    name: prepName(slug),
    x,
    y,
    chozo: special_items.chozo[slug],
    major: special_items.major[slug],
    scavenger: special_items.scavenger[slug],
  }))

  return area
}

export default {
  prepArea,
  legacy,
  getAreas(slug) {
    return this[slug].areas.map(prepArea)
  },
  moveEntity(layout_slug, { type, id }, dx, dy) {
    const layout = this[layout_slug]
    let entity
    layout.areas.find((area) => {
      entity = area[type + 's'].find((entity) => entity[0] === id)
      return entity
    })
    if (!entity) {
      throw `Unable to locate ${type}: ${id}`
    }
    entity[1] += dx
    entity[2] += dy
  },
  moveArea(layout_slug, area_slug, dx, dy) {
    const area = this[layout_slug].areas.find((area) => area.slug === area_slug)
    if (!area) {
      throw `Unable to locate area: ${area_slug}`
    }
    area.x += dx
    area.y += dy
  },
  moveTitle(layout_slug, area_slug, dx, dy) {
    const area = this[layout_slug].areas.find((area) => area.slug === area_slug)
    if (!area) {
      throw `Unable to locate area: ${area_slug}`
    }
    area.title_dxy = area.title_dxy || [0, 0]
    area.title_dxy[0] += dx
    area.title_dxy[1] += dy
  },
}
