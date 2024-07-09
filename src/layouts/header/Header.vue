<script setup lang="ts">
import { Bell, Setting, ChatSquare, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const iconHeader = ref([
  {
    component: Bell
  },
  {
    component: ChatSquare
  },
  {
    component: Setting
  }
])
</script>
<template>
  <div
    class="flex bg-white items-center justify-between py-4 px-16 shadow-md fixed inset-x-0 top-0 z-10"
  >
    <!-- Left Section -->
    <div class="flex items-center">
      <span class="text-[30px] font-bold text-blue-600">Sociala.</span>
    </div>

    <!-- Center Section -->
    <div class="w-1/2 flex items-center bg-[#eee] rounded-xl px-4">
      <el-icon class="w-[20px]"><Search /></el-icon>
      <input
        placeholder="Start typing to search..."
        class="w-full py-2.5 ps-2 bg-[#eee] rounded-xl"
      />
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-3">
      <el-icon class="" v-for="item in iconHeader"> <component :is="item.component" /></el-icon>
      <div class="bg-[#eee] w-10 h-10 rounded-full flex items-center justify-center">
        <el-avatar> user </el-avatar>
      </div>
    </div>
  </div>
</template>
