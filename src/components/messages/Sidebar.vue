<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import SidebarItem from '@/components/messages/SidebarItem.vue'
import callApi from '@/services/api'

export type Contact = {
  firstName: string
  lastName: string
  avatar: string
}

const contacts = ref<Contact[]>([])

const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id

onMounted(async () => {
  const response = await callApi.get('/chats/17')
  contacts.value = response.map((item: any) => {
    if (item.user1.id === currentUserId) {
      return item.user2
    } else {
      return item.user1
    }
  })
})
</script>
<template>
  <div class="w-80 bg-white border-r border-gray-200">
    <div class="overflow-y-auto h-[calc(100vh-141px)]">
      <template v-for="(contact, index) in contacts" :key="index">
        <SidebarItem :contact="contact" />
      </template>
    </div>
  </div>
</template>
