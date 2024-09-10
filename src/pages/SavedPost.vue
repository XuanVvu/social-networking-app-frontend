<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import callApi from '@/services/api'
import PostComponents from '@/components/posts/PostComponents.vue'

const savedPostsData = ref()
const listPostLiked = ref()

const onRemoveSavedPost = async (postId: any) => {
  await callApi.delete(`/saved-post/${postId}`)
  getAllPosts()
}

const getAllPosts = async () => {
  const posts = await callApi.get('/saved-post')
  savedPostsData.value = posts
}

const fetchLikeStatus = async () => {
  const response = await callApi.get(`/post-like/liked-posts`)
  listPostLiked.value = response
}

onMounted(async () => {
  getAllPosts()
  fetchLikeStatus()
})
</script>
<template>
  <div class="p-[60px]" style="min-height: calc(100vh - 120px)">
    <div class="bg-white px-6 py-12 border mb-4 flex items-center justify-between">
      <h1 class="font-bold text-2xl">Bài viết đã lưu</h1>
    </div>

    <div class="flex justify-center">
      <div class="w-fit">
        <div class="my-5" v-for="postItem of savedPostsData" :key="postItem.id">
          <PostComponents
            :listPostLiked="listPostLiked"
            :data="postItem.post"
            @remove-savedpost="onRemoveSavedPost"
          />
        </div>
      </div>
    </div>
  </div>
</template>
