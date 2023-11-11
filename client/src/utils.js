import { range } from 'lodash'
import site from '@/site'

export const getStaticUrl = (url) => site.root + url

export const getGridUrl = (width, height, scale) => {
  const canvas = document.createElement('canvas')
  canvas.height = height * scale
  canvas.width = width * scale
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = 'white'
  range(Math.ceil(width)).forEach((i) => {
    ctx.beginPath()
    ctx.moveTo(i * scale, 0)
    ctx.lineTo(i * scale, height * scale)
    ctx.stroke()
  })
  range(Math.ceil(height)).forEach((i) => {
    ctx.beginPath()
    ctx.moveTo(0, i * scale)
    ctx.lineTo(width * scale, i * scale)
    ctx.stroke()
  })
  return canvas.toDataURL()
}

export const saveFile = (text, filename) => {
  const anchor = document.createElement('a')
  anchor.href = 'data:' + 'text/plain' + 'charset=utf-8,' + escape(text)
  anchor.setAttribute('download', filename)
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}
