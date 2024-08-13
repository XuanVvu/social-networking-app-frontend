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
    path: '/profile',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/profile/posts',
        name: 'Profile',
        component: () => import('@/pages/Profile/Profile.vue'),
        children: [
          {
            path: 'posts',
            name: 'Posts',
            component: () => import('@/pages/Profile/ListPost.vue')
          },
          {
            path: 'images',
            name: 'Images',
            component: () => import('@/pages/Profile/Images.vue')
          },
          {
            path: 'friends',
            name: 'ProfileFriends',
            component: () => import('@/pages/Profile/Friends.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/friends',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Friends',
        component: () => import('@/pages/Friends.vue')
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
    path: '/register',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import('@/pages/Register.vue')
      }
    ]
  },
  {
    path: '/settings',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('@/pages/Settings.vue')
      },
      {
        path: 'information',
        name: 'SettingsInformation',
        component: () => import('@/pages/SettingsAccount.vue')
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
