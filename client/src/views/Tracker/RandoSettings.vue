<template>
  <unrest-dropdown class="tracker-view__config">
    <button class="btn -primary" title="Randomizer Settings">
      <i class="fa fa-gamepad" />
    </button>
    <template #content>
      <div class="dropdown-items" @click.stop>
        <h3 class="form-group">Randomizer Settings</h3>
        <table v-if="locked" class="table" style="width: 100%">
          <tbody>
            <tr v-for="row in rows" :key="row">
              <th>{{ row[0] }}:</th>
              <td>{{ row[1] }}</td>
            </tr>
          </tbody>
        </table>
        <unrest-form
          v-else
          :schema="tool_storage.rando_settings.schema"
          :state="tool_storage.state.rando_settings"
          @change="tool_storage.save()"
        />
        <div v-if="objectives.length">
          <h4 class="form-group" v-if="json_data?.objectivesHidden">Objectives Hidden</h4>
          <div v-else>
            <h4 class="form-group">Objectives</h4>
            <table class="table" style="width: 100%">
              <tbody>
                <tr v-for="objective in objectives" :key="objective.name">
                  <td>
                    <i :class="objective.icon" />
                    {{ objective.name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </unrest-dropdown>
</template>

<script>
import { startCase } from 'lodash'

export default {
  inject: ['json_data', 'tool_storage'],
  computed: {
    rows() {
      const { properties } = this.tool_storage.rando_settings.schema
      return Object.keys(properties).map((key) => [key, this.json_data[key]].map(startCase))
    },
    locked() {
      return !!this.json_data
    },
    objectives() {
      return Object.entries(this.json_data?.objectives || {}).map(([name, checked]) => ({
        name,
        icon: `fa fa-lg fa-${checked ? 'check-' : ''}square-o`,
      }))
    },
  },
}
</script>
