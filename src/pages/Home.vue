<script setup lang="ts">
import PostComponents from '@/components/posts/PostComponents.vue'
import FriendSuggestions from '@/components/friends/FriendSuggestions.vue'
import callApi from '@/services/api'
import { onMounted, ref } from 'vue'

const postsData = ref()
const listPostLiked = ref()

const onPostDeleted = async (postId: any) => {
  await callApi.delete(`post/delete/${postId}`)
  getAllPosts()
}

const getAllPosts = async () => {
  const posts = await callApi.get(`/post`)
  postsData.value = posts
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
  <div class="bg-[#fbfcfe]">
    <div class="flex w-[1050px] mx-auto gap-7">
      <div>
        <div class="my-5" v-for="postItem of postsData" :key="postItem.id">
          <PostComponents
            v-if="listPostLiked"
            :listPostLiked="listPostLiked"
            :data="postItem"
            @post-deleted="onPostDeleted"
          />
        </div>
      </div>
      <FriendSuggestions />
    </div>
  </div>
</template>
