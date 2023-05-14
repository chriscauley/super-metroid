import { ReactiveLocalStorage } from '@unrest/vue-storage'

const LS_KEY = 'CONFIG_STORAGE'
const initial = {
  'item-tracker': null,
}

export default () => {
  const storage = ReactiveLocalStorage({ LS_KEY, initial })

  return storage
}
