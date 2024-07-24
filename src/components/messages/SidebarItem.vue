<script lang="ts" setup>
import { Contact } from './Sidebar.vue'

const { contact } = defineProps<{ contact: Contact }>()
</script>
<template>
  <div class="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
    <img
      :src="contact.avatar"
      :alt="contact.name"
      class="w-12 h-12 rounded-full object-cover mr-3"
    />
    <div class="flex-1">
      <h3 class="font-medium">{{ contact.name }}</h3>
      <p class="text-sm text-gray-500 truncate">{{ contact.lastMessage }}</p>
    </div>
  </div>
</template>
