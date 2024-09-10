import { defineStore } from 'pinia'
import axios from 'axios'
import callApi from '@/services/api'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: []
  }),
  actions: {
    async getOrCreateChat(currentUserId: number, otherUserId: number) {
      try {
        const response = await callApi.get(`/chats/users/${currentUserId}/${otherUserId}`)

        if (response) {
          return response
        } else {
          const newChatResponse = await callApi.post('/chats', {
            userIds: [currentUserId, otherUserId]
          })
          return newChatResponse.data
        }
      } catch (error) {
        console.error('Error fetching or creating chat:', error)
      }
    },
    async fetchChats(userId: number) {
      try {
        const response = await axios.get(`/chats/user/${userId}`)
        this.chats = response.data
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    },

    async getMessagesForChat(chatId: number) {
      // try {
      //   if (!this.messages[chatId]) {
      //     const response = await axios.get(`/chats/${chatId}/messages`)
      //     this.messages[chatId] = response.data
      //   }
      //   return this.messages[chatId]
      // } catch (error) {
      //   console.error('Error fetching messages for chat:', error)
      // }

      const response = await axios.get(`/chats/${chatId}/messages`)
      console.log(response)
    }
  }
})
