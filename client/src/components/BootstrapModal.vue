<template>
  <div class="bootstrap-modal">
    <div class="modal-backdrop fade in" />
    <div class="modal fade in" @click="$emit('close')">
      <div class="modal-dialog">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <div class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
              <span aria-hidden="true">×</span>
            </div>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name=" footer" />
            <button type="button" class="btn btn-primary" @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  emits: ['close'],
}
</script>
