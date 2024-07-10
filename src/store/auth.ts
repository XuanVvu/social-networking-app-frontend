import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, accessToken: null }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    getUser: (state) => state.user
  },

  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/api/login', { username, password })
        this.fetchUserInfo()
        this.setAuthData(response.data)
        return true
      } catch (error) {
        console.error('Login failed', error)
        throw error
      }
    },

    setAuthData(data: any) {
      this.accessToken = data.accessToken
      localStorage.setItem('accessToken', data.accessToken)
    },

    async fetchUserInfo() {
      try {
        const response = await axios.get('/api/user')
        this.user = response.data
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
