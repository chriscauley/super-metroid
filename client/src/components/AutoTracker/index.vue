<template>
  <div class="auto-tracker">
    <div class="auto-tracker__actions btn-group">
      <div class="auto-tracker__title">Auto Tracker</div>
      <button v-bind="play">
        <i :class="play.icon" />
      </button>
      <div class="btn -secondary">
        <i :class="status.icon" />
      </div>
      <button class="btn -secondary" id="helpAutoTracker" @click="startTheTour">
        <i class="fa fa-question-circle" />
      </button>
      <button v-for="button in log_buttons" :key="button.id" v-bind="button">
        {{ button.title }}
      </button>
    </div>
    <div v-if="log_page" :class="`virtual-list__wrapper ${locked ? '-locked' : ''}`">
      <button class="virtual-list__lock btn -primary" @click="unlock">
        <i :class="`fa fa-${locked ? 'un' : ''}lock`" />
        Autoscroll: {{ locked ? 'off' : 'on' }}
      </button>
      <virtual-list
        :key="log_page"
        class="virtual-list"
        data-key="id"
        :data-sources="logs"
        :data-component="TextLog"
        ref="list"
      />
    </div>
    <div
      v-if="controller.state.error"
      class="auto-tracker__error alert -error"
      @click="controller.state.error = null"
    >
      Error: {{ controller.state.error }}
    </div>
  </div>
</template>

<script>
import Controller from './Controller'
import TextLog from './TextLog.vue'
import VirtualList from 'vue3-virtual-scroll-list'

const colors = {
  statusOK: 'green',
  statusKO: 'red',
  statusNA: 'white',
  statusLoad: 'orange',
}
export default {
  name: 'AutoTracker',
  components: { VirtualList },
  data() {
    // const controller = Controller(this);
    // window.C = () => new Controller(this)
    window.AT = this
    return {
      controller: new Controller(this),
      TextLog,
      log_page: null,
      autoscroll: true,
      locked: true,
    }
  },
  computed: {
    play() {
      const running = !!this.controller.state.status
      const { start, stop } = this.controller
      return {
        class: 'btn btn-default',
        title: `${running ? 'Stop' : 'Start'} the Auto Tracker`,
        icon: `fa fa-${running ? 'stop' : 'play'}`,
        onClick: running ? stop : start,
      }
    },
    logs() {
      return this.controller.state[this.log_page]
    },
    status() {
      const { icon } = this.controller.state
      const color = colors[icon]
      return {
        icon: `fa fa-circle -${color}`,
      }
    },
    log_buttons() {
      const { log_page, controller } = this
      return ['info', 'log'].map((slug, index) => ({
        index,
        id: `log-button__${slug}`,
        title: `${slug}: ${controller.state[slug].length}`,
        onClick: () => this.toggleLogs(slug),
        class: `btn -${slug === log_page ? 'primary' : 'secondary'}`,
      }))
    },
  },
  watch: {
    'controller.state.log.length': function () {
      this.scrollToBottom()
    },
  },
  methods: {
    unlock() {
      this.locked = false
    },
    toggleLogs(slug) {
      this.log_page = this.log_page === slug ? null : slug
      this.scrollToBottom(true)
    },
    scrollToBottom(force) {
      if (force || this.locked) {
        setTimeout(() => this.$refs.list?.scrollToBottom(), 0)
      }
    },
    startTheTour(event) {
      window.startTheTour(event)
    },
  },
}
</script>
