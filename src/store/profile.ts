import callApi from '@/services/api'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('auth', {
  state: () => ({ posts: null as any, photos: [] as any }),
  getters: {
    getPosts: (state) => state.posts,
    getPhotos: (state) => state.photos
  },
  actions: {
    async fetchPosts() {
      const currentUser = localStorage.getItem('currentUser')
      const currentUserId = JSON.parse(currentUser as string).id
      const posts = await callApi.get(`/post/postbyUserId/${currentUserId}`)
      this.posts = posts
      posts.forEach((item: any) => {
        item.photos.forEach((element: any) => {
          this.photos.push(element)
        })
      })
    },

    async deletePost(postId: number) {
      try {
        await callApi.delete(`post/delete/${postId}`)
        this.fetchPosts()
      } catch (e) {
        console.error('Error deleting post:', e)
      }
    }
  }
})
