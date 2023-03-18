export default () => {
  const wait_time = 50 // TODO requestAnimationFrame instead of timeouts
  let timeout
  let start = new Date().valueOf() // TODO rename to last

  const timer = {
    frames: 0,
    getElement: () => document.getElementById('rtaTimer'),
    show: () => (timer.getElement().style.display = 'block'),
    hide: () => {
      timer.getElement().style.display = 'none'
      timer.disableFake()
    },
    disableFake: () => clearTimeout(timeout),
    setTime: (v) => (timer.getElement().innerHTML = v),
    updateRTA(frames, armFakeTimer) {
      displayRTA(frames)
      timer.disableFake()

      if (armFakeTimer) {
        // arm a timer to increase displayed RTA between two data retrieval
        timer.frames = frames
        start = new Date()
        timeout = setTimeout(updateRTAFake, wait_time)
      }
    },
  }

  function displayRTA(frames) {
    // 60 frame per second
    const seconds = Math.floor(frames / 60)
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds - h * 3600) / 60)
    const s = seconds - h * 3600 - m * 60
    const remainder = frames % 60
    const _f = (i) => i.toString().padStart(2, '0')

    timer.setTime(`${_f(h)}'${_f(m)}'${_f(s)}''${_f(remainder)}`)
  }

  function updateRTAFake() {
    const diffms = new Date() - start
    // 60 frames per seconds
    timer.frames += Math.floor(diffms / (1000 / 60))
    displayRTA(timer.frames)
    start = new Date()
    timeout = setTimeout(updateRTAFake, wait_time)
  }

  return timer
}
