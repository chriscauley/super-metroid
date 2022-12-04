import areas from './areas.json'
import { positionLegacyItems } from '@/data/legacy'

positionLegacyItems(areas)

export default {
  root: {
    width: 1500,
    height: 750,
  },
  areas,
}
