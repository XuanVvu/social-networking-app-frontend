<script lang="ts" setup>
import PostComponents from '@/components/posts/PostComponents.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import callApi from '@/services/api'
import { useRoute } from 'vue-router'

const route = useRoute()
const posts = ref<any>([])
const searchQuery = ref<string | null>((route.query.search as string) || null)
const listPostLiked = ref()

watch(
  () => route.query.search,
  (newSearch) => {
    searchQuery.value = (newSearch as string) || null
    fetchPostSearch()
    fetchLikeStatus()
  }
)

const fetchPostSearch = async () => {
  try {
    const response = await callApi.get('/post/search', {
      params: {
        query: searchQuery.value
      }
    })
    posts.value = response
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

const fetchLikeStatus = async () => {
  const response = await callApi.get(`/post-like/liked-posts`)
  listPostLiked.value = response
}

onMounted(async () => {
  fetchLikeStatus()
  fetchPostSearch()
})
</script>

<template>
  <div class="bg-white px-6 py-12 border-b mb-8 flex items-center justify-between">
    <h1 class="font-bold text-[40px]">Tìm kiếm</h1>
  </div>
  <div style="min-height: calc(100vh - 76px)" class="flex flex-col items-center mt-[50px]">
    <!-- <div class="border-b w-full flex justify-center">
      <div class="w-[1000px] flex flex-col gap-3 pb-8">
        <div
          class="flex gap-3 items-center px-4 py-3 border bg-white cursor-pointer hover:bg-slate-50"
          v-for="user in filteredUsers"
          :key="user.id"
        >
          <el-avatar></el-avatar>
          <div>{{ user.firstName }} {{ user.lastName }}</div>
        </div>
      </div>
    </div> -->
    <div class="w-fit">
      <!-- Nội dung khác -->
      <div class="my-5" v-for="item of posts" :key="item.id">
        <PostComponents :data="item" v-if="listPostLiked" :listPostLiked="listPostLiked" />
      </div>
    </div>
  </div>
</template>
