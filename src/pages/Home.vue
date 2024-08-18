<script setup lang="ts">
import PostComponents from '@/components/posts/PostComponents.vue'
import ListPosts from '@/components/profile/ListPosts.vue'
import FriendSuggestions from '@/components/friends/FriendSuggestions.vue'
import callApi from '@/services/api'
import { computed, onMounted, ref } from 'vue'

const postsData = ref()

const onPostDeleted = async (postId: any) => {
  await callApi.delete(`post/delete/${postId}`)
  getAllPosts()
}

const getAllPosts = async () => {
  const posts = await callApi.get(`/post`)
  postsData.value = posts
}

onMounted(async () => {
  getAllPosts()
})
</script>

<template>
  <div class="bg-[#fbfcfe]">
    <div class="flex w-[1050px] mx-auto gap-7">
      <div>
        <div class="my-5" v-for="postItem of postsData" :key="postItem.id">
          <PostComponents :data="postItem" @post-deleted="onPostDeleted" />
        </div>
      </div>
      <FriendSuggestions />
    </div>
  </div>
</template>
