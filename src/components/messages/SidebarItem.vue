<script lang="ts" setup>
import { Contact } from './Sidebar.vue'
import { UserFilled } from '@element-plus/icons-vue'

const { contact } = defineProps<{ contact: Contact }>()
</script>
<template>
  <div class="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
    <div class="mr-3">
      <img
        v-if="contact?.avatar"
        :src="`http://localhost:3000/uploads/avatars/${contact?.avatar}`"
        class="w-12 h-12 rounded-full object-cover"
      />
      <el-avatar v-else :icon="UserFilled"></el-avatar>
    </div>
    <div class="flex-1">
      <h3 class="font-medium">{{ contact.firstName + ' ' + contact.lastName }}</h3>
    </div>
  </div>
</template>
