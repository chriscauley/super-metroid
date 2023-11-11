import { ReactiveLocalStorage } from '@unrest/vue-storage'

const LS_KEY = 'SEED_STORAGE-v2'
const initial = {}

export default () => {
  const storage = ReactiveLocalStorage({ LS_KEY, initial })

  return storage
}
