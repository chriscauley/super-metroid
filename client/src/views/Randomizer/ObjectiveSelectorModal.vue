<template>
  <div>
    <div class="modal-backdrop fade in" />
    <div class="modal fade in -objective-selector">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Select Objectives</h3>
            <div class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </div>
          </div>
          <div class="modal-body">
            <objective-selector />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObjectiveSelector from '@/components/ObjectiveSelector.vue'

export default {
  components: { ObjectiveSelector },
  __route: {
    path: '/randomizer',
  },
  mounted() {},
}
</script>
