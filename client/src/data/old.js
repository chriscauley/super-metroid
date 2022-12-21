// data scraped from the t_main.html template fragment. Currently used only for reference

import { startCase, flatten } from 'lodash'
export const door_colors = ['red', 'green', 'yellow', 'gray', 'wave', 'spazer', 'plasma', 'ice']

const ammo = ['missile', 'super-missile', 'power-bomb']
const energy = ['energy', 'reserve-tank']
export const beams = ['charge-beam', 'ice-beam', 'wave-beam', 'spazer-beam', 'plasma-beam']
const suits = ['varia', 'gravity']
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
    const src = `/solver/static/images/tracker/inventory/${name.replace(' ', '')}`
    return { name, item_slug, src }
  }),
}))

// TODO rename to warps
export const access_points = [
  'lowerMushroomsLeft',
  'moatRight',
  'greenPiratesShaftBottomRight',
  'keyhunterRoomBottom',
  'morphBallRoomLeft',
  'greenBrinstarElevator',
  'greenHillZoneTopRight',
  'noobBridgeRight',
  'westOceanLeft',
  'crabMazeLeft',
  'lavaDiveRight',
  'threeMuskateersRoomLeft',
  'warehouseZeelaRoomLeft',
  'warehouseEntranceLeft',
  'warehouseEntranceRight',
  'singleChamberTopRight',
  'kronicBoostRoomBottomLeft',
  'mainStreetBottom',
  'crabHoleBottomLeft',
  'leCoudeRight',
  'redFishRoomLeft',
  'redTowerTopLeft',
  'crabShaftRight',
  'aqueductTopLeft',
  'caterpillarRoomTopRight',
  'redBrinstarElevator',
  'eastTunnelRight',
  'eastTunnelTopRight',
  'glassTunnelTop',
  'goldenFour',
  'crocomireSpeedwayBottom',
  'crocomireRoomTop',
]

export const sand_doors = [
  'westSandHallLeft',
  'belowBotwoonEnergyTankRight',
  'westSandHallTunnelRight',
]

export const inter_area_access_points = [
  'wreckedShipMain',
  'wreckedShipBack',
  'lNEntrance',
  'lNAboveGT',
  'screwAttackBottom',
  'firefleas',
  'firefleasTop',
  'ridleyZone',
  'preciousRoomTop',
  'aqueduct',
  'aqueductBottom',
  'beach',
  'crabShaftLeft',
  'leftSandpit',
  'oasisBottom',
  'postBotwoon',
  'colosseumTopRight',
  'rightSandpit',
  'toiletTop',
  'landingSite',
  'ceres',
  'blueBrinstarElevatorBottom',
  'bigPink',
  'etecoonsSupers',
  'etecoonsBottom',
  'bubbleMountain',
  'bubbleMountainTop',
  'bubbleMountainBottom',
  'draygonRoomBottom',
  'wateringHole',
  'wateringHoleBottom',
  'gauntletTop',
  'businessCenter',
  'mamaTurtle',
  'cathedral',
  'moatLeft',
  'bowling',
  'wasteland',
  'grappleEscape',
  'redFishRoomBottom',
]

export const boss_doors = [
  'phantoonRoomOut',
  'phantoonRoomIn',
  'ridleyRoomOut',
  'ridleyRoomIn',
  'kraidRoomOut',
  'kraidRoomIn',
  'draygonRoomOut',
  'draygonRoomIn',
]

export const escape_doors = [
  'tourianEscapeRoom4TopRight',
  'climbBottomLeft',
  'greenBrinstarMainShaftTopLeft',
  'basementLeft',
  'businessCenterMidLeft',
  'crabHoleBottomRight',
]

export const items_by_area = {
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
  crocomire: 'o',
  'east-maridia': 'd', // for "Draygon"
  'green-brinstar': 's', // for "Spospo"
  'kraids-lair': 'k',
  'lower-norfair': 'r', // for "ridley"
  'red-brinstar': 'b', // for "brinstar"
  'upper-norfair': 'n',
  'west-maridia': 'm',
  'wrecked-ship': 'p', // for "phantoon"
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

// this is used to calculate items in an area
export const subarea_by_area = {
  draygon: 'east-maridia',
  phantoon: 'wrecked-ship',
  kraid: 'kraids-lair',
  ridley: 'lower-norfair',
}

export const special_items = {
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
Object.entries(special_items).forEach(([_key, items]) => {
  delete special_items[_key]
  const key = _key.slice(1)
  special_items[key] = {}
  items.forEach((item) => (special_items[key][item] = true))
})

export const all_item_locs = flatten([...Object.values(items_by_area), Object.keys(area_by_bosses)])

export const type_map = {}
all_item_locs.forEach((loc) => (type_map[loc] = 'item'))
boss_doors.forEach((door) => (type_map[door] = 'boss'))
access_points.forEach((door) => (type_map[door] = 'warp'))
sand_doors.forEach((door) => (type_map[door] = 'sand'))

export const golden_four = ['kraid', 'phantoon', 'draygon', 'ridley']

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
