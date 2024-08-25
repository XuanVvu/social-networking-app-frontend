import callApi from '@/services/api'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({ comments: null as any }),
  getters: {
    getComments: (state) => state.comments
  },
  actions: {
    async setComments(comments: any) {
      this.comments = comments
    }
  }
})
