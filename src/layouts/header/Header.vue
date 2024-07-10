<script setup lang="ts">
import { Bell, ChatSquare, Search } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'
import { ref } from 'vue'
const iconHeader = ref([
  {
    component: ChatSquare,
    isDot: true
  },
  {
    component: Bell,
    isDot: false
  }
])
const { logout } = useNavigation()
const avtDropdown = ref()
const showClick = () => {
  avtDropdown.value.handleOpen()
}

const handleLogout = () => {
  logout()
}
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
    <div class="flex items-center gap-4">
      <el-badge
        v-for="item in iconHeader"
        class="w-[25px]"
        v-bind="item.isDot ? { 'is-dot': true } : {}"
      >
        <component :is="item.component"
      /></el-badge>
      <el-dropdown
        class="bg-[#eee] w-10 h-10 rounded-full flex items-center justify-center"
        trigger="contextmenu"
        ref="avtDropdown"
      >
        <el-avatar @click="showClick"> user </el-avatar>
        <template #dropdown>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full" @click="handleLogout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
