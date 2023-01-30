import { ReactiveLocalStorage } from '@unrest/vue-storage'
import Random from '@unrest/random'

import enemy_data from '@/../layouts/enemies/data.json'
import levenshtein from 'fast-levenshtein'

const LS_KEY = 'WHO_DAT_STORAGE'
const initial = {
  recent: [],
  record: {},
  streak: 0,
  misspelled: {},
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
      filter = new RegExp(`(${filter})`)
      return random.choice(enemy_data.filter((e) => clean(e.name).match(filter)))
    }
    const recent_by_id = {}
    storage.state.recent.slice(-10).forEach((id) => (recent_by_id[id] = true))
    const { record } = storage.state
    const all = enemy_data.filter((enemy) => !recent_by_id[enemy.id])
    const missed = all.filter((enemy) => !record[enemy.id])
    if (!missed.length || Math.random() > 0.95) {
      const matched = all.filter((enemy) => record[enemy.id])
      return random.choice(matched)
    }
    return random.choice(missed)
  }

  const clean = (s) =>
    s
      .toLowerCase()
      .split('(')[0] // get rid of (standing), etc
      .replace(/\W/g, '')
      .replace('multiviola', 'viola')

  const mark = (id, value) => {
    const { recent, record } = storage.state
    recent.push(id)
    while (recent.length > 20) {
      recent.shift()
    }
    record[id] = value
    if (value) {
      storage.state.streak++
    } else {
      storage.state.streak = 0
    }
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

  storage.getPercentage = () => {
    const total = enemy_data.length
    const { record } = storage.state
    const correct = enemy_data.filter((e) => record[e.id]).length
    return Math.floor((100 * correct) / total)
  }

  return storage
}
