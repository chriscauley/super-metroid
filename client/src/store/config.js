import { ReactiveLocalStorage } from '@unrest/vue-storage'

const LS_KEY = 'CONFIG_STORAGE'
const initial = {
  'item-tracker': null,
  'objective-checklist': null,
}

export default () => {
  const storage = ReactiveLocalStorage({ LS_KEY, initial })
  storage.getPosition = (slug) => {
    const { x, y } = storage.state[slug] || {}
    return x === undefined
      ? null
      : {
          top: `${y}px`,
          left: `${x}px`,
          right: 'unset',
          bottom: 'unset',
        }
  }

  return storage
}
