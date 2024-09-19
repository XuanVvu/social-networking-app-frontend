<script lang="ts" setup>
import { Contact } from './Sidebar.vue'
import { UserFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const { contact, chatId } = defineProps<{ contact: Contact; chatId: number }>()
const route = useRoute()
</script>
<template>
  <div
    :class="`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${chatId === Number(route.params.id) ? 'bg-gray-100' : ''}`"
  >
    <div class="mr-3">
      <img
        v-if="contact?.avatar"
        :src="`http://localhost:3001/uploads/avatars/${contact?.avatar}`"
        class="w-12 h-12 rounded-full object-cover"
      />
      <el-avatar class="w-12 h-12" v-else :icon="UserFilled"></el-avatar>
    </div>
    <div class="flex-1">
      <h3 class="font-medium">{{ contact.firstName + ' ' + contact.lastName }}</h3>
    </div>
  </div>
</template>
