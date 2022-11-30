import { startCase, cloneDeep } from 'lodash'

import { access_points, boss_doors, escape_doors, sand_doors } from '@/data/old'
import legacy from './legacy'

const rotated_door_regexp = /(Top|Bottom|redBrinstarElevator)$/

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
    name: startCase(slug),
    x,
    y,
    rotated: isRotated(slug),
    type: warp_types[slug],
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
  moveArea(layout_slug, area_slug, dx, dy) {
    const area = this[layout_slug].areas.find((area) => area.slug === area_slug)
    if (!area) {
      throw `Unable to locate area: ${area_slug}`
    }
    area.x += dx
    area.y += dy
  },
}
