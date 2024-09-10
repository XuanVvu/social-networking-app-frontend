<script lang="ts" setup>
import PostComponents from '@/components/posts/PostComponents.vue'
import { useProfileStore } from '@/store/profile'
import { computed, onMounted, ref } from 'vue'
import callApi from '@/services/api'
const profileStore = useProfileStore()

const listPostLiked = ref()

const onPostDeleted = (postId: number, userId: number) => {
  profileStore.deletePost(postId, userId)
}
const posts = computed(() => {
  return profileStore.getPosts
})

const fetchLikeStatus = async () => {
  const response = await callApi.get(`/post-like/liked-posts`)
  listPostLiked.value = response
}

onMounted(() => {
  fetchLikeStatus()
})
</script>
<template>
  <div style="min-height: calc(100vh - 395px)">
    <div class="my-5" v-for="item of posts" :key="item.id">
      <PostComponents
        :data="item"
        @post-deleted="onPostDeleted"
        v-if="listPostLiked"
        :listPostLiked="listPostLiked"
      />
    </div>
  </div>
</template>
