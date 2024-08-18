<script lang="ts" setup>
import PostComponents from '@/components/posts/PostComponents.vue'
import { useProfileStore } from '@/store/profile'
import { computed } from 'vue'
const profileStore = useProfileStore()

const onPostDeleted = (postId: number) => {
  profileStore.deletePost(postId)
}
const posts = computed(() => profileStore.getPosts)
</script>
<template>
  <div class="my-5" v-for="item of posts" :key="item.id">
    <PostComponents :data="item" @post-deleted="onPostDeleted" />
  </div>
</template>
