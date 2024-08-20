import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import { useProfileStore } from '@/store/profile'

const routes = [
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
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
        redirect: '/profile/posts/:id',
        name: 'Profile',
        component: () => import('@/pages/Profile/Profile.vue'),
        children: [
          {
            path: 'posts/:id',
            name: 'Posts',
            component: () => import('@/pages/Profile/ListPost.vue')
          },
          {
            path: 'images/:id',
            name: 'Images',
            component: () => import('@/pages/Profile/Images.vue')
          },
          {
            path: 'friends/:id',
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
    path: '/search',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Search',
        component: () => import('@/pages/SearchScreen.vue')
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('currentUser')

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
export default router
