import callApi from '@/services/api'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({ posts: null as any, photos: [] as any }),
  getters: {
    getPosts: (state) => state.posts,
    getPhotos: (state) => state.photos
  },
  actions: {
    async fetchPosts(userId: number) {
      const posts = await callApi.get(`/post/postbyUserId/${userId}`)
      this.posts = posts
      this.updatePhotos()
    },

    updatePhotos() {
      this.photos = this.posts.flatMap((post: { photos: any[]; id: any }) =>
        post.photos.map((photo) => ({
          ...photo,
          postId: post.id
        }))
      )
    },

    async deletePost(postId: number, userId: number) {
      try {
        await callApi.delete(`post/delete/${postId}`)
        this.fetchPosts(userId)
        this.posts = this.posts.filter((post: { id: number }) => post.id !== postId)
        this.updatePhotos()
      } catch (e) {
        console.error('Error deleting post:', e)
      }
    }
  }
})
