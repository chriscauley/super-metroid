<template>
  <div class="objective-checklist" :style="style">
    <resize-box @update="change" no-resize>
      <unrest-popper placement="right-start" :watchme="watchme" offset="0,10">
        <unrest-form :schema="schema" :state="config" @change="change" />
      </unrest-popper>
    </resize-box>
    <template v-if="json_data?.objectivesHidden">
      <h3 class="objective-checklist__title">Objectives Hidden</h3>
      <div class="objective-checklist__description">
        Objectives are currently hidden. Visit the pause screen for more info.
      </div>
    </template>
    <template v-else>
      <template v-if="config.show_title">
        <h4 class="objective-checklist__title">Objectives</h4>
        <div class="objective-checklist__description">
          Complete {{ goals.required }} out of {{ goals.total }} goals
        </div>
      </template>
      <div class="objective-checklist__table">
        <table class="table" style="width: 100%">
          <tbody>
            <tr v-for="(row, i) in rows" :key="i">
              <td v-for="goal in row" :key="goal.name">
                <div class="objective-checklist__cell">
                  <i :class="goal.icon" />
                  {{ goal.name }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
const schema = {
  type: 'object',
  properties: {
    font_size: { type: 'number' },
    columns: { type: 'number' },
    show_title: { type: 'boolean' },
    text: { type: 'string', format: 'color' },
    background: { type: 'string', format: 'color' },
  },
}

export default {
  inject: ['json_data', 'osd_store'],
  data() {
    return { schema }
  },
  computed: {
    config() {
      const default_config = {
        font_size: 14,
        columns: 1,
        show_title: true,
        text: '#000000',
        background: '#FFFFFF',
      }
      const config = this.$store.config.state['objective-checklist'] || default_config
      // TODO need max, min, step on type number
      config.columns = parseInt(config.columns)
      if (!config.columns > 0) {
        config.columns = 1
      }
      return config
    },
    watchme() {
      if (!this.osd_store?.state.ready) {
        return ''
      }
      return JSON.stringify(this.config || {})
    },
    goals() {
      const objectives = this.json_data?.objectives || {}
      const { goals = [], nbActiveGoals, nbRequiredGoals } = objectives
      return {
        list: Object.entries(goals).map(([name, checked]) => ({
          name,
          icon: `fa fa-lg fa-${checked ? 'check-' : ''}square-o`,
        })),
        total: nbActiveGoals,
        required: nbRequiredGoals,
      }
    },
    rows() {
      const goals = this.goals.list
      const { columns = 1 } = this.config
      const rows = []
      let row
      goals.forEach((g, i) => {
        if (i % columns === 0) {
          row = []
          rows.push(row)
        }
        row.push(g)
      })
      return rows
    },
    style() {
      const { x = 0, y, font_size, text, background } = this.config

      const style = {
        left: `${x}px`,
        top: `${y}px`,
        fontSize: `${font_size}px`,
        color: text,
        background,
      }
      if (y === undefined) {
        delete style.top
        style.bottom = 0
      }
      return style
    },
  },
  methods: {
    change(values) {
      if (values !== null) {
        values = { ...this.config, ...values }
      }
      this.$store.config.save({ 'objective-checklist': values })
    },
  },
}
</script>
