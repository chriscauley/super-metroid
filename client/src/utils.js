import site from '@/site'

export const getStaticUrl = (url) => site.root + url

export const filterSplitItems = (items, split) => {
  if (['major', 'chozo', 'scavenger'].includes(split)) {
    return items.filter((i) => i[split])
  }
  return items.slice()
}
