import { getStaticUrl } from '@/utils'

// I wrote a bunch of functions to automate importing data from varia's web interface
// this is a record of those functions
// caveat emptor

export const setAreaSize = (area, callback) => {
  // used to set the are size (width and heigh) from an image
  if (area.width) {
    return
  }
  const img = document.createElement('img')
  img.onload = () => {
    area.height = img.height
    area.width = img.width
    callback()
  }
  img.src = getStaticUrl(`/areas/${area.slug}.png`)
}
