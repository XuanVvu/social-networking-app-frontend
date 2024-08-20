import callApi from '@/services/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, accessToken: null }),
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
          callApi.setToken(token)
          await this.fetchUserInfo()
          localStorage.setItem('currentUser', JSON.stringify(this.user))
        }
        return response
      } catch (error) {
        console.error('Login failed', error)
        throw error
      }
    },

    setAuthData(data: any) {
      this.accessToken = data.access_token
      localStorage.setItem('accessToken', data.accessToken)
    },

    async fetchUserInfo() {
      try {
        const response = await callApi.get('/users/current-user')
        this.user = response
      } catch (error) {
        console.error('Failed to fetch user info', error)
        this.clearAuthData()
      }
    },
    clearAuthData() {
      this.user = null
      this.accessToken = null
      localStorage.removeItem('accessToken')
    }
  }
})
