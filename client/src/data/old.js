// data scraped from the t_main.html template fragment. Currently used only for reference

import { startCase, flatten } from 'lodash'
import default_door_colors from './door_colors'

export { default_door_colors }

export const door_item_by_color = {
  grey: 'empty',
  red: 'missile',
  green: 'super-missile',
  yellow: 'power-bomb',
  ice: 'ice-beam',
  wave: 'wave-beam',
  plasma: 'plasma-beam',
  spazer: 'spazer-beam',
  // blue: 'empty',
  // white: 'empty',
}

export const ammo = ['missile', 'super-missile', 'power-bomb']
export const energy = ['energy-tank', 'reserve-tank']
export const beams = ['charge-beam', 'ice-beam', 'wave-beam', 'spazer-beam', 'plasma-beam']
const suits = ['varia-suit', 'gravity-suit']
const items = [
  'morph-ball',
  'bomb',
  'spring-ball',
  'hi-jump-boots',
  'space-jump',
  'speed-booster',
  'grappling-beam',
  'x-ray',
]

export const items_by_group = { ammo, energy, beams, suits, items }
export const varia_item_groups = Object.entries(items_by_group).map(([slug, items]) => ({
  slug,
  name: startCase(slug),
  items: items.map((item_slug) => {
    const name = startCase(
      item_slug.replace(/(-beam|-boots|-missile)/, '').replace('x-ray', 'x-ray-scope'),
    )
    return { name, item_slug }
  }),
}))

export const all_items = [...ammo, ...energy, ...beams, ...suits, ...items]

export const sand_doors = [
  'westSandHallLeft',
  'belowBotwoonEnergyTankRight',
  'westSandHallTunnelRight',
]

export const escape_doors = [
  'tourianEscapeRoom4TopRight',
  'climbBottomLeft',
  'greenBrinstarMainShaftTopLeft',
  'basementLeft',
  'businessCenterMidLeft',
  'crabHoleBottomRight',
]

export const vanilla_warps = {
  area: [
    ['lowerMushroomsLeft', 'greenBrinstarElevator'],
    ['greenPiratesShaftBottomRight', 'goldenFour'],
    ['crabMazeLeft', 'leCoudeRight'],
    ['noobBridgeRight', 'redTowerTopLeft'],
    ['caterpillarRoomTopRight', 'redFishRoomLeft'],
    ['redBrinstarElevator', 'keyhunterRoomBottom'],
    ['moatRight', 'westOceanLeft'],
    ['morphBallRoomLeft', 'greenHillZoneTopRight'],
    ['mainStreetBottom', 'glassTunnelTop'],
    ['warehouseZeelaRoomLeft', 'warehouseEntranceRight'],
    ['threeMuskateersRoomLeft', 'singleChamberTopRight'],
    ['lavaDiveRight', 'kronicBoostRoomBottomLeft'],
    ['crabHoleBottomLeft', 'eastTunnelTopRight'],
    ['crabShaftRight', 'aqueductTopLeft'],
    ['warehouseEntranceLeft', 'eastTunnelRight'],
    ['crocomireSpeedwayBottom', 'crocomireRoomTop'],
  ],
  boss: [
    ['phantoonRoomOut', 'phantoonRoomIn'],
    ['ridleyRoomOut', 'ridleyRoomIn'],
    ['kraidRoomOut', 'kraidRoomIn'],
    ['draygonRoomOut', 'draygonRoomIn'],
  ],
  map: {},
}

const _mapWarp = ([a, b]) => {
  vanilla_warps.map[a] = b
  vanilla_warps.map[b] = a
}

vanilla_warps.area.forEach(_mapWarp)
vanilla_warps.boss.forEach(_mapWarp)

// TODO rename to warps
export const access_points = flatten(vanilla_warps.area)
export const boss_doors = flatten(vanilla_warps.boss)

export const locations_by_area = {
  crater: [
    'EnergyTankGauntlet',
    'Bomb',
    'EnergyTankTerminator',
    'MorphingBall',
    'EnergyTankBrinstarCeiling',
    'PowerBombCrateriasurface',
    'MissileCrateriamoat',
    'MissileCrateriabottom',
    'MissileCrateriagauntletright',
    'MissileCrateriagauntletleft',
    'SuperMissileCrateria',
    'MissileCrateriamiddle',
    'PowerBombgreenBrinstarbottom',
    'PowerBombblueBrinstar',
    'MissileblueBrinstarmiddle',
    'MissileblueBrinstarbottom',
    'MissileblueBrinstartop',
    'MissileblueBrinstarbehindmissile',
  ],
  crocomire: [
    'EnergyTankCrocomire',
    'GrappleBeam',
    'PowerBombCrocomire',
    'MissilebelowCrocomire',
    'MissileGrappleBeam',
  ],
  'east-maridia': [
    'EnergyTankMamaturtle',
    'PlasmaBeam',
    'ReserveTankMaridia',
    'SpringBall',
    'EnergyTankBotwoon',
    'MissileleftMaridiasandpitroom',
    'MissilerightMaridiasandpitroom',
    'PowerBombrightMaridiasandpitroom',
    'MissilepinkMaridia',
    'SuperMissilepinkMaridia',
    'MissileDraygon',
  ],
  draygon: ['SpaceJump'],
  'green-brinstar': [
    'ReserveTankBrinstar',
    'ChargeBeam',
    'EnergyTankEtecoons',
    'EnergyTankWaterway',
    'EnergyTankBrinstarGate',
    'SuperMissilepinkBrinstar',
    'MissilegreenBrinstarbelowsupermissile',
    'SuperMissilegreenBrinstartop',
    'MissilegreenBrinstarbehindmissile',
    'MissilegreenBrinstarbehindreservetank',
    'MissilepinkBrinstartop',
    'MissilepinkBrinstarbottom',
    'PowerBombpinkBrinstar',
    'MissilegreenBrinstarpipe',
    'SuperMissilegreenBrinstarbottom',
  ],
  'kraids-lair': ['EnergyTankKraid', 'MissileKraid'],
  kraid: ['VariaSuit'],
  'lower-norfair': [
    'ScrewAttack',
    'MissileGoldTorizo',
    'SuperMissileGoldTorizo',
    'MissileMickeyMouseroom',
    'MissilelowerNorfairabovefireflearoom',
    'PowerBomblowerNorfairabovefireflearoom',
    'PowerBombPowerBombsofshame',
    'MissilelowerNorfairnearWaveBeam',
  ],
  'red-brinstar': [
    'XRayScope',
    'Spazer',
    'PowerBombredBrinstarsidehopperroom',
    'PowerBombredBrinstarspikeroom',
    'MissileredBrinstarspikeroom',
  ],
  ridley: ['EnergyTankRidley'],
  'upper-norfair': [
    'IceBeam',
    'HiJumpBoots',
    'ReserveTankNorfair',
    'SpeedBooster',
    'WaveBeam',
    'EnergyTankFirefleas',
    'MissileNorfairReserveTank',
    'MissilebubbleNorfairgreendoor',
    'MissilebubbleNorfair',
    'MissileSpeedBooster',
    'MissileWaveBeam',
    'Missilelavaroom',
    'MissilebelowIceBeam',
    'MissileaboveCrocomire',
    'MissileHiJumpBoots',
    'EnergyTankHiJumpBoots',
  ],
  'west-maridia': [
    'MissilegreenMaridiashinespark',
    'SuperMissilegreenMaridia',
    'MissilegreenMaridiatatori',
    'SuperMissileyellowMaridia',
    'MissileyellowMaridiasupermissile',
    'MissileyellowMaridiafalsewall',
  ],
  phantoon: [],
  'wrecked-ship': [
    'ReserveTankWreckedShip',
    'EnergyTankWreckedShip',
    'RightSuperWreckedShip',
    'GravitySuit',
    'MissileoutsideWreckedShipbottom',
    'MissileoutsideWreckedShiptop',
    'MissileoutsideWreckedShipmiddle',
    'MissileWreckedShipmiddle',
    'MissileGravitySuit',
    'MissileWreckedShiptop',
    'SuperMissileWreckedShipleft',
  ],
  tourian: [],
}

export const default_area_keys = {
  crater: 'c',
  crocomire: 'o', // crOc
  'east-maridia': 'e',
  'green-brinstar': 'g',
  'kraids-lair': 'k',
  'lower-norfair': 'l',
  'red-brinstar': 'r',
  'upper-norfair': 'u',
  'west-maridia': 'w',
  'wrecked-ship': 's', // wrecked Ship
  tourian: 't',
}

const area_by_bosses = {
  Kraid: 'kraids-lair',
  Crocomire: 'crocomize',
  SporeSpawn: 'green-brinstar',
  Draygon: 'draygon',
  Botwoon: 'east-maridia',
  Ridley: 'ridley',
  GoldenTorizo: 'lower-norfair',
  Phantoon: 'wrecked-ship',
  MotherBrain: 'tourian',
}

export const bosses = ['kraid', 'phantoon', 'draygon', 'ridley', 'mother-brain']
export const minibosses = ['crocomire', 'spore-spawn', 'botwoon', 'golden-torizo', 'bomb-torizo']

// this is used to calculate locations in an area
export const subarea_by_area = {
  draygon: 'east-maridia',
  phantoon: 'wrecked-ship',
  kraid: 'kraids-lair',
  ridley: 'lower-norfair',
}

export const special_locations = {
  _major: [
    // crater
    'EnergyTankGauntlet',
    'EnergyTankTerminator',
    'Bomb',
    'MorphingBall',
    'EnergyTankBrinstarCeiling',
    // green-brinstar
    'ReserveTankBrinstar',
    'EnergyTankEtecoons',
    'ChargeBeam',
    'EnergyTankWaterway',
    'EnergyTankBrinstarGate',
    // red-brinstar
    'XRayScope',
    'Spazer',
    // crocomize
    'EnergyTankCrocomire',
    'GrappleBeam',
    // upper-norfair
    'IceBeam',
    'EnergyTankHiJumpBoots',
    'HiJumpBoots',
    'ReserveTankNorfair',
    'SpeedBooster',
    'WaveBeam',
    // lower-norfair
    'ScrewAttack',
    'EnergyTankFirefleas',
    'EnergyTankRidley',
    // kraids-lair
    'EnergyTankKraid',
    'VariaSuit',
    // wrecked-ship
    'GravitySuit',
    'ReserveTankWreckedShip',
    'EnergyTankWreckedShip',
    'RightSuperWreckedShip',
    // east-maridia
    'PlasmaBeam',
    'EnergyTankBotwoon',
    'SpaceJump',
    'SpringBall',
    'ReserveTankMaridia',
    // west-maridia
    'EnergyTankMamaturtle',
  ],
  _chozo: [
    // crater
    'EnergyTankGauntlet',
    'Bomb',
    'MissileCrateriamiddle',
    'MorphingBall',
    'MissileblueBrinstarbottom',
    // green-brinstar
    'ReserveTankBrinstar',
    'ChargeBeam',
    'SuperMissilepinkBrinstar',
    // red-brinstar
    'XRayScope',
    'Spazer',
    'PowerBombredBrinstarspikeroom',
    // crocomize
    'GrappleBeam',
    // upper-norfair
    'IceBeam',
    'HiJumpBoots',
    'SpeedBooster',
    'WaveBeam',
    // lower-norfair
    'ScrewAttack',
    'EnergyTankRidley',
    // kraids-lair
    'VariaSuit',
    // wrecked-ship
    'GravitySuit',
    'EnergyTankWreckedShip',
    'RightSuperWreckedShip',
    // east-maridia
    'PlasmaBeam',
    'SpaceJump',
    'SpringBall',
    // west-maridia
  ],
  _scavenger: [
    // crater
    'Bomb',
    'MorphingBall',
    // green-brinstar
    'ChargeBeam',
    // red-brinstar
    'XRayScope',
    'Spazer',
    // crocomize
    'GrappleBeam',
    // upper-norfair
    'IceBeam',
    'HiJumpBoots',
    'SpeedBooster',
    'WaveBeam',
    // lower-norfair
    'ScrewAttack',
    'EnergyTankRidley',
    // kraids-lair
    'VariaSuit',
    // wrecked-ship
    'GravitySuit',
    'EnergyTankWreckedShip',
    'RightSuperWreckedShip',
    // east-maridia
    'PlasmaBeam',
    'SpaceJump',
    'SpringBall',
    // west-maridia
  ],
}

// I prefer this to be a map for performance purposes
Object.entries(special_locations).forEach(([_key, locations]) => {
  delete special_locations[_key]
  const key = _key.slice(1)
  special_locations[key] = {}
  locations.forEach((location) => (special_locations[key][location] = true))
})

export const all_locations = flatten([
  ...Object.values(locations_by_area),
  Object.keys(area_by_bosses),
])

export const warp_type_map = {}
all_locations.forEach((loc) => (warp_type_map[loc] = 'location'))
boss_doors.forEach((door) => (warp_type_map[door] = 'boss'))
access_points.forEach((door) => (warp_type_map[door] = 'warp'))
sand_doors.forEach((door) => (warp_type_map[door] = 'sand'))
escape_doors.forEach((door) => (warp_type_map[door] = 'escape'))

export const golden_four = ['kraid', 'phantoon', 'draygon', 'ridley']

export const location_type_map = {
  GoldTorizo: 'miniboss', // Varia has this as gold in some places, golden in others
}
all_locations.forEach((l) => (location_type_map[l] = 'item'))
const _v = (s) => startCase(s).replace(' ', '')
minibosses.forEach((b) => (location_type_map[_v(b)] = 'miniboss'))
bosses.forEach((b) => (location_type_map[_v(b)] = 'boss'))

export const doors = [
  'LandingSiteRight',
  'LandingSiteTopRight',
  'KihunterBottom',
  'KihunterRight',
  'FlywayRight',
  'GreenPiratesShaftBottomRight',
  'RedBrinstarElevatorTop',
  'ClimbRight',
  'ConstructionZoneRight',
  'GreenHillZoneTopRight',
  'NoobBridgeRight',
  'MainShaftRight',
  'MainShaftBottomRight',
  'EarlySupersRight',
  'EtecoonEnergyTankLeft',
  'BigPinkTopRight',
  'BigPinkRight',
  'BigPinkBottomRight',
  'BigPinkBottomLeft',
  'RedTowerLeft',
  'RedBrinstarFirefleaLeft',
  'RedTowerElevatorTopLeft',
  'RedTowerElevatorLeft',
  'RedTowerElevatorBottomLeft',
  'BelowSpazerTopRight',
  'WestOceanRight',
  'LeCoudeBottom',
  'WreckedShipMainShaftBottom',
  'ElectricDeathRoomTopLeft',
  'BusinessCenterTopLeft',
  'BusinessCenterBottomLeft',
  'CathedralEntranceRight',
  'CathedralRight',
  'BubbleMountainTopRight',
  'BubbleMountainTopLeft',
  'SpeedBoosterHallRight',
  'SingleChamberRight',
  'DoubleChamberRight',
  'KronicBoostBottomLeft',
  'CrocomireSpeedwayBottom',
  'PostCrocomireUpperLeft',
  'PostCrocomireShaftRight',
  'RedKihunterShaftBottom',
  'WastelandLeft',
  'MainStreetBottomRight',
  'FishTankRight',
  'CrabShaftRight',
  'ColosseumBottomRight',
  'PlasmaSparkBottom',
  'OasisTop',
  'GreenBrinstarSaveStation',
  'MaridiaBottomSaveStation',
  'MaridiaAqueductSaveStation',
  'ForgottenHighwaySaveStation',
  'DraygonSaveRefillStation',
  'KraidRefillStation',
  'RedBrinstarEnergyRefill',
  'GreenBrinstarMissileRefill',
]
