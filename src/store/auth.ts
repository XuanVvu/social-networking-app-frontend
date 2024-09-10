import callApi from '@/services/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, accessToken: null, isFetching: false }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    getUser: (state) => state.user
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await callApi.post('/users/login', { email, password })
        if (response.data.success) {
          const token = response.data.data.access_token
          if (token) {
            callApi.setToken(token)
            localStorage.setItem('accessToken', token)
          }

          await this.fetchUserInfo()
          localStorage.setItem('currentUser', JSON.stringify(this.user))
        }
        return response
      } catch (error) {
        console.error('Login failed', error)
        throw error
      }
    },

    setAuthData(accessToken: any) {
      localStorage.setItem('accessToken', accessToken)
    },

    async fetchUserInfo() {
      try {
        this.isFetching = true
        const response = await callApi.get('/users/current-user')
        this.user = response
      } catch (error) {
        console.error('Failed to fetch user info', error)
        this.clearAuthData()
      } finally {
        this.isFetching = false
      }
    },
    clearAuthData() {
      this.user = null
      this.accessToken = null
      localStorage.removeItem('accessToken')
    }
  }
})
