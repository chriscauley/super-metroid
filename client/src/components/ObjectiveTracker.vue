<template>
  <div>
    <div v-for="row in rows" :key="row.text">
      <label>
        <input type="checkbox" @input="$emit('check', row.text)" :checked="row.checked" />
        {{ row.text }}
      </label>
    </div>
    <unrest-modal v-if="adding" @close="adding = false">
      <unrest-form :schema="schema" class="objective-form" @change="change" :errors="errors" />
    </unrest-modal>
  </div>
</template>

<script>
import { flatten } from 'lodash'

import varia from '@/varia'

// lodash's startcase removes the % sign
const startCase = (s) => s[0].toUpperCase() + s.slice(1)
const toName = (i) => i.split(' ').slice(1).map(startCase).join(' ')

export default {
  props: {
    objectives: Array,
    completed: Object,
  },
  emits: ['check', 'set-objectives'],
  data() {
    return { groups: varia.objectives, adding: true, errors: null }
  },
  computed: {
    schema() {
      const schema = {
        type: 'object',
        properties: {},
      }

      Object.entries(varia.objectives).forEach(([group, items]) => {
        schema.properties[group] = {
          type: 'array',
          items: {
            type: 'string',
            enum: items,
            enumNames: items.map(toName),
          },
        }
      })
      return schema
    },
    rows() {
      const rows = []
      this.objectives?.forEach((text) => {
        rows.push({ text, checked: this.completed[text] })
      })
      return rows
    },
  },
  methods: {
    change(formData) {
      const selected = flatten(Object.values(formData)).filter(Boolean)
      if (selected.length > 5) {
        this.errors = { __root: 'You can only select up to 5 objectives.' }
      } else {
        this.errors = null
        this.$emit('set-objectives', selected)
      }
    },
  },
}
</script>
