import areas from './areas.json'

export default {
  root: {
    scale: 20,
    height: 731,
    width: 492,
    round: 1000,
    offset: 0,
    // because the OSD area is defined by the width of the image and this taller than wide
    // need to add this svg_scale factor
    svg_scale: 0.5,
    text_gap_scale: 0.4,
  },
  areas,
  hide_items: true,
  extra_classes: {},
}
