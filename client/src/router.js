import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import views from '@/views'

const { CheatSheet, HomeView, TrackerView, PauseInventoryView } = views

const routes = [
  { path: '/', component: HomeView },
  { path: '/tracker/', component: TrackerView },
  { path: '/inventory/', component: PauseInventoryView },
  { path: '/cheat-sheet/', component: CheatSheet },
]

const history = (process.env.NODE_ENV === 'production' ? createWebHashHistory : createWebHistory)()

const router = createRouter({ history, routes })

export default router
