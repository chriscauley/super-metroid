<template>
  <unrest-dropdown class="tracker-view__config">
    <button class="btn -primary" title="Tracker Settings" id="helpTrackerSettings">
      <i class="fa fa-gear" />
    </button>
    <template #content>
      <div class="dropdown-items" @click.stop>
        <h3 class="form-group">
          Tracker Settings
          <div class="link" @click="startTheTour">
            <i class="fa fa-question-circle" />
          </div>
        </h3>
        <unrest-form
          :schema="schema"
          :state="tool_storage.state.tracker_settings"
          @change="tool_storage.save()"
        />
      </div>
    </template>
  </unrest-dropdown>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'TrackerSettings',
  inject: ['tool_storage', 'json_data'],
  computed: {
    schema() {
      const schema = cloneDeep(this.tool_storage.tracker_settings.schema)

      // Room visibility only affects controlled maps
      schema.properties.room_visibility.format = this.json_data ? undefined : 'hidden'
      const { selected } = this.$store.layout.state
      if (selected !== 'streaming') {
        delete schema.properties.show_grid
      }
      if (selected !== 'nordub') {
        delete schema.properties.compact
      }
      return schema
    },
  },
  methods: {
    startTheTour() {
      window.startTheTour('helpTrackerSettings')
    },
  },
}
</script>
