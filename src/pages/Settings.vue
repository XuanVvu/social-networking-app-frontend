<script lang="ts" setup>
import useNavigation from '@/composables/useNavigation'

const { navigateTo } = useNavigation()
const gotoSettingAccount = () => {
  navigateTo('/settings/information')
}

const gotoSettingChangePassword = () => {
  navigateTo('/settings/change-password')
}
</script>
<template>
  <div class="p-[60px]" style="height: calc(100vh - 80px)">
    <div class="bg-white px-6 py-12 border mb-8 flex items-center justify-between">
      <h1 class="font-bold text-2xl">Cài đặt</h1>
    </div>

    <div class="bg-white py-5 px-4 border mb-4" @click="gotoSettingAccount">
      <div class="px-4 py-3 cursor-pointer hover:bg-slate-50 rounded-md">Thông tin cá nhân</div>
    </div>

    <div class="bg-white py-5 px-4 border mb-4" @click="gotoSettingChangePassword">
      <div class="px-4 py-3 cursor-pointer hover:bg-slate-50 rounded-md">Đổi mật khẩu</div>
    </div>
    <div class="bg-white py-5 px-4 border mb-4">
      <div class="px-4 py-3 cursor-pointer hover:bg-slate-50 rounded-md">Giúp đỡ</div>
    </div>
  </div>
</template>
