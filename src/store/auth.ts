import callApi from '@/services/api'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, accessToken: null }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    getUser: (state) => state.user
  },

  actions: {
    async login(email: string, password: string) {
      try {
        console.log(2)

        // const response = await callApi.post('/users/login', { email, password })
        // console.log(response)

        // const token = response.data.data.access_token
        // callApi.setHeader('Authorizaion', `Bearer ${token}`)
        // this.setAuthData(response.data)
        // return response
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
