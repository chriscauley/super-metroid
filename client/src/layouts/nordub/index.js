import areas from './areas.json'
import legacy from '../legacy'
import svg_coords from './svg_coords'

export default {
  svg_coords,
  root: {
    scale: 32,
    width: 3200,
    height: 1600,
    round: 0.5,
  },
  areas,
  extra_classes: { ...legacy.extra_classes },
}
