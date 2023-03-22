import areas from './areas.json'
import legacy from '../legacy'
import svg_coords from './svg_coords'

export default {
  areas,
  area_rando: true,
  boss_rando: true,
  svg_coords,
  root: {
    scale: 32,
    width: 3200,
    height: 1632,
    round: 0.5,
  },
  extra_classes: { ...legacy.extra_classes },
}
