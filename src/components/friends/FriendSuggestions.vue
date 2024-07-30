<script setup lang="ts">
import { ref } from 'vue'
import { Right } from '@element-plus/icons-vue'

const friends = ref<any[]>([
  { id: 1, name: 'Anthony Daugloi', avatar: 'anthony.jpg', mutualFriends: 12, action: 'confirm' },
  { id: 2, name: 'David Agfree', avatar: 'david.jpg', mutualFriends: 12, action: 'add' },
  { id: 3, name: 'Hugury Daugloi', avatar: 'hugury.jpg', mutualFriends: 12, action: 'add' }
])
</script>

<template>
  <div class="border font-sans bg-white rounded-lg p-4 shadow-md my-5 flex-1 h-[300px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Lời mời kết bạn</h2>
      <a href="#" class="text-blue-600 text-sm">See all</a>
    </div>
    <div v-for="friend in friends" :key="friend.id" class="bg-gray-100 rounded-lg p-3 mb-2 flex items-center">
      <img :src="friend.avatar" :alt="friend.name" class="w-10 h-10 rounded-full mr-3" />
      <div class="flex-grow">
        <h3 class="text-sm font-semibold">{{ friend.name }}</h3>
        <p class="text-xs text-gray-500">{{ friend.mutualFriends }} mutual friends</p>
      </div>
      <button class="w-5">
        <Right />
      </button>
    </div>
  </div>
</template>
