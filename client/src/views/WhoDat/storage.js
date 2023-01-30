import { ReactiveLocalStorage } from '@unrest/vue-storage'
import Random from '@unrest/random'

import enemy_data from '@/../layouts/enemies/data.json'
import levenshtein from 'fast-levenshtein'

const LS_KEY = 'WHO_DAT_STORAGE'
const initial = {
  recent: [],
  record: {},
}

const random = Random()

export default () => {
  const storage = ReactiveLocalStorage({ LS_KEY, initial })
  storage.getNextEnemy = (filter) => {
    // Selects an enemy at random to display
    // All unmatched enemies are included in the pool
    // only 5 of all previously matched enemies are included
    // the last 10 enemies are excluded
    if (filter) {
      return random.choice(enemy_data.filter((e) => clean(e.name).match(filter)))
    }
    const recent_by_id = {}
    storage.state.recent.slice(-10).forEach((id) => (recent_by_id[id] = true))
    const { record } = storage.state
    const all = enemy_data.filter((enemy) => !recent_by_id[enemy.id])
    const missed = all.filter((enemy) => !record[enemy.id])
    const matched = random.shuffle(all.filter((enemy) => record[enemy.id]).slice(0, 5))
    return random.choice([...missed, ...matched])
  }

  const clean = (s) =>
    s
      .toLowerCase()
      .replace('sm.', 'mini') // sidehopper and desgeega
      .split('(')[0] // get rid of (standing), etc
      .replace(/\W/g, '')

  const mark = (id, value) => {
    const { recent, record } = storage.state
    recent.push(id)
    while (recent.length > 20) {
      recent.shift()
    }
    record[id] = value
    storage.save()
  }

  storage.guess = (guess, current) => {
    const { name } = current
    const distance = levenshtein.get(clean(guess), clean(name))

    // short names (< 5 characters) can only make 1 error
    const correct = distance <= (name.length >= 5 ? 2 : 1)
    mark(current.id, correct)

    return {
      distance,
      correct,
      guess,
      answer: name,
      class: `alert -${correct ? 'success' : 'error'}`,
    }
  }
  return storage
}
