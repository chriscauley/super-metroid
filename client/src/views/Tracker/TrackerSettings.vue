<template>
  <unrest-dropdown class="tracker-view__config">
    <button class="btn -primary" title="Tracker Settings">
      <i class="fa fa-gear" />
    </button>
    <template #content>
      <div class="dropdown-items" @click.stop>
        <h3 class="form-group">Tracker Settings</h3>
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
      schema.properties.visible_locations.disabled = !!this.json_data
      return schema
    },
  },
}
</script>
