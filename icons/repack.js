const fs = require('fs')

const lines = ['/* File was autogenerated using client/repack.js */']
const loadStatic = (s) => JSON.parse(fs.readFileSync('./src/assets/' + s))
const _toSassMap = (obj) => JSON.stringify(obj, null, 2).replace(/[{]/g, '(').replace(/[}]/g, ')')

const icons = loadStatic('icons.json')
const icon_categories = ['items', 'ui_items', 'custom-items', 'block', 'block-alt']
icon_categories.forEach((category) => {
  lines.push(`$${category}: ${icons[category]['icons'].join(' ')};`)
})

const bosses = [
  'botwoon',
  'crocomire',
  'draygon',
  'bomb-torizo',
  'golden-torizo',
  'kraid',
  'mother-brain',
  'phantoon',
  'ridley',
  'spore-spawn',
]

lines.push(`$bosses: ${bosses.join(' ')};`)

fs.writeFileSync('./src/assets/variables.scss', lines.join('\n\n'))
