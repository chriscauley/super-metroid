import cssfile from '!raw-loader!./t_style.html'
import { locations_by_area } from '@/data/old'
const chunks = {}

const parent = { width: 1500, height: 750, door_w: 16, door_h: 27 }

const parseChuncks = () => {
  if (Object.keys(chunks).length) {
    return
  }
  cssfile.split('// SPLIT').forEach((text) => {
    if (text.startsWith(':')) {
      const slug = text.match(/:(.*)\n/)[1].trim()
      chunks[slug] = text
    }
  })
}

export const positionLegacyDoors = (areas_json) => {
  parseChuncks()
  const coords_by_door = {}
  chunks.warp
    .replace('\n', '')
    .replace(/\s+/g, '')
    .split('#')
    .forEach((rule) => {
      const door = rule.match(/^\w+/)?.[0]
      if (!door) {
        return
      }
      const left = Number(rule.match(/left:([\d\.]+)%/)[1])
      const top = Number(rule.match(/top:([\d\.]+)%/)[1])
      coords_by_door[door] = [left, top]
    })
  areas_json.forEach((area) => {
    if (!area._doors) {
      return
    }
    area.warps = []
    area._doors.forEach((door) => {
      if (!coords_by_door[door]) {
        console.warn('missing', door)
        return
      }
      const [left, top] = coords_by_door[door]
      let x = parent.width * (left / 100) - area.x
      let y = parent.height * (top / 100) - (area.y * parent.width) / parent.height
      if (door.match(/(Top|Bottom)$/)) {
        x += parent.door_h / 2
        y += parent.door_w / 2
      } else {
        x += parent.door_w / 2
        y += parent.door_h / 2
      }
      area.warps.push([door, x, y])
      delete coords_by_door[door]
    })
    delete area._doors
  })
}

export const positionLegacyLocations = (areas_json) => {
  parseChuncks()
  const coords_by_item = {}
  chunks.locations
    .replace('\n', '')
    .replace(/\s+/g, '')
    .split('#')
    .forEach((rule) => {
      const item = rule.match(/^\w+/)?.[0]
      if (!item) {
        return
      }
      const left = Number(rule.match(/left:([\d\.]+)%/)[1])
      const top = Number(rule.match(/top:([\d\.]+)%/)[1])
      coords_by_item[item] = [left, top]
    })

  areas_json.forEach((area) => {
    if (area.locations?.length) {
      return
    }

    const locations = locations_by_area[area.slug]
    if (!locations) {
      return
    }
    area.locations = locations.map((item) => {
      const [left, top] = coords_by_item[item]

      let x = parent.width * (left / 100) - area.x
      let y = parent.height * (top / 100) - (area.y * parent.width) / parent.height
      return [item, x, y]
    })
  })
}

export const buildLegacy = (areas_json) => {
  positionLegacyLocations(areas_json)
}
