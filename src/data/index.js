import { startCase, cloneDeep } from 'lodash'

import areas_json from './areas.json'
import { access_points, boss_doors, escape_doors, sand_doors } from './old'
import { buildLegacy } from './legacy'

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

buildLegacy(areas_json)

const prepArea = (area) => {
  const isRotated = (slug) => slug.match(/(Top|Bottom)$/) || slug === 'redBrinstarElevator'
  area.name = startCase(area.slug)
  area.warps = area.warps.map(([slug, x, y]) => ({
    slug,
    name: startCase(slug),
    x,
    y,
    rotated: isRotated(slug),
    type: warp_types[slug],
  }))
}
export const areas = cloneDeep(areas_json)
areas.forEach(prepArea)
