// A one off function for making sure a given map has gps points
import { saveFile } from '@/data/legacy'

const points = [
  'lowerMushroomsLeft',
  'moatRight',
  'greenPiratesShaftBottomRight',
  'keyhunterRoomBottom',
  'morphBallRoomLeft',
  'greenBrinstarElevator',
  'greenHillZoneTopRight',
  'noobBridgeRight',
  'westOceanLeft',
  'wreckedShipMain',
  'wreckedShipBack',
  'bowling',
  'crabMazeLeft',
  'lavaDiveRight',
  'lNEntrance',
  'lNAboveGT',
  'screwAttackBottom',
  'firefleas',
  'firefleasTop',
  'ridleyZone',
  'wasteland',
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
  'preciousRoomTop',
  'aqueduct',
  'aqueductBottom',
  'beach',
  'crabShaftLeft',
  'leftSandpit',
  'oasisBottom',
  'westSandHallLeft',
  'postBotwoon',
  'colosseumTopRight',
  'rightSandpit',
  'toiletTop',
  'redTowerTopLeft',
  'crabShaftRight',
  'aqueductTopLeft',
  'caterpillarRoomTopRight',
  'redBrinstarElevator',
  'eastTunnelRight',
  'eastTunnelTopRight',
  'glassTunnelTop',
  'goldenFour',
  'landingSite',
  // 'ceres',
  'blueBrinstarElevatorBottom',
  'bigPink',
  'etecoonsSupers',
  'etecoonsBottom',
  'bubbleMountain',
  'bubbleMountainTop',
  'bubbleMountainBottom',
  'crocomireSpeedwayBottom',
  'crocomireRoomTop',
  'phantoonRoomIn',
  'phantoonRoomOut',
  'ridleyRoomIn',
  'ridleyRoomOut',
  'kraidRoomIn',
  'kraidRoomOut',
  'draygonRoomIn',
  'draygonRoomOut',
  'draygonRoomBottom',
  'wateringHole',
  'wateringHoleBottom',
  'gauntletTop',
  'businessCenter',
  'mamaTurtle',
  'cathedral',
  'moatLeft',
  'grappleEscape',
  'redFishRoomBottom',
]

export default (areas) => {
  const found = {}
  const added = []
  let dirty = 0
  areas.forEach((area) => {
    area.gpss.forEach(([gps]) => {
      found[gps] = true
    })
    area.warps.forEach(([warp, x, y]) => {
      if (!found[warp] && points.includes(warp)) {
        area.gpss.push([warp, x, y])
        found[warp] = true
        added.push(warp)
        dirty++
      }
    })
  })
  const missing = points.filter((p) => !found[p])
  dirty += missing.length
  if (dirty) {
    saveFile(`${JSON.stringify(areas, null, 2)}`, 'areas.json')
  }
}
