import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pentomino',
    name: 'Pentomino',
    component: () => import(/* webpackChunkName: "pentomino" */ '../views/Pentomino.vue')
  },
  {
    path: '/cooling',
    name: 'Cooling',
    component: () => import(/* webpackChunkName: "cooling" */ '../views/Cooling.vue')
  },
  {
    path: '/shield',
    name: 'Shield',
    component: () => import(/* webpackChunkName: "shield" */ '../views/Shield.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
