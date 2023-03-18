<template>
  <div>
    <div v-for="(row, i) in rows" :key="i">
      <label>
        <input type="checkbox" @input="$emit('toggle', i)" :checked="row.checked" />
        {{ row.text }}
      </label>
    </div>
    <select @input="(e) => $emit('add', e.target.value)">
      <optgroup v-for="(options, name) in groups" :key="name" :label="name">
        <option v-for="option in options" :key="option" :disabled="objectives?.includes(option)">
          {{ option }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import varia from '@/varia'

export default {
  props: {
    objectives: Array,
    completed: Object,
  },
  emits: ['toggle', 'add'],
  data() {
    return { groups: varia.objectives }
  },
  computed: {
    rows() {
      const rows = []
      this.objectives?.forEach((text) => {
        rows.push({ text, checked: this.completed[text] })
      })
      return rows
    },
  },
}
</script>
