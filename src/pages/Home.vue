<script setup lang="ts">
import PostComponents from '@/components/posts/PostComponents.vue'
import FriendSuggestions from '@/components/friends/FriendSuggestions.vue'
</script>

<template>
  <div class="bg-[#fbfcfe]">
    <div class="flex w-[1000px] mx-auto gap-7">
      <div>
        <div class="my-5">
          <PostComponents />
        </div>

        <div class="my-5">
          <PostComponents />
        </div>

        <div class="my-5">
          <PostComponents />
        </div>
      </div>
      <FriendSuggestions />
    </div>
  </div>
</template>
