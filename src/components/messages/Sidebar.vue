<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import SidebarItem from '@/components/messages/SidebarItem.vue'
import callApi from '@/services/api'
import useNavigation from '@/composables/useNavigation'

export type Contact = {
  firstName: string
  lastName: string
  avatar: string
}

const contacts = ref<any>([])
const chatId = ref()
const { navigationId } = useNavigation()

const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id

const detailMessageUser = async (contact: any) => {
  const chat = await callApi.get(`/chats/${contact.id}/messages`)
  chatId.value = chat.id
  navigationId('Inbox', chat.id)
}

onMounted(async () => {
  const response = await callApi.get(`/chats/${currentUserId}`)
  contacts.value = response.map((item: any) => {
    const contact = item.user1.id === currentUserId ? item.user2 : item.user1
    return {
      contact,
      chatId: item.id
    }
  })
})
</script>
<template>
  <div class="w-80 bg-white border-r border-gray-200">
    <div class="overflow-y-auto h-[calc(100vh-141px)]">
      <template v-for="(contactItem, index) in contacts" :key="index">
        <SidebarItem
          :contact="contactItem.contact"
          :chatId="contactItem.chatId"
          @click="detailMessageUser(contactItem.contact)"
        />
      </template>
    </div>
  </div>
</template>
