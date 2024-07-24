<script setup lang="ts">
import PostComponents from '@/components/posts/PostComponents.vue'
import FriendBox from '@/components/friends/FriendBox.vue'
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
        <FriendBox />
    </div>
  </div>
</template>
