<script setup lang="ts">
import heart from '@/assets/heart.svg'
import shareIcon from '@/assets/share.svg'
import Icon from '@/components/base/Icon.vue'
import commentIcon from '@/assets/comment-icon.svg'

const iconList = [
  {
    icon: heart
  },
  {
    icon: commentIcon
  },
  {
    icon: shareIcon
  }
]
</script>
<template>
  <div class="border rounded-lg p-4 shadow-md bg-[#fff]">
    <div class="flex items-center mb-4">
      <img class="w-10 h-10 rounded-full mr-4" alt="Profile Picture" />
      <div>
        <div class="font-bold">{{ 'userName' }}</div>
        <div class="text-sm text-gray-500">{{ 'postTime' }}</div>
      </div>
    </div>
    <div class="mb-8">
      <p class="mb-4">{{ 'postText' }}</p>
      <img
        class="w-full rounded-lg"
        src="https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg    "
        alt="Post Image"
      />
    </div>
    <div class="flex text-gray-600 gap-6">
      <button v-for="iconItem in iconList" class="flex items-center space-x-4 hover:text-gray-900 h-[25px]">
        <Icon :icon="iconItem.icon" />
      </button>
    </div>
  </div>
</template>
