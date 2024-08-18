<script lang="ts" setup>
import ListPosts from '@/components/profile/ListPosts.vue'
import PostComponents from '@/components/posts/PostComponents.vue'
import { useProfileStore } from '@/store/profile'
import { onMounted, ref } from 'vue'
const profileStore = useProfileStore()

const listPost = ref<any>([])
onMounted(() => {
  listPost.value = profileStore.getPosts
})
</script>
<template>
  <ListPosts />
</template>
