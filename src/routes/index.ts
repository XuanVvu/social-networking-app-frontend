import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard.vue')
      },
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/Home.vue')
      }
    ]
  },
  {
    path: '/inbox',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Inbox',
        component: () => import('@/pages/Inbox.vue')
      }
    ]
  },
  {
    path: '/login',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/Login.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page Not Found',
    component: () => import('@/pages/NotFound.vue')
  },

  {
    path: '/error',
    name: 'error',
    component: () => import('@/pages/Error.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
