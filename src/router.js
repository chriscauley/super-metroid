import { createRouter, createWebHistory } from 'vue-router'
import views from '@/views'

const { HomeView, TrackerView } = views

const routes = [
  { path: '/', component: HomeView },
  { path: '/tracker/', component: TrackerView },
]

const history = createWebHistory()

const router = createRouter({ history, routes })

export default router
