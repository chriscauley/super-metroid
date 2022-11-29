import cssfile from '!raw-loader!./t_style.html'
const chunks = {}

export const saveFile = (text, filename) => {
  const anchor = document.createElement('a')
  anchor.href = 'data:' + 'text/plain' + 'charset=utf-8,' + escape(text)
  anchor.setAttribute('download', filename)
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}

export const buildLegacy = (areas_json) => {
  const parent = { width: 1500, height: 750, door_w: 16, door_h: 27 }
  cssfile.split('// SPLIT').forEach((text) => {
    if (text.startsWith(':')) {
      const slug = text.match(/:(.*)\n/)[1].trim()
      chunks[slug] = text
    }
  })
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
  window.SL = () => saveFile(JSON.stringify(areas_json, null, 2), 'areas.json')
}
