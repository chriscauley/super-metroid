<template>
  <unrest-dropdown class="tracker-view__config" v-if="goals.list.length">
    <button class="btn -primary" title="Randomizer Settings">
      <i class="fa fa-check-square-o" />
    </button>
    <template #content>
      <div class="dropdown-items">
        <div v-if="json_data?.objectivesHidden">
          <h3 class="form-group">Objectives Hidden</h3>
          <div class="dropdown-item">
            Objectives are currently hidden. Visit the pause screen for more info.
          </div>
        </div>
        <div v-else>
          <h4 class="form-group">Objectives</h4>
          <div class="dropdown-item">
            Complete {{ goals.required }} out of {{ goals.total }} goals
          </div>
          <div class="objective-settings__table">
            <table class="table" style="width: 100%">
              <tbody>
                <tr v-for="goal in goals.list" :key="goal.name">
                  <td>
                    <i :class="goal.icon" />
                    {{ goal.name }}
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
export default {
  inject: ['json_data'],
  computed: {
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
  },
}
</script>
