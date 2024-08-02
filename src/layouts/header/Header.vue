<script setup lang="ts">
import { Bell, ChatSquare, Search } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'
import logo from '@/assets/logo.png'
import { ref } from 'vue'

const goToMessager = () => {
  navigateTo('/inbox')
}
const iconHeader = ref([
  {
    component: ChatSquare,
    isDot: true,
    action: goToMessager
  },
  {
    component: Bell,
    isDot: false
  }
])
const { logout, navigateTo } = useNavigation()
const avtDropdown = ref()

const handleLogout = () => {
  logout()
}

const goToHome = () => {
  navigateTo('/')
}
</script>
<template>
  <div class="flex bg-white items-center justify-between py-4 px-16 shadow-md fixed inset-x-0 top-0 z-10">
    <div class="flex items-center cursor-pointer" @click="goToHome">
      <img class="w-[150px] font-bold text-blue-600" :src="logo" />
    </div>

    <div class="w-1/2 flex items-center bg-[#eee] rounded-xl px-4">
      <el-icon class="w-[20px]">
        <Search />
      </el-icon>
      <input placeholder="Start typing to search..." class="w-full py-2.5 ps-2 bg-[#eee] rounded-xl" />
    </div>

    <div class="flex items-center gap-4">
      <!-- <el-badge
        v-for="item in iconHeader"
        class="w-[25px]"
        v-bind="item.isDot ? { 'is-dot': true } : {}"
        @click="item.action"
      >
        <component :is="item.component" class="cursor-pointer"
      /></el-badge> -->
      <el-dropdown class="bg-[#eee] w-10 h-10 rounded-full flex items-center justify-center" ref="avtDropdown"
        trigger="click">
        <el-avatar> user </el-avatar>
        <template #dropdown>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full" @click="() => navigateTo('/settings')">Settings</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full" @click="handleLogout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
