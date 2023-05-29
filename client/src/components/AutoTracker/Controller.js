import { reactive } from 'vue'

const RAM_MAP = {
  rta: ['F505B8', 0x2],
  samux_x: ['F50AF6', 0x2],
  samux_y: ['F50AFA', 0x2],
  door_pointer: ['F5078D', 0x2],
  room_pointer: ['F5079B', 0x2],
  game_state: ['F50998', 0x2],
}

export default class Controller {
  constructor(_options = {}) {
    window.$at = this
    this.game_rom = reactive({})
    this._raw_rom = {}
    this._times = []
    this.mode = 'room_timer'
    this.data_to_ask = ['door_pointer', 'rta']
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
    this.checkRoomTime()
  }
  checkRoomTime() {
    const { door_pointer, room_pointer, rta, game_state } = this.game_rom
    if (!this.last) {
      this.last = {
        dirty: true,
        rta,
        door_pointer,
        timestamp: new Date().valueOf(),
      }
    }
    // if ([8, 9].includes(this.last.game_state) && game_state === 11) {
    //   Object.assign(this.last, { rta, game_state
    //   this.last.state = 11
    //   this.last.rta = rta

    // }
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

function getGameStateName(gameStateCode) {
  return GAME_STATE_MAP[gameStateCode] || `Unkown game state (${gameStateCode})`
}
