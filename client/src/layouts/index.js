import { startCase, cloneDeep, memoize } from 'lodash'

import { access_points, boss_doors, escape_doors, sand_doors, special_items } from '@/data/old'
import legacy from './legacy'

const rotated_door_regexp = /(Top|Bottom|redBrinstarElevator)$/

const parseName = memoize((name) => {
  const old = name
  name = name.replace(
    /(super|missile|outside|yellow|middle|above|false|wall|tatori|turtle|shine|spark|bubble|door|surface|gauntlet|hunter|spike|side|hopper|moat|pink|green|sand|room|bottom|top|left|right|behind|reserve|tank|of|fire|flea)/g,
    (c) => `${c[0].toUpperCase()}${c.slice(1)}`,
  )
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
  area.name = startCase(area.slug)

  area.warps = area.warps.map(([slug, x, y]) => ({
    slug,
    name: parseName(slug),
    x,
    y,
    rotated: isRotated(slug),
    type: warp_types[slug],
  }))

  area.items = area.items.map(([slug, x, y]) => ({
    slug,
    name: parseName(slug),
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
  moveWarp(layout_slug, warp_slug, dx, dy) {
    const layout = this[layout_slug]
    let warp
    layout.areas.find((area) => {
      warp = area.warps.find((warp) => warp[0] === warp_slug)
      return warp
    })
    if (!warp) {
      throw `Unable to locate warp: ${warp_slug}`
    }
    warp[1] += dx
    warp[2] += dy
  },
  moveItem(layout_slug, item_slug, dx, dy) {
    const layout = this[layout_slug]
    let item
    layout.areas.find((area) => {
      item = area.items.find((item) => item[0] === item_slug)
      return item
    })
    if (!item) {
      throw `Unable to locate item: ${item_slug}`
    }
    item[1] += dx
    item[2] += dy
  },
  moveArea(layout_slug, area_slug, dx, dy) {
    const area = this[layout_slug].areas.find((area) => area.slug === area_slug)
    if (!area) {
      throw `Unable to locate area: ${area_slug}`
    }
    area.x += dx
    area.y += dy
  },
}
