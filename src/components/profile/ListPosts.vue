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
  console.log(profileStore.getPosts.length)

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
    <div v-if="profileStore.getPosts.length > 0" class="my-5" v-for="item of posts" :key="item.id">
      <PostComponents
        :data="item"
        @post-deleted="onPostDeleted"
        v-if="listPostLiked"
        :listPostLiked="listPostLiked"
      />
    </div>
    <el-empty v-else style="height: 100%" description="Chưa có bài viết" />
  </div>
</template>
