import site from '@/site'

export const getStaticUrl = (url) => site.root + url

export const filterSplitLocations = (locations, split) => {
  if (['major', 'chozo', 'scavenger'].includes(split)) {
    return locations.filter((i) => i[split])
  }
  return locations.slice()
}
