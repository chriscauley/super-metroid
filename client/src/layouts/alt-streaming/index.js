import areas from './areas.json'

export default {
  root: {
    scale: 15,
    height: 531,
    width: 350,
    round: 0.1,
    // because the OSD area is defined by the width of the image and this taller than wide
    // need to add this svg_scale factor
    svg_scale: 0.5,
    text_gap_scale: 0.3,
  },
  areas,
  hide_locations: true,
  extra_classes: {},
}
