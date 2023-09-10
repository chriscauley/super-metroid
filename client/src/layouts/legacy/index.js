import areas from './areas.json'
import svg_coords from './svg_coords'

export default {
  svg_coords,
  root: {
    scale: 13.5,
    height: 750,
    width: 1500,
    round: 0.25,
  },
  extra_classes: {
    // crater
    MissileCrateriagauntletleft: '-align-right',
    MissileCrateriagauntletright: '-align-left',
    EnergyTankBrinstarCeiling: '-align-right',
    MissileblueBrinstarmiddle: '-align-left',
    MissileblueBrinstarbehindmissile: '-align-right',
    MissileblueBrinstartop: '-align-left',
    // green-brinstar
    EnergyTankEtecoons: '-align-left',
    SuperMissilegreenBrinstarbottom: '-align-right',
    MissilegreenBrinstarbelowsupermissile: '-align-top-right',
    SuperMissilegreenBrinstartop: '-align-bottom-right',
    ReserveTankBrinstar: '-align-right',
    MissilegreenBrinstarbehindmissile: '-align-bottom-left',
    MissilegreenBrinstarbehindreservetank: '-align-top-left',
    ChargeBeam: '-align-top',
    MissilepinkBrinstarbottom: '-align-bottom',
    SuperMissilepinkBrinstar: '-align-bottom',
    // red-brinstar
    MissileredBrinstarspikeroom: '-align-right',
    PowerBombredBrinstarspikeroom: '-align-left',
    // west-maridia
    MissilegreenMaridiashinespark: '-align-top-right',
    SuperMissilegreenMaridia: '-align-bottom-left',
    SuperMissileyellowMaridia: '-align-bottom-right',
    MissileyellowMaridiasupermissile: '-align-bottom-left',
    MissilepinkMaridia: '-align-right',
    SuperMissilepinkMaridia: '-align-left',
    EnergyTankMamaturtle: '-align-bottom-right',
    // upper-norfair
    MissileHiJumpBoots: '-align-bottom-right',
    EnergyTankHiJumpBoots: '-align-bottom-left',
    HiJumpBoots: '-align-top',
    ReserveTankNorfair: '-align-right',
    MissileSpeedBooster: '-align-right',
    SpeedBooster: '-align-left',
    // lower-norfair
    MissileGoldTorizo: '-align-bottom-right',
    SuperMissileGoldTorizo: '-align-bottom-left',
    ScrewAttack: '-align-top',
    GoldenTorizo: '-align-top-right',
    Ridley: '-align-top-left',
    // east-maridia
    Botwoon: '-align-bottom',
    PowerBombrightMaridiasandpitroom: '-align-left',
    EnergyTankBrinstarGate: '-align-bottom',
    MissilegreenBrinstarpipe: '-align-top-left',
    MissileoutsideWreckedShipbottom: '-align-top-left',
    EnergyTankKraid: '-align-top-right',
    Spazer: '-align-top',
  },
  areas,
}
