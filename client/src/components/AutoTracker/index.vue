<template>
  <div class="auto-tracker">
    <div class="auto-tracker__top">
      <div class="auto-tracker__title">
        {{ game_state || 'Auto Tracker' }}
      </div>
      <i :class="status_icon" />
      <div class="auto-tracker__actions btn-group">
        <button v-bind="play">
          <i :class="play.icon" />
        </button>
        <button class="btn -secondary" id="helpAutoTracker" @click="startTheTour">
          <i class="fa fa-question-circle" />
        </button>
        <button v-for="button in log_buttons" :key="button.id" v-bind="button">
          {{ button.title }}
        </button>
      </div>
    </div>
    <div v-if="log_page === 'debug'" class="auto-tracker__debug">
      <div v-for="row in tracker_debug" :key="row[0]" class="_row">
        <div class="_label">{{ row[0] }}</div>
        <div class="_value">{{ row[1] }}</div>
      </div>
    </div>
    <div v-else-if="log_page" :class="`virtual-list__wrapper ${locked ? '-locked' : ''}`">
      <button class="virtual-list__lock btn -primary" @click="unlock">
        <i :class="`fa fa-${locked ? 'un' : ''}lock`" />
        Autoscroll: {{ locked ? 'off' : 'on' }}
      </button>
      <virtual-list
        :key="log_page"
        class="virtual-list"
        data-key="id"
        :data-sources="current_logs"
        :data-component="TextLog"
        ref="list"
      />
    </div>
    <div v-if="error" class="auto-tracker__error alert -error" @click="error = null">
      Error: {{ error }}
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue'
import Controller from './Controller'

import TextLog from './TextLog.vue'
import VirtualList from 'vue3-virtual-scroll-list'

const _fmt = (s) => s.replace(/,/g, ', ')
let log_id = 0
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
    return {
      controller: new Controller(),
      TextLog: markRaw(TextLog),
      log_page: null,
      autoscroll: true,
      locked: true,
      curState: 0,
      icon: null,
      error: null,
      game_state: null,
      logs: {
        info: [],
        log: [],
      },
    }
  },
  computed: {
    play() {
      const running = this.inProgress()
      const { startAutoTracker, stopAutoTracker } = window
      return {
        class: 'btn btn-default',
        title: `${running ? 'Stop' : 'Start'} the Auto Tracker`,
        icon: `fa fa-${running ? 'stop' : 'play'}`,
        onClick: running ? stopAutoTracker : startAutoTracker,
      }
    },
    current_logs() {
      return this.logs[this.log_page]
    },
    status_icon() {
      const { icon } = this
      const color = colors[icon]
      return `fa fa-circle auto-tracker__status -${color}`
    },
    log_buttons() {
      const { log_page } = this
      return ['info', 'log', 'debug'].map((slug, index) => ({
        index,
        id: `log-button__${slug}`,
        title: slug,
        onClick: () => this.toggleLogs(slug),
        class: `btn -${slug === log_page ? 'primary' : 'secondary'}`,
      }))
    },
    tracker_debug() {
      const { tracker_debug } = this.$store.ui.state
      return Object.entries(tracker_debug || {})
    },
  },
  watch: {
    'current_logs.length': function () {
      this.scrollToBottom()
    },
  },
  mounted() {
    window.$autotracker = this
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
    resetLog() {
      this._old_log = this.logs.log
      this._old_info = this.logs.info
      this.logs.log = []
      this.logs.info = []
      this.log('info', 'logs reset')
    },
    setError(error) {
      this.error = error
      if (error) {
        this.log('info', `\u274C ${error}`)
      }
    },
    log(level, text) {
      const logs = this.logs[level]
      const last = logs[logs.length - 1]
      if (last && last.text === text) {
        last.count++
      } else {
        logs.push({
          text: _fmt(text),
          id: log_id++,
          count: 1,
        })
      }
    },
    inProgress() {
      return this.curState > 0
    },
  },
}
</script>
