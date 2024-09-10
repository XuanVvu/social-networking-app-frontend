<script setup lang="ts">
import { Search, UserFilled } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'
import logo from '@/assets/logo.png'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const searchContent = ref('')

const { logout, navigateTo, navigationWithQuery } = useNavigation()
const avtDropdown = ref()
const currentUser = localStorage.getItem('currentUser')
const currentUserAvt = JSON.parse(currentUser as any).avatar
const user = ref()
const authStore = useAuthStore()

const router = useRouter()
const handleLogout = () => {
  logout()
}

const goToHome = () => {
  navigateTo('/')
}

const handleSearch = () => {
  navigationWithQuery('/search', 'search', searchContent.value)
}

watchEffect(() => {
  // if (!authStore.isFetching) {
  //   authStore.fetchUserInfo()
  // }
  // user.value = authStore.getUser
})
</script>
<template>
  <div
    class="flex bg-white items-center justify-between py-4 px-16 shadow-md fixed inset-x-0 top-0 z-10"
  >
    <div class="flex items-center cursor-pointer" @click="goToHome">
      <img class="w-[150px] font-bold text-blue-600" :src="logo" />
    </div>

    <div class="w-1/2 flex items-center bg-[#eee] rounded-xl px-4">
      <el-icon class="w-[20px]">
        <Search />
      </el-icon>
      <input
        placeholder="Start typing to search..."
        class="w-full py-2.5 ps-2 bg-[#eee] rounded-xl"
        v-model="searchContent"
        @keyup.enter="handleSearch"
      />
    </div>

    <div class="flex items-center gap-4">
      <el-dropdown
        class="bg-[#eee] w-10 h-10 rounded-full flex items-center justify-center"
        ref="avtDropdown"
        trigger="click"
      >
        <el-avatar
          v-if="user?.avatar"
          :src="`http://localhost:3000/uploads/avatars/${user?.avatar}`"
        >
        </el-avatar>
        <el-avatar v-else :icon="UserFilled"> </el-avatar>

        <template #dropdown>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full" @click="() => navigateTo('/settings')"
              >Settings</el-dropdown-item
            >
          </el-dropdown-menu>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full" @click="handleLogout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
