import { reactive } from 'vue'

const RAM_MAP = {
  rta: ['F505B8', 0x2],
  samux_x: ['F50AF6', 0x2],
  samux_y: ['F50AFA', 0x2],
  door_pointer: ['F5078D', 0x2],
  room_pointer: ['F5079B', 0x2],
  game_state: ['F50998', 0x2],
  movement_type: ['F50A1F', 0x2],
  samus_dx: ['F50DBC', 0x2],
  samus_dy: ['F50B2E', 0x2],
  samus_sy: ['F50B36', 0x1],
}

export default class Controller {
  constructor(_options = {}) {
    window.$at = this
    this.game_rom = reactive({})
    this._raw_rom = {}
    this._times = []
    this.mode = 'room_timer'
    this.data_to_ask = [
      'door_pointer',
      'rta',
      'movement_type',
      'game_state',
      'samus_sy',
      'samus_dy',
      'samus_dx',
    ]
    this.last = null
  }
  getRanges() {
    let askedDataSize = 0
    const ranges = []
    this.data_to_ask.forEach((key) => {
      const [address, size] = RAM_MAP[key]
      askedDataSize += size
      ranges.push(address)
      ranges.push(size.toString())
    })
    ranges._askedDataSize = askedDataSize
    return ranges
  }
  patchRom(receivedData) {
    if (this.last) {
      this._times.push(new Date().valueOf() - this.last)
      this._times = this._times.slice(-10)
      this.fps = Math.round(this._times.reduce((p, a) => p + a, 0) / this._times.length)
    }
    this.last = new Date().valueOf()
    this.data_to_ask.forEach((key, index) => {
      const data = receivedData[index]
      const f = _process_rom_data[key] || _process_rom_data.default
      this.game_rom[key] = f(data)
      this._raw_rom[key] = data
    })
    if (this.game_rom.rta) {
      window.$timer.set(this.game_rom.rta, true)
    } else {
      window.$timer.pause()
    }
    // const { samus_dy, samus_sy, movement_type, samus_dx } = this._raw_rom
    // console.log(samus_dx.toString())
    this.checkRoomTime()
  }
  checkRoomTime() {
    const { door_pointer, rta } = this.game_rom
    if (!this.last) {
      this.last = {
        dirty: true,
        rta,
        door_pointer,
        timestamp: new Date().valueOf(),
      }
    }
    this.last_time = new Date().valueOf()
  }
}

const _variaPointer = (data) => readWord(data, 0).toString(16).toUpperCase()

const _process_rom_data = {
  rta: (data) => {
    const w0 = readWord(data, 0)
    const w1 = readWord(data, 2)
    return (w1 << 16) | w0 // raw time frames
  },
  door_pointer: _variaPointer,
  room_pointer: _variaPointer,
  movement_type: (data) => MOVEMENT_TYPE_MAP[data[0].toString(16).toUpperCase()],
  default: (data) => readWord(data, 0),
}

function readWord(array, addr) {
  return (array[addr + 1] << 8) + array[addr]
}

// https://patrickjohnston.org/ASM/ROM%20data/Super%20Metroid/RAM%20map.asm
const GAME_STATE_MAP = {
  0: 'Reset/start',
  1: 'Opening. Cinematic',
  2: 'Game options menu',
  3: 'Nothing (RTS)',
  4: 'Save game menus',
  5: 'Loading game map view',
  6: 'Loading game data',
  7: 'Setting game up',
  8: 'Main gameplay',
  9: 'Hit a door block',
  a: 'In door',
  b: 'In door',
  c: 'Pausing',
  d: 'Pausing',
  e: 'Paused',
  f: 'Paused',
  10: 'Unpausing',
  11: 'Unpausing',
  12: 'Unpausing',
  13: 'Death',
  14: 'Death: fading',
  15: 'Death: fading',
  16: 'Death: start',
  17: 'Death: flashing',
  18: 'Death: explosion',
  19: 'Death: black out',
  '1a': 'Game over screen',
  '1b': 'Reserve tanks auto',
  '1c': 'Unused. Does JMP ($0DEA) ($0DEA is never set to a pointer)',
  '1d': 'Debug game over menu (end/continue)',
  '1e': 'Intro Cinematic',
  '1f': 'Post-intro',
  20: 'Made it to Ceres elevator',
  21: 'Blackout from Ceres',
  22: 'Ceres goes boom',
  23: 'Time up',
  24: 'Whiting out from time up',
  25: 'Ceres goes boom with Samus',
  26: 'Samus escapes from Zebes',
  27: 'Ending and credits',
  28: 'Transition to demo',
  29: 'Transition to demo',
  '2a': 'Playing demo',
  '2b': 'Transition from demo',
  '2c': 'Transition from demo',
}

export function getGameStateName(gameStateCode) {
  return GAME_STATE_MAP[gameStateCode] || `Unkown game state (${gameStateCode})`
}

const MOVEMENT_TYPE_MAP = {
  // $0A1F: Samus movement type
  0: 'stand', // Standing
  1: 'run', // Running
  2: 'jump', // Normal jumping
  3: 'spinjump', // Spin jumping
  4: 'morph', // Morph ball - on ground
  5: 'crouch', // Crouching
  6: 'fall', // Falling
  7: 'unused-0', //Unused. Glitchy morph ball / spin jump
  8: 'morph__fall', //  Morph ball - falling
  9: 'unused-1', //  Unused. Glitchy morph ball
  A: 'knockback', //  Knockback / crystal flash ending
  B: 'unused-2', //  Unused. Can fire grapple beam, not moving
  C: 'unused-3', //  Unused. Can fire grapple beam and charge pose. No pose definition
  D: 'unused-4', //  Unused. Can change pose, no firing...
  E: 'turn', //  Turning around - on ground
  F: 'transition', //  Crouching/standing/morphing/unmorphing transition
  10: 'moonwalk', //  Moonwalking
  11: 'springball', //  Spring ball - on ground
  12: 'sprinball__jump', //  Spring ball - in air
  13: 'sprinball__fall', //  Spring ball - falling
  14: 'walljump', //  Wall jumping
  15: 'ranintowall', //  Ran into a wall
  16: 'grapple', //  Grappling
  17: 'turn__jump', //  Turning around - jumping
  18: 'turn__fall', //  Turning around - falling
  19: 'damageboost', //  Damage boost
  '1A': 'grabbed', //  Grabbed by Draygon
  '1B': 'shinespark', //  Shinespark / crystal flash / drained by metroid / damaged by MB
}
