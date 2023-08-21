import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import views from '@/views'

const { CheatSheet, PauseInventoryView, TrackerView, WhoDat } = views

const routes = [
  { path: '/', component: views.HomeView },
  { path: '/randomizer/', component: views.RandomizerView },
  { path: '/tracker/', component: TrackerView },
  { path: '/plando/', component: TrackerView },
  { path: '/plando/debug', component: TrackerView },
  { path: '/inventory/', component: PauseInventoryView },
  { path: '/cheat-sheet/', component: CheatSheet },
  { path: '/who-dat/', component: WhoDat },
  { path: '/dash-rando/', component: views.DashRando },
]

const history = (process.env.VUE_APP_SITE === 'github' ? createWebHashHistory : createWebHistory)()

const router = createRouter({ history, routes })

export default router
